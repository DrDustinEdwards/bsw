// What every page does in the browser, without a framework, bundled into /site.js by vite.config.ts.
// Each part finds its server-rendered markup by a data- attribute and does nothing on a page without it.
// The FAQ needs no script: it is native <details> (Faq.tsx).
//
// What only some pages use is an island (app/islands/, devkit's siteScript bundles each to /islands/<name>.js):
// the home page's hex field, testimonials carousel, timeline and editing demo. startIslands loads one only
// where an element names it with data-island, so the other pages never download them.
import { startPage } from "@dustinedwards/site-runtime/page-client";
import { startIslands } from "@dustinedwards/devkit/islands";
import { enhance as enhanceSiteHeader } from "capsomer/behavior/site-header";

// Sections fade and drop into place the first time they scroll into view.
function enhanceReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of document.querySelectorAll(".reveal")) io.observe(el);
}

startPage();
enhanceSiteHeader();
enhanceReveal();
startIslands();
