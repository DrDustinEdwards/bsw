import { preloads } from "@dustinedwards/site-runtime/preload";

// Every page's preloads and preconnects, declared once: root.tsx's `links` and the `Link` header
// workers/app.ts adds to HTML responses, which Cloudflare Early Hints sends ahead as a 103. The header
// wordmark, above the fold on every page, to steady LCP. Open Sans comes from this origin (root.tsx), so
// there is no font origin to preconnect to.
export const PRELOADS = preloads([
  { href: "/brand/bsw-logo-web.webp", as: "image", type: "image/webp" },
]);
