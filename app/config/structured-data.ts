// JSON-LD, built with Prelum's schema helpers and written into the head through each route's meta
// (React Router escapes it). Content is static and trusted.
import { absoluteUrl } from "@drdustinedwards/site-helpers/head";
import { faqPage, thing, website } from "@drdustinedwards/site-helpers/schema";
import { FAQS } from "../data/content";
import { SITE } from "./site";

/** Site-wide Organization, on every page through pageMeta. */
export function organizationLd() {
  return thing("Organization", {
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl(SITE.url, "/brand/apple-touch-icon-180.e581bbfc.png"),
    foundingDate: SITE.founded,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.telephone,
      contactType: "customer service",
      email: SITE.email,
    },
    sameAs: Object.values(SITE.social),
  });
}

/** Home-page WebSite (the node every page's WebPage names by its @id), Service and FAQPage. */
export function homeLd() {
  return [
    website({ origin: SITE.url, name: SITE.name, description: SITE.description }),
    thing("Service", {
      serviceType: "Scientific editing and grant writing",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      areaServed: "Worldwide",
      description:
        "Strategic grant review, manuscript editing, medical writing, journal formatting, and scientific translation by PhD and MD experts.",
      offers: { "@type": "Offer", priceCurrency: "USD", url: absoluteUrl(SITE.url, "/pricing") },
    }),
    faqPage(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
  ];
}
