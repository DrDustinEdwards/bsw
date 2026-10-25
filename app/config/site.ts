/*
  Single source of truth for site-wide constants used by SEO, social, and
  structured-data helpers. When the custom domain is decided, change the base
  URL here (README.md).
*/
import { absoluteUrl, headTags } from "@drdustinedwards/site-helpers/head";
import { jsonLd } from "@drdustinedwards/site-helpers/schema";
import { organizationLd } from "./structured-data";

export const SITE = {
  name: "BioScience Writers",
  legalName: "BioScience Writers LLC",
  // Absolute origin, no trailing slash. Currently the live Cloudflare Worker.
  url: "https://bsw.dustin-edwards.workers.dev",
  founded: "2001",
  description:
    "Scientific editing, grant writing, and manuscript proofreading by PhD and MD experts for the global research community.",
  ogImage: "/og-image.png",
  twitter: "@biosciencewrite",
  email: "info@biosciencewriters.com",
  telephone: "+1-832-517-3001",
  social: {
    facebook: "https://facebook.com/BioScienceWriters",
    x: "https://x.com/biosciencewrite",
    linkedin: "https://linkedin.com/company/bioscience-writers-llc",
  },
  locality: "Houston",
  region: "TX",
  country: "US",
} as const;

/** The site's IndexNow key, public by the protocol's design: served as /<key>.txt and sent after each deploy. */
export const INDEXNOW_KEY = "b6f5f05fb7013a33e9258707d055b2d7";

/** The vulnerability contact /.well-known/security.txt lists, and the date it is next confirmed by (the family check warns first). */
export const SECURITY_CONTACT = "security@dustinedwards.info";
export const SECURITY_TXT_EXPIRES = "2027-09-28T00:00:00Z";

/** Build an absolute URL from a site-relative path. */
export function absUrl(path: string): string {
  return absoluteUrl(SITE.url, path.startsWith("/") ? path : `/${path}`);
}

/*
  Per-route meta builder: Prelum's headTags (title, description, canonical, Open Graph, Twitter) with
  the site card, plus the site-wide Organization JSON-LD. Every route calls this so the social and
  canonical surface stays consistent.
*/
export function pageMeta({
  title,
  description,
  path,
  fullTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** Set true when `title` is already the complete <title>. */
  fullTitle?: boolean;
}): Record<string, unknown>[] {
  return [
    ...headTags({
      origin: SITE.url,
      path,
      title: fullTitle ? title : `${title} | ${SITE.name}`,
      description,
      image: { url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} logo and tagline` },
      siteName: SITE.name,
    }),
    { name: "twitter:site", content: SITE.twitter },
    jsonLd(organizationLd()),
  ];
}
