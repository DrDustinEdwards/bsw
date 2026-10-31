/*
  Centralized homepage content, separated from presentation. Each array is
  typed and consumed by a matching presentational component (StatItem,
  ServiceCard, TeamMember, FaqItem, Testimonials). Copy is carried over from
  the reference site.
*/
import {
  Banknote,
  Repeat,
  Globe,
  FileText,
  Building2,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export type Stat = { Icon: LucideIcon; value: string; label: string };

export const STATS: Stat[] = [
  { Icon: Banknote, value: "$300,000,000+", label: "Grants Funded (Last 5 Years)" },
  { Icon: Repeat, value: "58%", label: "Repeat Clients" },
  { Icon: Globe, value: "7,000+", label: "Clients in 185 Countries" },
  { Icon: FileText, value: "37,000+", label: "Documents" },
  { Icon: Building2, value: "2,400+", label: "Institutions" },
  { Icon: BookOpen, value: "5,000+", label: "Journals" },
];

type Flagship = {
  title: string;
  subhead: string;
  desc: string;
  note: string;
  cta: string;
  href: string;
  photo: string;
};

export const FLAGSHIP: Flagship = {
  title: "Grant Review and Editing",
  subhead: "Maximize Your Funding Potential",
  desc: "Strategic PhD-level review, writing, and alignment for NIH, NSF, and Foundation submissions.",
  note: "Rapid Turnaround, most returned in 7-10 days.",
  cta: "Your Quote",
  href: "/pricing",
  photo: "/services/grant-review.webp",
};

export type ServiceCard = {
  title: string;
  subhead: string;
  desc: string;
  accent: string;
};

// Accent color drives each card's hover inner-glow and arrow.
export const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Manuscript Writing",
    subhead: "Journal-Ready Editing",
    desc: "Precision polishing for clarity, logic, and impact to secure acceptance in top-tier journals.",
    accent: "var(--color-accent-blue)",
  },
  {
    title: "Medical Writing",
    subhead: "Clinical & Regulatory Writing",
    desc: "Expert documentation for Pharma and Biotech, fully compliant with global regulatory standards.",
    accent: "var(--color-accent-blue)",
  },
  {
    title: "Journal Formatting",
    subhead: "Zero-Error Formatting",
    desc: "We handle the technical layout requirements for any target journal, guaranteed.",
    accent: "var(--color-accent-green)",
  },
  {
    title: "Scientific Translation",
    subhead: "Multilingual Support",
    desc: "Nuance-aware translation that preserves scientific accuracy.",
    accent: "var(--color-accent-orange)",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  accent: string;
};

// Caption panel accent glow runs orange, blue, blue, green, green.
export const TEAM: TeamMember[] = [
  { name: "Susan Marriott", role: "President", photo: "/team/Susan-Marriott.webp", accent: "var(--color-accent-orange)" },
  { name: "Charlene Emerson", role: "Director of Business Development", photo: "/team/Charlene-Emerson.webp", accent: "var(--color-accent-blue)" },
  { name: "Julie Edwards", role: "Director of Publication Services", photo: "/team/Julie-Edwards.webp", accent: "var(--color-accent-blue)" },
  { name: "Lisa Giles", role: "Lead Technical Writer", photo: "/team/Lisa-Giles.webp", accent: "var(--color-accent-green)" },
  { name: "Laura Marinelli", role: "Senior Technical Writer", photo: "/team/Laura-Marinelli.webp", accent: "var(--color-accent-green)" },
];

type Faq = { q: string; a: string };

// Question set and answers verbatim from the reference site.
export const FAQS: Faq[] = [
  {
    q: "How much will editing cost?",
    a: "Visit our prices page for our hourly rate and estimate calculator. Because all work is done hourly, you can reduce costs by spell-checking your document and ensuring it's well organized before submission.",
  },
  {
    q: "What are your credentials?",
    a: "BioScience Writers was founded in 2001 and has edited thousands of manuscripts and grants. All of our editors are native English-speaking, PhD- or MD-trained scientists with active expertise in your specific field of research. Our staff members maintain active roles at various universities.",
  },
  {
    q: "How long will it take to edit my document?",
    a: "Typical turnaround time for a 3,000-5,000-word manuscript is 5-7 days. Longer documents may require more time, but can usually be completed in 7-10 days. Rush service is available upon request and can be as quick as next-day for most documents.",
  },
  {
    q: "Can you revise my grant or manuscript quickly or on short notice?",
    a: "Yes! We offer rush service as quickly as next-day for most documents. Just email or call to let us know what you need. Rush service may require an additional fee depending on turnaround time, document length, and complexity.",
  },
  {
    q: "Is your service confidential?",
    a: "Yes! All submitted documents are held in strict confidence. Everyone at BioScience Writers, editors and staff, has signed a legally binding nondisclosure and confidentiality agreement. We can provide a signed confidentiality agreement before you submit your document if requested.",
  },
  {
    q: "What exactly will you do to improve my writing?",
    a: "Depending on the editing level you select, we will correct spelling, grammar, punctuation, verb tense, and formatting. We also edit for clarity, word count, style, and impact, eliminating jargon, smoothing language, and rewriting to improve sentence clarity and organization.",
  },
  {
    q: "What if I am not happy with the work?",
    a: "Please let us know immediately! We will respond quickly to completely resolve your concerns. If we cannot completely satisfy you within 30 days of receiving your revisions, we will provide a complete refund.",
  },
  {
    q: "How will I receive my revisions?",
    a: "You can download your revisions from our secure website or receive them via email as attachments. Either way, we'll send an email notification when your revisions are complete. You'll receive two files: one showing all changes with Track Changes, and one with all changes accepted.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  honor: string;
  org: string;
  accent: string;
};

// The real attributions from the reference site, named at the client's request.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Excellent attention to detail. The turnaround time is remarkable for the level of scientific depth provided.",
    name: "Dr. Shinya Yamanaka",
    honor: "Nobel Laureate",
    org: "Kyoto University",
    accent: "var(--color-accent-green)",
  },
  {
    quote:
      "The editors at BioScience Writers are highly skilled and provide very thorough and helpful feedback. Invaluable for our research group.",
    name: "Dr. Jennifer L. West",
    honor: "Pierre Galletti Award",
    org: "Duke University",
    accent: "var(--color-accent-blue)",
  },
  {
    quote:
      "Invaluable service for researchers aiming for high-impact journals. Their editing is an essential part of our process.",
    name: "Dr. Hideyuki Okano",
    honor: "Medal with Purple Ribbon",
    org: "Keio University",
    accent: "var(--color-accent-orange)",
  },
  {
    quote:
      "Consistent quality and deep understanding of molecular biology. Their feedback is as valuable as a formal peer review.",
    name: "Dr. Paolo Sassone-Corsi",
    honor: "EMBO Gold Medalist",
    org: "UC Irvine",
    accent: "var(--color-accent-slate)",
  },
];
