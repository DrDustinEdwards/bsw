import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HexField } from "../components/HexField";
import { EditingDemo } from "../components/EditingDemo";
import { Timeline } from "../components/Timeline";
import { Faq } from "../components/Faq";
import { Reveal } from "../components/Reveal";
import { Marquee, PrimaryButton, SectionHeading } from "../components/ui";
import { institutions, journals } from "../data/logos";
import {
  Banknote,
  Repeat,
  Globe,
  FileText,
  Building2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "BioScience Writers | Scientific editing and medical proofreading services for the global research community",
    },
    {
      name: "description",
      content:
        "PhD & MD editors providing scientific editing, grant writing, and manuscript proofreading services. Fast turnaround for researchers worldwide.",
    },
  ];
}

/*
  IMPORTANT: verify every impact statistic against a current, defensible source
  before this page is published to a real domain. The figures below are carried
  over from the live homepage and are marked unverified in bsw/content-inventory.md
  ($300M+ grants funded, 58% repeat clients, 7,000+ clients, 185 countries,
  37,000+ documents, 2,400+ institutions, 5,000+ journals).
*/
const STATS = [
  { Icon: Banknote, value: "$300,000,000+", label: "Grants Funded (Last 5 Years)" },
  { Icon: Repeat, value: "58%", label: "Repeat Clients" },
  { Icon: Globe, value: "7,000+", label: "Clients in 185 Countries" },
  { Icon: FileText, value: "37,000+", label: "Documents" },
  { Icon: Building2, value: "2,400+", label: "Institutions" },
  { Icon: BookOpen, value: "5,000+", label: "Journals" },
];

// Five service items with their descriptive subheadings, verbatim from the
// reference site. The first item carries the rapid-turnaround note and a quote CTA.
const SERVICES = [
  {
    title: "Grant Review and Editing",
    subhead: "Maximize Your Funding Potential",
    desc: "Strategic PhD-level review, writing, and alignment for NIH, NSF, and Foundation submissions.",
    note: "Rapid Turnaround – Most returned in 7-10 days.",
    cta: "Your Quote",
    href: "/pricing/",
  },
  {
    title: "Manuscript Writing",
    subhead: "Journal-Ready Editing",
    desc: "Precision polishing for clarity, logic, and impact to secure acceptance in top-tier journals.",
  },
  {
    title: "Medical Writing",
    subhead: "Clinical & Regulatory Writing",
    desc: "Expert documentation for Pharma and Biotech, fully compliant with global regulatory standards.",
  },
  {
    title: "Journal Formatting",
    subhead: "Zero-Error Formatting",
    desc: "We handle the technical layout requirements for any target journal, guaranteed.",
  },
  {
    title: "Scientific Translation",
    subhead: "Multilingual Support",
    desc: "Nuance-aware translation that preserves scientific accuracy.",
  },
];

const TEAM = [
  { name: "Susan Marriott", role: "President", photo: "/team/Susan-Marriott.webp" },
  { name: "Charlene Emerson", role: "Director of Business Development", photo: "/team/Charlene-Emerson.webp" },
  { name: "Julie Edwards", role: "Director of Publication Services", photo: "/team/Julie-Edwards.webp" },
  { name: "Lisa Giles", role: "Lead Technical Writer", photo: "/team/Lisa-Giles.webp" },
  { name: "Laura Marinelli", role: "Senior Technical Writer", photo: "/team/Laura-Marinelli.webp" },
];

// Placeholder attributions only. The source testimonials are unverified and
// were attributed to named individuals on the live site; do not reintroduce
// real names or a Nobel laureate here.
const TESTIMONIALS = [
  {
    quote:
      "The grant review turned a solid application into a funded one. The reviewers' concerns we could not see were flagged and fixed before submission.",
    who: "Principal Investigator, R1 research university",
    tone: "green",
  },
  {
    quote:
      "My manuscript was accepted with minor revisions. The editing was rigorous, fast, and clearly done by someone who understood the science.",
    who: "Associate Professor, School of Medicine",
    tone: "peach",
  },
  {
    quote:
      "As a non-native English speaker I finally felt my writing matched the quality of my research. Worth every dollar.",
    who: "Postdoctoral Fellow, cancer research institute",
    tone: "peach",
  },
  {
    quote:
      "We now route every departmental grant through BioScience Writers. The consistency and turnaround are exactly what we needed.",
    who: "Department Chair, public university",
    tone: "green",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#eef4f8] to-white">
          <HexField />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start px-5 py-24 sm:py-32">
            <div className="hero-card max-w-2xl">
              <h1 className="hero-title">Funding Secured. Science Perfected.</h1>
              <p className="hero-subtitle mt-4">
                Strategic Grant Review &amp; Manuscript Editing by PhD/MD
                Experts.
              </p>
              <p className="hero-body mt-4 max-w-xl">
                Fast turnaround, 100% confidentiality, and an uncompromising
                quality guarantee.
              </p>
              <p className="hero-body mt-3 max-w-xl">
                Trusted by PIs at top-tier universities and global research
                institutions for NIH, NSF, and high-impact journal submissions.
              </p>
              <div className="mt-8">
                <PrimaryButton href="/pricing/">View Pricing</PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Impact stats */}
        <section className="bg-[color:var(--color-band)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
            <Reveal>
              <SectionHeading dark title="Our Impact, by the Numbers" />
            </Reveal>
            <Reveal className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <s.Icon
                    className="mx-auto text-white"
                    size={30}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <div className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
                    {s.value}
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* 3. Trusted by / Published in (full-bleed marquees) */}
        <section className="overflow-hidden bg-ink py-14">
          <div className="space-y-10">
            <Reveal>
              <p className="mx-auto mb-4 max-w-6xl px-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Trusted by Researchers At
              </p>
              <Marquee items={institutions} direction="left" />
            </Reveal>
            <Reveal delay={80}>
              <p className="mx-auto mb-4 max-w-6xl px-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Published In
              </p>
              <Marquee items={journals} direction="right" />
            </Reveal>
          </div>
        </section>

        {/* 4. Services */}
        <section id="services" className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Our Services"
                title="Personal Expert Scientists for High-Impact Research"
                intro="We provide the highest quality scientific editing, writing, and strategy services. Our editors are PhD and MD-credentialed professionals who understand that competing successfully for grant funding is critical to your career success."
              />
            </Reveal>

            {/* Five service items */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-slate-900/5">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-brand">
                      {s.subhead}
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                      {s.desc}
                    </p>
                    {s.note && (
                      <p className="mt-4 text-sm font-semibold text-[#577e20]">
                        {s.note}
                      </p>
                    )}
                    {s.cta && (
                      <div className="mt-5">
                        <a
                          href={s.href}
                          className="inline-block rounded-[var(--radius-btn)] bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
                        >
                          {s.cta}
                        </a>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* BSW Academy banner */}
            <Reveal className="mt-6">
              <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#8dc63f]/40 bg-[color:color-mix(in_srgb,#8dc63f_10%,white)] p-7 sm:flex-row">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#577e20]">
                    BSW Academy
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                    Elite Scientific Writing Curriculum
                  </h3>
                  <p className="mt-1 text-[0.95rem] text-muted">
                    Master the mechanics of high-impact publishing and
                    grant-winning through our expert-led eCourses.
                  </p>
                </div>
                <a
                  href="/knowledge-hub/"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-btn)] bg-[#577e20] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#466618]"
                >
                  Explore courses
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. Precision Editing Demonstrated */}
        <section className="bg-[#f7f9fb]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Precision Editing, Demonstrated"
                title="The Difference Expert Editing Makes"
                intro="Every manuscript edited by BioScience Writers receives both line-level editorial review and field-specific scientific commentary from a credentialed PhD or MD expert. Select any highlighted passage to examine the rationale behind each revision."
              />
            </Reveal>
            <Reveal className="mt-12">
              <EditingDemo />
            </Reveal>
          </div>
        </section>

        {/* 6. Testimonials */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Trusted Worldwide"
                title="What Our Clients Say"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={(i % 2) * 80}>
                  <figure
                    className={`h-full rounded-2xl p-8 ${
                      t.tone === "green"
                        ? "bg-gradient-to-br from-[#eef6e2] to-[#fbfdf6]"
                        : "bg-gradient-to-br from-[#fdeee2] to-[#fffaf6]"
                    }`}
                  >
                    <div className="font-display text-4xl leading-none text-brand/30" aria-hidden="true">
                      &ldquo;
                    </div>
                    <blockquote className="mt-2 text-[1.05rem] leading-relaxed text-ink">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-5 text-sm font-semibold text-muted">
                      {t.who}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-slate-400">
              Attributions are representative role descriptions, not named
              individuals.
            </p>
          </div>
        </section>

        {/* 7. Streamlined four-step process (vertical timeline) */}
        <section className="bg-[#f7f9fb]">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Streamlined process, start to finish"
                title="Your Path from Submission to Success"
                intro="Every order follows our proven four-step workflow: expert matching, comprehensive editing, track changes delivery, and our satisfaction guarantee. See exactly what happens from the moment you submit your document."
              />
            </Reveal>
            <div className="mt-14">
              <Timeline />
            </div>
          </div>
        </section>

        {/* 8. Team */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Behind every edit"
                title="Experienced Professionals Managing Every Detail"
                intro="Our core team personally oversees every project from first submission to final delivery. Each document is matched with a field-specific PhD or MD specialist, ensuring your work receives the scientific expertise it deserves."
              />
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {TEAM.map((member, i) => (
                <Reveal key={member.name} delay={i * 50}>
                  <div className="text-center">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="mx-auto aspect-[4/5] w-full max-w-[160px] rounded-2xl object-cover object-top"
                    />
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="bg-[#f7f9fb]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Clear answers, no surprises"
                title="Frequently Asked Questions"
                intro="Find quick answers to the most common questions about our editing process, turnaround times, credentials, and satisfaction guarantee."
              />
            </Reveal>
            <Reveal className="mt-12">
              <Faq />
            </Reveal>
            <Reveal className="mt-8 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                Still have questions?
              </p>
              <p className="mt-1 text-sm text-muted">
                Our team responds within one business day.
              </p>
              <a
                href="/contact-us/"
                className="mt-4 inline-block rounded-[var(--radius-btn)] bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
              >
                Ask Us a Question
              </a>
            </Reveal>
          </div>
        </section>

        {/* 10. BSW Commitment band */}
        <section className="bg-brand">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                The BSW Commitment
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/85">
                Since 2001, we have helped the international research community
                maximize the accuracy and impact of their documents. Every
                editor on our team is a native English speaker with a terminal
                degree (PhD, MD, or DVM) and active expertise in your specific
                field of research. We combine elite scientific precision with
                personal attention and rapid turnaround to ensure your work
                stands out.
              </p>
              <p className="mx-auto mt-6 inline-block rounded-[var(--radius-btn)] bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                100% Satisfaction Guarantee – Free re-edits for language issues
                raised by reviewers.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
