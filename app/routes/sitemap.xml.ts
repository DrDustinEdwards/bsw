import { sitemapDocument } from "@drdustinedwards/site-helpers/sitemap";
import { absUrl } from "../config/site";
import { PAGES } from "../config/pages";
import { FLAGSHIP, TEAM } from "../data/content";
import { mediaUrl } from "../lib/media/images";

/*
  Dynamic sitemap covering every indexable route (config/pages.ts). Resource route: returns XML directly with no HTML
  shell. The home page lists the photographs it shows (the grant review card and the team), at their /media address;
  the header and footer logos are on every page and are not its content.
*/
const HOME_PHOTOS = [FLAGSHIP.photo, ...TEAM.map((member) => member.photo)].map((photo) => absUrl(mediaUrl(photo.src.slice(1))));

export function loader() {
  const xml = sitemapDocument(
    PAGES.map(({ path }) => ({
      loc: absUrl(path),
      changefreq: "monthly",
      priority: path === "/" ? 1 : 0.7,
      ...(path === "/" ? { images: HOME_PHOTOS } : {}),
    })),
    { layout: "expanded" },
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
