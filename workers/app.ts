import { applyHeaderSet } from "@dustinedwards/site-runtime/headers";
import { receiveCspReport } from "@dustinedwards/site-runtime/csp-report";
import { generateNonce, reportingEndpoints } from "@dustinedwards/site-runtime/csp";
import { createRequestHandler, RouterContextProvider } from "react-router";
import { PRELOADS } from "../app/preloads";
import { contentSecurityPolicy, CSP_REPORT_GROUP, CSP_REPORT_PATH, nonceContext, SECURITY_HEADERS } from "./security-headers";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === CSP_REPORT_PATH) {
      // Keyed on the edge-set client address; a refusal drops the report (still 204).
      return receiveCspReport(request, {
        headers: SECURITY_HEADERS,
        allow: async (r) =>
          (await env.CSP_REPORT_RATE_LIMIT.limit({ key: r.headers.get("cf-connecting-ip") ?? "unknown" })).success,
      });
    }

    // The deployed commit, for devkit's shared deploy: it waits for this to report the commit it shipped. bsw has no
    // database or bucket to probe, so this says only that the Worker answers and what it runs (CI passes DEPLOY_SHA).
    if (url.pathname === "/health") {
      const sha = (env as Env & { DEPLOY_SHA?: string }).DEPLOY_SHA;
      return Response.json(
        { ok: true, ...(sha ? { sha } : {}), time: new Date().toISOString() },
        { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
      );
    }

    const nonce = generateNonce();
    const context = new RouterContextProvider();
    context.set(nonceContext, nonce);
    const response = await requestHandler(request, context);
    // Attach security headers without disturbing the (possibly streaming) body.
    const headers = new Headers(response.headers);
    applyHeaderSet(headers, SECURITY_HEADERS);
    const csp = contentSecurityPolicy(nonce);
    headers.set(csp.name, csp.value);
    headers.set("Reporting-Endpoints", reportingEndpoints(CSP_REPORT_GROUP, new URL(CSP_REPORT_PATH, url.origin)));
    // HTML pages: the preloads root.tsx links, as the `Link` header Cloudflare Early Hints reads. Appended, so a
    // route's own Link stays.
    if ((headers.get("Content-Type") ?? "").startsWith("text/html")) headers.append("Link", PRELOADS.header);
    // Pre-launch: keep the mockup out of search until BioScience Writers has
    // confirmed its claims (bsw/content-notes.md). Remove at launch, with the
    // same line in public/_headers.
    headers.set("X-Robots-Tag", "noindex");
    const page = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    // `vite dev` only: Vite's client injects app.css as a <style> and takes its nonce from this meta,
    // so the nonce-based style-src lets it through. A production build drops this branch.
    if (import.meta.env.DEV) {
      return new HTMLRewriter()
        .on("head", { element: (head) => void head.prepend(`<meta property="csp-nonce" nonce="${nonce}">`, { html: true }) })
        .transform(page);
    }
    return page;
  },
} satisfies ExportedHandler<Env>;
