import { sitemapDocument } from "@drdustinedwards/site-helpers/sitemap";
import { absUrl } from "../config/site";

/*
  Dynamic sitemap covering every indexable route. Resource route: returns XML
  directly with no HTML shell. Keep PATHS in sync with routes.ts.
*/
const PATHS = [
  "/",
  "/grant-proposal-support/",
  "/manuscript-editing/",
  "/visual-design/",
  "/language-support/",
  "/career-development/",
  "/editing-process/",
  "/institutional-partnerships/",
  "/pricing/",
  "/our-experts/",
  "/knowledge-hub/",
  "/about-us/",
  "/careers/",
  "/contact-us/",
  "/editing-guarantee/",
  "/security-confidentiality/",
  "/privacy-policy/",
  "/terms-of-service/",
  "/cookie-policy/",
];

export function loader() {
  const xml = sitemapDocument(
    PATHS.map((p) => ({ loc: absUrl(p), changefreq: "monthly", priority: p === "/" ? 1 : 0.7 })),
    { layout: "expanded" },
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
