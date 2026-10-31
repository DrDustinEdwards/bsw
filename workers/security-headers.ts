// Every security header bsw sends, in one place; workers/app.ts applies it to every response.
import { TDM_RESERVATION_HEADERS } from "@drdustinedwards/site-helpers/robots";
import { buildSecurityHeaders } from "@dustinedwards/site-runtime/headers";
import { bsw } from "@dustinedwards/site-runtime/sites";
import { buildContentSecurityPolicy, buildStagedPolicy } from "@dustinedwards/site-runtime/csp";
import { createContext } from "react-router";

export const CSP_REPORT_PATH = "/csp-report";
export const CSP_REPORT_GROUP = "csp-endpoint";

// The site's registry entry (site-runtime ./sites: COEP and the Integrity-Policy Report-Only come from it) plus
// Prelum's TDMRep header, which reserves training rights as /ai.txt says; the CSP is below. public/_headers is written
// from the same entry by site-runtime-headers (npm run headers), with the same two extra headers.
export const SECURITY_HEADERS = { ...buildSecurityHeaders({ site: bsw }), ...TDM_RESERVATION_HEADERS };

// Pre-launch: keep the mockup out of search until BioScience Writers has confirmed its claims (bsw/content-notes.md).
// The Worker and public/_headers (the `--header` in package.json's headers script) both send it; remove both at launch.
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

function sitePolicy(nonce?: string) {
  return {
    ...(nonce ? { nonce } : {}),
    sources: {
      img: ["data:"],
    },
    styleAttributesInline: true,
    cloudflareWebAnalytics: true,
    // Nothing unlisted: a kind not named here (media, frames, workers) is refused, not allowed from this origin.
    denyUnlisted: true,
    extraDirectives: ["manifest-src 'self'", "upgrade-insecure-requests"],
    reportUri: CSP_REPORT_PATH,
    reportTo: CSP_REPORT_GROUP,
  };
}

/**
 * The page policy, and beside it the same policy with Trusted Types as Report-Only (the registry stages it), so the
 * reports name any sink a script hands a string to before it is enforced.
 */
export function contentSecurityPolicies(nonce?: string) {
  const policy = sitePolicy(nonce);
  // upgrade-insecure-requests is enforced only; a browser logs an error for it in a Report-Only policy.
  const staged = { ...policy, extraDirectives: policy.extraDirectives.filter((d) => d !== "upgrade-insecure-requests") };
  return [buildContentSecurityPolicy(policy), buildStagedPolicy(staged, { trustedTypes: true })];
}
