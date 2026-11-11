// What every page does in the browser, without a framework, bundled into /site.js by vite.config.ts.
// Each part finds its server-rendered markup by a data- attribute and does nothing on a page without it.
// The FAQ needs no script: it is native <details> (Faq.tsx). The scroll reveals, the marquees and the
// header's stuck state are CSS (Capsomer's reveal, marquee and site header).
//
// What only some pages use is an island (app/islands/, devkit's siteScript bundles each to /islands/<name>.js):
// the home page's hex field, testimonials carousel, timeline and editing demo. startIslands loads one only
// where an element names it with data-island, so the other pages never download them.
import { startPage } from "@dustinedwards/site-runtime/page-client";
import { startIslands } from "@dustinedwards/devkit/islands";
import { enhance as enhanceHeader } from "capsomer/behavior/site-header";

startPage();
// The header's dropdowns, tips and phone sheet: no React reaches this page, so `enhance` wires the server-rendered
// header (hydrate={false}).
enhanceHeader();
startIslands();
