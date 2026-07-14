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
  const urls = PATHS.map((p) => {
    const priority = p === "/" ? "1.0" : "0.7";
    return `  <url>\n    <loc>${absUrl(p)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
