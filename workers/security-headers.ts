// Every security header bsw sends, in one place; workers/app.ts applies it to every response.
import { TDM_RESERVATION_HEADERS } from "@drdustinedwards/site-helpers/robots";
import { buildSecurityHeaders } from "@dustinedwards/site-runtime/headers";
import { buildContentSecurityPolicy } from "@dustinedwards/site-runtime/csp";
import { createContext } from "react-router";

export const CSP_REPORT_PATH = "/csp-report";
export const CSP_REPORT_GROUP = "csp-endpoint";

// The house set (OWASP defaults) plus Prelum's TDMRep header, which reserves training rights as /ai.txt says; the
// CSP is below.
export const SECURITY_HEADERS = { ...buildSecurityHeaders(), ...TDM_RESERVATION_HEADERS };

// Pre-launch: keep the mockup out of search until BioScience Writers has confirmed its claims (bsw/content-notes.md).
// The Worker and the static files' _headers (vite.config.ts) both send it; remove it here at launch.
export const PRE_LAUNCH_HEADERS = { "X-Robots-Tag": "noindex" };

/*
  First-party except the analytics beacon. Pages are stored at the edge and handed
  to every reader (workers/app.ts), so the policy carries no per-request nonce. A
  page has no inline script to hash: React reaches no browser (no <Scripts />),
  /site.js is the one script and 'self' covers it, and the JSON-LD blocks are data,
  which script-src does not govern. An inline script added later is blocked and
  reported to /csp-report; trust it with scriptHashes (site-runtime ./csp
  scriptHash), never a nonce. Style attributes get style-src-attr.

  `vite dev` alone still uses a nonce: Vite's client injects app.css as a <style>
  and takes its nonce from a meta tag (workers/app.ts). Nothing in dev is stored.
*/
export const nonceContext = createContext<string | undefined>(undefined);

export function contentSecurityPolicy(nonce?: string) {
  return buildContentSecurityPolicy({
    ...(nonce ? { nonce } : {}),
    sources: {
      img: ["data:"],
    },
    styleAttributesInline: true,
    cloudflareWebAnalytics: true,
    extraDirectives: ["manifest-src 'self'", "upgrade-insecure-requests"],
    reportUri: CSP_REPORT_PATH,
    reportTo: CSP_REPORT_GROUP,
  });
}
