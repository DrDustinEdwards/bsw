import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HexField } from "../components/HexField";
import { EditingDemo } from "../components/EditingDemo";
import { Timeline } from "../components/Timeline";
import { Faq } from "../components/Faq";
import { Testimonials } from "../components/Testimonials";
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

// Services, structured to match the reference: one flagship card (with photo)
// on the left, a 2x2 grid of secondary service cards on the right, and the BSW
// Academy banner beneath the grid. Copy is verbatim from the reference site.
const FLAGSHIP = {
  title: "Grant Review and Editing",
  subhead: "Maximize Your Funding Potential",
  desc: "Strategic PhD-level review, writing, and alignment for NIH, NSF, and Foundation submissions.",
  note: "Rapid Turnaround, most returned in 7-10 days.",
  cta: "Your Quote",
  href: "/pricing/",
  photo: "/services/grant-review.webp",
};

// Each card carries an accent color used for its hover inner-glow and arrow,
// matching the reference: the two top cards glow blue, then green and orange.
const SERVICE_CARDS = [
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

// Each card's caption panel carries a soft accent glow, matching the reference:
// the row runs orange, blue, blue, green, green across the five members.
const TEAM = [
  { name: "Susan Marriott", role: "President", photo: "/team/Susan-Marriott.webp", accent: "var(--color-accent-orange)" },
  { name: "Charlene Emerson", role: "Director of Business Development", photo: "/team/Charlene-Emerson.webp", accent: "var(--color-accent-blue)" },
  { name: "Julie Edwards", role: "Director of Publication Services", photo: "/team/Julie-Edwards.webp", accent: "var(--color-accent-blue)" },
  { name: "Lisa Giles", role: "Lead Technical Writer", photo: "/team/Lisa-Giles.webp", accent: "var(--color-accent-green)" },
  { name: "Laura Marinelli", role: "Senior Technical Writer", photo: "/team/Laura-Marinelli.webp", accent: "var(--color-accent-green)" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-[linear-gradient(115deg,#d9e8f3_0%,#e6eeec_32%,#fce7d5_66%,#eef4dd_100%)]">
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

        {/*
          2. Impact stats + trust marquees. On the reference these sit in one
          continuous dark band with diagonal top/bottom edges, so they are a
          single section here. The band-cut class (app.css) draws the slants.
        */}
        <section className="band-cut overflow-hidden">
          <span aria-hidden="true" className="band-ghost band-ghost--top" />
          <span aria-hidden="true" className="band-slab" />
          <span aria-hidden="true" className="band-ghost band-ghost--bottom" />
          <div className="relative z-[3] mx-auto max-w-6xl px-5 pb-20 pt-24 sm:pt-28">
            <Reveal>
              <SectionHeading dark title="Our Impact, by the Numbers" />
            </Reveal>
            <Reveal className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <s.Icon
                    className="mx-auto text-white/80"
                    size={30}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <div className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                    {s.value}
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 sm:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="relative z-[3] space-y-8 pb-20">
            <Reveal>
              <h2 className="mx-auto mb-6 max-w-6xl px-5 text-center font-display text-2xl font-extrabold uppercase tracking-[0.01em] text-white sm:text-3xl">
                Trusted by Researchers At
              </h2>
              <Marquee items={institutions} direction="left" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mx-auto mb-6 max-w-6xl px-5 text-center font-display text-2xl font-extrabold uppercase tracking-[0.01em] text-white sm:text-3xl">
                Published In
              </h2>
              <Marquee items={journals} direction="right" />
            </Reveal>
          </div>
        </section>

        {/* 3. Services: flagship card + 2x2 grid + BSW Academy banner */}
        <section id="services" className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                title="Our Services"
                subtitle="Personal Expert Scientists for High-Impact Research"
                intro="We provide the highest quality scientific editing, writing, and strategy services. Our editors are PhD and MD-credentialed professionals who understand that competing successfully for grant funding is critical to your career success."
              />
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-12">
              {/* Flagship card */}
              <Reveal className="lg:col-span-5">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[color:var(--color-band)] shadow-lg shadow-slate-900/10">
                  <img
                    src={FLAGSHIP.photo}
                    alt="A BioScience Writers editor reviewing a grant with a researcher"
                    loading="lazy"
                    className="min-h-[13rem] w-full flex-1 object-cover"
                  />
                  <div className="flex flex-col p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-blue-soft">
                      Flagship Service
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white">
                      {FLAGSHIP.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-white/90">
                      {FLAGSHIP.subhead}
                    </p>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-200">
                      {FLAGSHIP.desc}
                    </p>
                    <p className="mt-4 text-[0.95rem] text-slate-200">
                      {FLAGSHIP.note}
                    </p>
                    <div className="mt-6">
                      <PrimaryButton href={FLAGSHIP.href}>
                        {FLAGSHIP.cta}
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* 2x2 grid of secondary services + Academy banner */}
              <div className="lg:col-span-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  {SERVICE_CARDS.map((s, i) => (
                    <Reveal key={s.title} delay={(i % 2) * 60}>
                      <div
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                        style={{ "--accent": s.accent } as React.CSSProperties}
                      >
                        {/* Accent inner glow (bottom + right), revealed on hover */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(125% 115% at 100% 100%, color-mix(in srgb, ${s.accent} 24%, transparent) 0%, transparent 68%)`,
                          }}
                        />
                        <div className="relative flex flex-1 flex-col p-7">
                          <h3 className="font-display text-xl font-bold text-ink">
                            {s.title}
                          </h3>
                          <p className="mt-1 text-sm font-bold text-ink/80">
                            {s.subhead}
                          </p>
                          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                            {s.desc}
                          </p>
                          <div className="mt-6 flex flex-1 items-end justify-end">
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-icon-muted transition-colors duration-200 group-hover:border-[color:var(--accent)] group-hover:[color:var(--accent)]"
                              aria-hidden="true"
                            >
                              <ArrowRight size={16} strokeWidth={2} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* BSW Academy banner */}
                <Reveal className="mt-6">
                  <div className="rounded-2xl bg-[color:var(--color-band)] p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-green-soft">
                      eCourse &middot; Self-Paced Learning
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white">
                      BSW Academy
                    </h3>
                    <p className="mt-1 text-sm font-bold text-white/90">
                      Elite Scientific Writing Curriculum
                    </p>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-200">
                      Master the mechanics of high-impact publishing and
                      grant-winning through our expert-led eCourses.{" "}
                      <a
                        href="/knowledge-hub/"
                        className="inline-flex items-center gap-1 font-semibold text-accent-green-soft hover:underline"
                      >
                        Explore courses
                        <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                      </a>
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Precision Editing Demonstrated */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                title="Precision Editing, Demonstrated"
                subtitle="The Difference Expert Editing Makes"
                intro="Every manuscript edited by BioScience Writers receives both line-level editorial review and field-specific scientific commentary from a credentialed PhD or MD expert. Select any highlighted passage to examine the rationale behind each revision."
              />
            </Reveal>
            <Reveal className="mt-12">
              <EditingDemo />
            </Reveal>
          </div>
        </section>

        {/* 5. Testimonials (anonymized content, reference carousel styling) */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                title="Trusted Worldwide"
                subtitle="What Our Clients Say"
                intro="From Nobel Laureates and Academy members to deans and principal investigators at top institutions worldwide, researchers trust BioScience Writers to help secure funding and publish in high-impact journals."
              />
            </Reveal>
            <Reveal className="mt-12">
              <Testimonials />
            </Reveal>
          </div>
        </section>

        {/* 6. Streamlined four-step process (vertical timeline) */}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                title="Streamlined Process, Start to Finish"
                subtitle="Your Path from Submission to Success"
                intro={
                  <>
                    Every order follows our proven four-step workflow: expert
                    matching, comprehensive editing, track changes delivery, and
                    our satisfaction guarantee. See exactly what happens from the
                    moment you submit your document.{" "}
                    <a
                      href="/editing-process/"
                      className="font-semibold text-brand hover:underline"
                    >
                      See our full process &rarr;
                    </a>
                  </>
                }
              />
            </Reveal>
            <div className="mt-14">
              <Timeline />
            </div>
          </div>
        </section>

        {/* 7. Team */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                title="Behind Every Edit"
                subtitle="Experienced Professionals Managing Every Detail"
                intro="Our core team personally oversees every project from first submission to final delivery. Each document is matched with a field-specific PhD or MD specialist, ensuring your work receives the scientific expertise it deserves."
              />
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {TEAM.map((member, i) => (
                <Reveal key={member.name} delay={i * 50}>
                  <div className="mx-auto flex h-full max-w-[220px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-900/5 sm:max-w-none">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover object-top"
                    />
                    <div
                      className="flex flex-1 flex-col px-4 py-5 text-center"
                      style={{
                        background: `linear-gradient(180deg, #ffffff 0%, color-mix(in srgb, ${member.accent} 15%, transparent) 100%)`,
                      }}
                    >
                      <h3 className="font-display text-lg font-bold text-ink">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm leading-snug text-muted">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                title="Clear Answers, No Surprises"
                subtitle="Frequently Asked Questions"
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
              <PrimaryButton href="/contact-us/" className="mt-4">
                Ask Us a Question
              </PrimaryButton>
            </Reveal>
          </div>
        </section>

        {/* 9. BSW Commitment band */}
        <section className="bg-[color:var(--color-band)]">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-[0.01em] text-white sm:text-4xl lg:text-5xl">
                The BSW Commitment
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/85">
                Since 2001, we have helped the international research community
                maximize the accuracy and impact of their documents. Every
                editor on our team is a native English speaker with a terminal
                degree (PhD, MD, or DVM) and active expertise in your specific
                field of research. We combine elite scientific precision with
                personal attention and rapid turnaround to ensure your work
                stands out.
              </p>
              <p className="mx-auto mt-6 inline-block rounded-[var(--radius-btn)] bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                100% Satisfaction Guarantee, free re-edits for language issues
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
