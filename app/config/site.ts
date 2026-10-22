/*
  Single source of truth for site-wide constants used by SEO, social, and
  structured-data helpers. When the custom domain is decided, change the base
  URL here and in public/robots.txt and public/llms.txt (README.md).
*/
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

/** Build an absolute URL from a site-relative path. */
export function absUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return SITE.url + path;
}

type MetaDescriptor = Record<string, unknown>;

/*
  Per-route meta builder. Returns a React Router meta array with a unique
  title and description, a canonical link, and the full Open Graph / Twitter
  card set. Every route calls this so the social + canonical surface stays
  consistent and DRY.
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
}): MetaDescriptor[] {
  const computedTitle = fullTitle ? title : `${title} | ${SITE.name}`;
  const canonical = absUrl(path);
  const image = absUrl(SITE.ogImage);

  return [
    { title: computedTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonical },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: computedTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${SITE.name} logo and tagline` },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: SITE.twitter },
    { name: "twitter:title", content: computedTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
