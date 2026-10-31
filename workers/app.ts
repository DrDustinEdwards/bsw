import { WorkerEntrypoint } from "cloudflare:workers";
import { applyHeaderSet } from "@dustinedwards/site-runtime/headers";
import { cacheKey, forReader, settleCacheHeaders, UNCACHED } from "@dustinedwards/site-runtime/edge-cache";
import { receiveCspReport } from "@dustinedwards/site-runtime/csp-report";
import { generateNonce, reportingEndpoints } from "@dustinedwards/site-runtime/csp";
import { canonicalRedirect } from "@dustinedwards/site-runtime/url";
import { SPECULATION_RULES_HEADER, SPECULATION_RULES_PATH, speculationRulesResponse } from "@dustinedwards/site-runtime/prefetch";
import { createRequestHandler, RouterContextProvider } from "react-router";
import { PRELOADS } from "../app/preloads";
import { contentSecurityPolicy, CSP_REPORT_GROUP, CSP_REPORT_PATH, nonceContext, PRE_LAUNCH_HEADERS, SECURITY_HEADERS } from "./security-headers";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

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
    const response = await requestHandler(request, context);
    // Attach security headers without disturbing the (possibly streaming) body.
    const headers = new Headers(response.headers);
    applyHeaderSet(headers, SECURITY_HEADERS);
    const csp = contentSecurityPolicy(nonce);
    headers.set(csp.name, csp.value);
    headers.set("Reporting-Endpoints", reportingEndpoints(CSP_REPORT_GROUP, new URL(CSP_REPORT_PATH, url.origin)));
    // HTML pages: hover prefetch, and the preloads root.tsx links as the `Link` header Cloudflare Early Hints
    // reads (appended, so a route's own Link stays).
    const type = headers.get("content-type") ?? "";
    // React Router names no charset; a browser must not have to guess one.
    if (type === "text/html") headers.set("content-type", "text/html; charset=utf-8");
    if (type.startsWith("text/html")) {
      headers.set(SPECULATION_RULES_HEADER.name, SPECULATION_RULES_HEADER.value);
      headers.append("Link", PRELOADS.header);
    }
    applyHeaderSet(headers, PRE_LAUNCH_HEADERS);
    // Last header step: a page layout.tsx marks shared that rendered 200 is stored; anything else leaves private,
    // no-store.
    const page = settleCacheHeaders(new Response(response.body, { status: response.status, statusText: response.statusText, headers }));
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
    // workers.dev answers plain http too: one redirect to https on the same host (loopback stays http). The pages' URLs
    // end in a slash, so every path keeps its own.
    const canonical = canonicalRedirect(request, { except: ["*"] });
    if (canonical) {
      applyHeaderSet(canonical.headers, SECURITY_HEADERS);
      return canonical;
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
      const rules = speculationRulesResponse();
      applyHeaderSet(rules.headers, SECURITY_HEADERS);
      return rules;
    }

    // The deployed commit, for devkit's shared deploy: it waits for this to report the commit it shipped. bsw has no
    // database or bucket to probe, so this says only that the Worker answers and what it runs (CI passes DEPLOY_SHA).
    if (url.pathname === "/health") {
      const sha = (env as Env & { DEPLOY_SHA?: string }).DEPLOY_SHA;
      const headers = new Headers({ "Cache-Control": "no-store", "X-Robots-Tag": "noindex" });
      applyHeaderSet(headers, SECURITY_HEADERS);
      return Response.json({ ok: true, ...(sha ? { sha } : {}), time: new Date().toISOString() }, { headers });
    }

    // bsw has no form, no action and no sign-in (contact is a mailto link), so a write is refused here and never
    // reaches the cached Renderer.
    if (request.method !== "GET" && request.method !== "HEAD") {
      const headers = new Headers({ Allow: "GET, HEAD", "Cache-Control": UNCACHED });
      applyHeaderSet(headers, SECURITY_HEADERS);
      return new Response(null, { status: 405, headers });
    }

    // Every page and the small text routes: the Renderer's, through the Workers cache, keyed on the path and query.
    const page = await ctx.exports.Renderer.fetch(request, { cf: { cacheKey: cacheKey(url) } });
    // A browser or proxy never holds the page (max-age=0), and a request with a cookie is told no-store.
    return forReader(page, request);
  },
} satisfies ExportedHandler<Env>;
