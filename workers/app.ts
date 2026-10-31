import { WorkerEntrypoint } from "cloudflare:workers";
import { applyHeaderSet } from "@dustinedwards/site-runtime/headers";
import { cacheKey, forReader, forRenderer, settleCacheHeaders, UNCACHED } from "@dustinedwards/site-runtime/edge-cache";
import { receiveCspReport } from "@dustinedwards/site-runtime/csp-report";
import { healthResponse } from "@dustinedwards/site-runtime/health";
import { generateNonce, reportingEndpoints } from "@dustinedwards/site-runtime/csp";
import { SPECULATION_RULES_HEADER, SPECULATION_RULES_PATH, speculationRulesResponse } from "@dustinedwards/site-runtime/prefetch";
import { preloads, rootStylesheets, withPreloadHeader } from "@dustinedwards/site-runtime/preload";
import { timedRender } from "@dustinedwards/site-runtime/server-timing";
import { canonicalRedirect } from "@dustinedwards/site-runtime/url";
import { createRequestHandler, RouterContextProvider, type ServerBuild } from "react-router";
import { PRELOADS } from "../app/preloads";
import { contentSecurityPolicy, CSP_REPORT_GROUP, CSP_REPORT_PATH, nonceContext, PRE_LAUNCH_HEADERS, SECURITY_HEADERS } from "./security-headers";

const serverBuild = () => import("virtual:react-router/server-build") as Promise<ServerBuild>;
const requestHandler = createRequestHandler(serverBuild, import.meta.env.MODE);

/**
 * The cacheable entrypoint (wrangler.jsonc `exports`): every page and text route, rendered, then stored by the Workers
 * cache under the key the gateway names. Every header a stored page leaves with is set here, or a hit lacks it. The
 * policy carries no nonce and the site sets no cookie and has no sign-in, so a stored page is the same for every
 * reader.
 */
export class Renderer extends WorkerEntrypoint<Env> {
  override async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    // A nonce only under `vite dev`, for Vite's injected <style>; a built page carries none, so it can be stored.
    const nonce = import.meta.env.DEV ? generateNonce() : undefined;
    const context = new RouterContextProvider();
    context.set(nonceContext, nonce);
    const response = await timedRender(() => requestHandler(request, context));
    // Attach security headers without disturbing the (possibly streaming) body.
    const headers = new Headers(response.headers);
    applyHeaderSet(headers, SECURITY_HEADERS);
    const csp = contentSecurityPolicy(nonce);
    headers.set(csp.name, csp.value);
    headers.set("Reporting-Endpoints", reportingEndpoints(CSP_REPORT_GROUP, new URL(CSP_REPORT_PATH, url.origin)));
    const type = headers.get("content-type") ?? "";
    // React Router names no charset; a browser must not have to guess one.
    if (type === "text/html") headers.set("content-type", "text/html; charset=utf-8");
    // HTML pages: hover prefetch.
    if (type.startsWith("text/html")) headers.set(SPECULATION_RULES_HEADER.name, SPECULATION_RULES_HEADER.value);
    // Pre-launch: keep the mockup out of search until BioScience Writers has confirmed its claims
    // (bsw/content-notes.md). public/_headers takes the same set, so removing it at launch is one edit.
    applyHeaderSet(headers, PRE_LAUNCH_HEADERS);
    // The preloads root.tsx links and the root stylesheet, as the `Link` header Cloudflare Early Hints reads
    // (HTML only, appended, so a route's own Link stays).
    const hinted = withPreloadHeader(
      new Response(response.body, { status: response.status, statusText: response.statusText, headers }),
      PRELOADS.header,
      preloads(rootStylesheets(await serverBuild())).header,
    );
    // Last header step: a page layout.tsx marks shared that rendered 200 is stored; anything else, or a page rendered
    // for a request with a cookie, leaves private, no-store.
    const page = settleCacheHeaders(hinted, request);
    // `vite dev` only: Vite's client injects app.css as a <style> and takes its nonce from this meta,
    // so the nonce-based style-src lets it through. A production build drops this branch.
    if (import.meta.env.DEV && nonce) {
      return new HTMLRewriter()
        .on("head", { element: (head) => void head.prepend(`<meta property="csp-nonce" nonce="${nonce}">`, { html: true }) })
        .transform(page);
    }
    return page;
  }
}

/**
 * THE GATEWAY. Cache disabled (wrangler.jsonc `exports`), so it runs on every request: the CSP report sink, the
 * speculation rules and /health answer here and are never stored.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // One hop to the canonical address: https and no trailing slash.
    const redirect = canonicalRedirect(request);
    if (redirect) {
      applyHeaderSet(redirect.headers, SECURITY_HEADERS);
      return redirect;
    }
    if (url.pathname === CSP_REPORT_PATH) {
      // Keyed on the edge-set client address; a refusal drops the report (still 204).
      return receiveCspReport(request, {
        headers: SECURITY_HEADERS,
        allow: async (r) =>
          (await env.CSP_REPORT_RATE_LIMIT.limit({ key: r.headers.get("cf-connecting-ip") ?? "unknown" })).success,
      });
    }

    // Hover prefetch (site-runtime ./prefetch): the next page starts loading while the pointer rests on its link. One
    // rules file, named by a header on every page, so the CSP needs no allowance for it.
    if (url.pathname === SPECULATION_RULES_PATH) {
      const rules = speculationRulesResponse(undefined, request);
      applyHeaderSet(rules.headers, SECURITY_HEADERS);
      return rules;
    }

    // The deployed commit, for devkit's shared deploy: it waits for this to report the commit it shipped. bsw has no
    // database, bucket or cron to probe, so this says only that the Worker answers and what it runs (CI passes DEPLOY_SHA).
    if (url.pathname === "/health") {
      const health = await healthResponse({ sha: (env as Env & { DEPLOY_SHA?: string }).DEPLOY_SHA });
      applyHeaderSet(health.headers, SECURITY_HEADERS);
      return health;
    }

    // bsw has no form, no action and no sign-in (contact is a mailto link), so a write is refused here and never
    // reaches the cached Renderer.
    if (request.method !== "GET" && request.method !== "HEAD") {
      const headers = new Headers({ Allow: "GET, HEAD", "Cache-Control": UNCACHED });
      applyHeaderSet(headers, SECURITY_HEADERS);
      return new Response(null, { status: 405, headers });
    }

    // Every page and the small text routes: the Renderer's, through the Workers cache, keyed on the path and the query
    // without tracking parameters.
    const page = await ctx.exports.Renderer.fetch(forRenderer(request), { cf: { cacheKey: cacheKey(url) } });
    // A browser or proxy never holds the page (max-age=0), a request with a cookie is told no-store, and a reader who
    // already holds the page gets a 304.
    return forReader(page, request);
  },
} satisfies ExportedHandler<Env>;
