/*
  Navigation and footer sitemap, taken from bsw/content-inventory.md.
  Only the home route exists so far; these hrefs describe the intended sitemap
  for the standalone rebuild and light up as routes are added.
*/

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };

export const primaryNav: NavGroup[] = [
  {
    label: "Services",
    links: [
      { label: "Grant and Proposal Support", href: "/grant-proposal-support/" },
      { label: "Manuscript Editing", href: "/manuscript-editing/" },
      { label: "Visual Design", href: "/visual-design/" },
      { label: "Language Support", href: "/language-support/" },
      { label: "Career Development", href: "/career-development/" },
    ],
  },
  {
    label: "Operations",
    links: [
      { label: "Editing Process", href: "/editing-process/" },
      { label: "Institutional Partnerships", href: "/institutional-partnerships/" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "PhD / MD Editors", href: "/our-experts/" },
      { label: "Knowledge Hub", href: "/knowledge-hub/" },
    ],
  },
];

export const footerGroups: NavGroup[] = [
  {
    label: "Services",
    links: primaryNav[0].links,
  },
  {
    label: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Careers", href: "/careers/" },
      { label: "Contact Us", href: "/contact-us/" },
    ],
  },
  {
    label: "Legal and Support",
    links: [
      { label: "Editing Guarantee", href: "/editing-guarantee/" },
      { label: "Security and Confidentiality", href: "/security-confidentiality/" },
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms of Service", href: "/terms-of-service/" },
      { label: "Cookie Policy", href: "/cookie-policy/" },
    ],
  },
];
