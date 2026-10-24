import { applyHeaderSet } from "@dustinedwards/site-runtime/headers";
import { receiveCspReport } from "@dustinedwards/site-runtime/csp-report";
import { createRequestHandler } from "react-router";
import { CSP_REPORT_PATH, reportingEndpoints, SECURITY_HEADERS } from "./security-headers";

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

    const response = await requestHandler(request);
    // Attach security headers without disturbing the (possibly streaming) body.
    const headers = new Headers(response.headers);
    applyHeaderSet(headers, SECURITY_HEADERS);
    headers.set("Reporting-Endpoints", reportingEndpoints(url.origin));
    // Pre-launch: keep the mockup out of search until BioScience Writers has
    // confirmed its claims (bsw/content-notes.md). Remove at launch, with the
    // same line in public/_headers.
    headers.set("X-Robots-Tag", "noindex");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
