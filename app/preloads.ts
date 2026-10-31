import { preloads } from "@dustinedwards/site-runtime/preload";
import openSans from "@fontsource-variable/open-sans/files/open-sans-latin-wght-normal.woff2?url";

// Every page's preloads and preconnects, declared once: root.tsx's `links` and the `Link` header
// workers/app.ts adds to HTML responses, which Cloudflare Early Hints sends ahead as a 103: the upright Open Sans every
// page's text is set in (the file root.tsx's Fontsource CSS loads). It comes from this origin, so there is no font origin
// to preconnect to. Not the header wordmark: it is a <picture> whose browser picks AVIF or WebP at 1x or 2x, which one
// preload URL cannot name, so it loads first by its own fetchpriority=high instead (components/Logo.tsx).
export const PRELOADS = preloads([
  { href: openSans, as: "font", type: "font/woff2" },
]);
