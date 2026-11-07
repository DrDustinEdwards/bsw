// Every security header bsw sends, in one place: the header set and the page policy below, applied to every response by
// site-runtime ./page-headers (workers/app.ts).
import { TDM_RESERVATION_HEADERS } from "@drdustinedwards/site-helpers/robots";
import { buildSecurityHeaders } from "@dustinedwards/site-runtime/headers";
import { pageSecurity } from "@dustinedwards/site-runtime/page-headers";
import { bsw } from "@dustinedwards/site-runtime/sites";

// The site's registry entry (site-runtime ./sites: COEP and the Integrity-Policy Report-Only come from it) plus
// Prelum's TDMRep header, which reserves training rights as /ai.txt says; the CSP is below. public/_headers is written
// from the same entry by site-runtime-headers (npm run headers), with the same two extra headers.
export const SECURITY_HEADERS = {
  ...buildSecurityHeaders({ site: bsw }),
  ...TDM_RESERVATION_HEADERS,
};

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
export const security = pageSecurity({
  set: SECURITY_HEADERS,
  policy: ({ nonce, staged }) => ({
    ...(nonce ? { nonce } : {}),
    sources: { img: ["data:"] },
    styleAttributesInline: true,
    cloudflareWebAnalytics: true,
    // Nothing unlisted: a kind not named here (media, frames, workers) is refused, not allowed from this origin.
    denyUnlisted: true,
    // upgrade-insecure-requests is enforced only; a browser logs an error for it in a Report-Only policy.
    extraDirectives: staged
      ? ["manifest-src 'self'"]
      : ["manifest-src 'self'", "upgrade-insecure-requests"],
  }),
  // The Report-Only companion adds Trusted Types, so the reports name any sink a script hands a string to before it is enforced.
  staged: { trustedTypes: true },
  corp: true,
  // Pre-launch: keep the mockup out of search until BioScience Writers has confirmed its claims (bsw/content-notes.md).
  // public/_headers takes the same header (the `--header` in package.json's headers script); remove both at launch.
  noindex: () => true,
});
