import { preloads } from "@dustinedwards/site-runtime/preload";
import openSans from "@fontsource-variable/open-sans/files/open-sans-latin-wght-normal.woff2?url";

// Every page's preloads and preconnects, declared once: root.tsx's `links` and the `Link` header
// workers/app.ts adds to HTML responses, which Cloudflare Early Hints sends ahead as a 103. The header
// wordmark, above the fold on every page, to steady LCP, and the upright Open Sans every page's text is set in (the
// file root.tsx's Fontsource CSS loads). It comes from this origin, so there is no font origin to preconnect to.
export const PRELOADS = preloads([
  { href: "/brand/bsw-logo-web.webp", as: "image", type: "image/webp" },
  { href: openSans, as: "font", type: "font/woff2" },
]);
