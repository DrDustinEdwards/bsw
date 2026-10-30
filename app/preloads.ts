import { preloads } from "@dustinedwards/site-runtime/preload";

// Every page's preloads and preconnects, declared once: root.tsx's `links` and the `Link` header
// workers/app.ts adds to HTML responses, which Cloudflare Early Hints sends ahead as a 103. The Google
// Fonts origins (the font files come from gstatic in CORS mode, hence its crossorigin) and the header
// wordmark, above the fold on every page, to steady LCP.
export const PRELOADS = preloads([
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { href: "/brand/bsw-logo-web.webp", as: "image", type: "image/webp" },
]);
