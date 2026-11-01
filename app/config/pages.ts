// Every page's title, description and address, in the order the sitemap lists them: the one list the route meta
// (config/site.ts pageMeta), the sitemap and the share cards (vite.config.ts) read. Imports nothing, so the build can
// read it. Copy carried over from the reference site; its claims are Dustin's to change (CLAUDE.md, hard rule 1).
export type Page = { path: string; title: string; description: string; fullTitle?: boolean };

export const PAGES = [
  {
    path: "/",
    title: "BioScience Writers | Scientific and Medical Editing",
    fullTitle: true,
    description:
      "PhD & MD editors providing scientific editing, grant writing, and manuscript proofreading services. Fast turnaround for researchers worldwide.",
  },
  {
    path: "/grant-proposal-support",
    title: "Grant and Proposal Support",
    description:
      "Strategic grant review, consulting, and writing support for NIH, NSF, DoD, and private foundation applications.",
  },
  {
    path: "/manuscript-editing",
    title: "Manuscript Editing",
    description:
      "Expert MD/PhD editing for medical, scientific, and academic manuscripts, presentations, and posters.",
  },
  {
    path: "/visual-design",
    title: "Visual Design",
    description:
      "Publication-ready figures, tables, medical illustration, and journal formatting for scientific content.",
  },
  {
    path: "/language-support",
    title: "Language Support",
    description:
      "Scientific translation and ESL language polishing for international researchers.",
  },
  {
    path: "/career-development",
    title: "Career Development",
    description:
      "PhD-level editorial support for dissertations, theses, CV and biosketch formatting, monographs, and faculty development.",
  },
  {
    path: "/editing-process",
    title: "Our Process: The BSW Scientific Pipeline",
    description:
      "A four-phase editing pipeline with PhD-led editing, rush turnaround, multi-stage quality control, and submission-ready delivery.",
  },
  {
    path: "/institutional-partnerships",
    title: "Institutional Partnerships",
    description:
      "Enterprise-grade scientific support for universities, biotech, and research hospitals, including MSAs, consolidated billing, and bulk credits.",
  },
  {
    path: "/pricing",
    title: "Pricing",
    description:
      "Flat-rate, per-word scientific editing pricing with no hidden fees across Standard, Accelerated, and Critical Rush turnaround tiers.",
  },
  {
    path: "/our-experts",
    title: "PhD/MD Editors",
    description:
      "An elite network of MD and PhD editors providing subject-matter expert review across every scientific discipline.",
  },
  {
    path: "/knowledge-hub",
    title: "Knowledge Hub",
    description:
      "A centralized library of articles, video tutorials, FAQs, and tools for scientific writing and grant applications.",
  },
  {
    path: "/about-us",
    title: "About Us",
    description:
      "Founded in 2001, BioScience Writers is a team of research scientists and physicians providing scientific editing, writing, and grant support.",
  },
  {
    path: "/careers",
    title: "Careers",
    description:
      "BioScience Writers is seeking editors and writers with advanced scientific degrees and extensive grant editing experience.",
  },
  {
    path: "/contact-us",
    title: "Contact Us",
    description:
      "Reach BioScience Writers by phone, fax, or email. Business office located in Houston, Texas.",
  },
  {
    path: "/editing-guarantee",
    title: "Editing Guarantee",
    description:
      "Our quality guarantee, re-editing promise, certificates of scientific editing, and satisfaction policy for MD/PhD-reviewed manuscripts.",
  },
  {
    path: "/security-confidentiality",
    title: "Security and Confidentiality",
    description:
      "Our multi-layered security framework protects your unpublished research with 256-bit encryption, mandatory NDAs, and a zero-distribution policy.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How BioScience Writers collects, uses, and safeguards your personal and research data, including GDPR and CCPA compliance.",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service",
    description:
      "The professional relationship, service scope, payment, refund, and intellectual property terms governing BioScience Writers editorial services.",
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy",
    description:
      "How BioScience Writers uses cookies and similar tracking technologies, and how you can manage your preferences.",
  },
  {
    path: "/accessibility",
    title: "Accessibility Statement",
    description:
      "How BioScience Writers works to meet WCAG 2.2 level AA, what is still open, and how to report an accessibility problem.",
  },
] as const satisfies readonly Page[];

export type PagePath = (typeof PAGES)[number]["path"];

/** The page at `path`. */
export function page(path: PagePath): Page {
  return PAGES.find((p) => p.path === path)!;
}

/** A page's own share card, drawn at build time from its title and description (vite.config.ts): /og/<path>.png. */
export function shareCardPath(path: string): string {
  return `/og/${path.slice(1)}.png`;
}
