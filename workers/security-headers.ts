// Every security header bsw sends, in one place: the header set and the page policy below, applied to every response by
// site-runtime ./worker (workers/app.ts).
import { TDM_RESERVATION_HEADERS } from "@drdustinedwards/site-helpers/robots";
import { buildSecurityHeaders } from "@dustinedwards/site-runtime/headers";
import { pageSecurity } from "@dustinedwards/site-runtime/page-headers";
import { bsw } from "@dustinedwards/site-runtime/sites";

// The site's registry entry (site-runtime ./sites: COEP and the Integrity-Policy Report-Only come from it) plus
// Prelum's TDMRep header, which reserves training rights as /ai.txt says; the CSP is below. public/_headers is written
// from the same entry by site-runtime-headers (npm run headers), with the same two extra headers.
const SECURITY_HEADERS = {
  ...buildSecurityHeaders({ site: bsw }),
  ...TDM_RESERVATION_HEADERS,
};

/*
  First-party except the analytics beacon. A page has no inline script to hash: React reaches no browser (no
  <Scripts />), /site.js is the one script and 'self' covers it, and the JSON-LD blocks are data, which script-src does
  not govern. The policy also names the render's nonce, renewed for each reader of a stored page (site-runtime
  ./worker), as on every site; `vite dev` uses it for the <style> Vite's client injects. An inline script added later
  is blocked and reported to /csp-report. Style attributes get style-src-attr.
*/
export const { withSecurityHeaders } = pageSecurity({
  set: SECURITY_HEADERS,
  policy: ({ nonce, staged }) => ({
    nonce,
    sources: { img: ["data:"] },
    styleAttributesInline: true,
    // workers.dev is not proxied, so Cloudflare injects no beacon: the page carries it (app/root.tsx) and it reports to cloudflareinsights.com.
    cloudflareWebAnalytics: "manual",
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
