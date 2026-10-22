import { SITE, absUrl } from "../config/site";
import { FAQS } from "../data/content";

/*
  JSON-LD structured data. Rendered server-side into <script> tags so search
  and AI answer engines can read the facts directly. Content is static and
  trusted (no user input), so dangerouslySetInnerHTML is safe here. "<" is
  escaped anyway, so a "</script>" in a later FAQ or testimonial edit cannot
  close the tag.
*/
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// Site-wide Organization. Rendered from the shared layout on every page.
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: absUrl("/brand/bsw-cube-mark.png"),
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
      }}
    />
  );
}

// Home-page Service and FAQPage.
export function HomeJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Scientific editing and grant writing",
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
          areaServed: "Worldwide",
          description:
            "Strategic grant review, manuscript editing, medical writing, journal formatting, and scientific translation by PhD and MD experts.",
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            url: absUrl("/pricing/"),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
