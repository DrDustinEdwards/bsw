import { preloads, type Preload } from "@dustinedwards/site-runtime/preload";
import openSans from "@fontsource-variable/open-sans/files/open-sans-latin-wght-normal.woff2?url";

// Every page's preloads, declared once: root.tsx's `links` and the `Link` header site-runtime ./worker sends as Early Hints. The upright Open Sans only;
// the header wordmark is a <picture>, so it loads by fetchpriority=high instead (components/Logo.tsx).
export const FONT_PRELOADS: Preload[] = [{ href: openSans, as: "font", type: "font/woff2" }];
export const PRELOADS = preloads(FONT_PRELOADS);
