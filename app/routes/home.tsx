import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HexField } from "../components/HexField";
import { EditingDemo } from "../components/EditingDemo";
import { Faq } from "../components/Faq";
import { Reveal } from "../components/Reveal";
import { Marquee, PrimaryButton, SectionHeading } from "../components/ui";
import { institutions, journals } from "../data/logos";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BioScience Writers | Grant Review and Manuscript Editing by PhD and MD Experts" },
    {
      name: "description",
      content:
        "Strategic grant review and manuscript editing by PhD and MD experts. Funding secured, science perfected. Serving researchers worldwide since 2001.",
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
  { value: "37,000+", label: "Documents edited" },
  { value: "7,000+", label: "Clients in 185 countries" },
  { value: "2,400+", label: "Institutions served" },
  { value: "5,000+", label: "Journals published in" },
];

const SUB_SERVICES = [
  {
    title: "Manuscript Writing",
    desc: "Full drafting and structural editing that gets your findings past reviewers the first time.",
  },
  {
    title: "Medical Writing",
    desc: "Regulatory documents, clinical summaries, and study reports written to standard.",
  },
  {
    title: "Journal Formatting",
    desc: "Submission-ready formatting matched to any target journal's guidelines.",
  },
  {
    title: "Scientific Translation",
    desc: "Precise translation into publication-quality scientific English.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Submit",
    desc: "Upload your draft and deadline. You receive a free assessment and a firm quote the same business day.",
  },
  {
    step: "02",
    title: "Matched",
    desc: "We pair you with a PhD or MD editor whose expertise fits your subject area and target venue.",
  },
  {
    step: "03",
    title: "Track Changes",
    desc: "Your editor returns tracked, categorized edits so you keep control and learn from every change.",
  },
  {
    step: "04",
    title: "Guarantee",
    desc: "Review the result, request revisions, and rely on a 100% satisfaction guarantee on every project.",
  },
];

const TEAM = [
  { name: "Susan Marriott", role: "President", photo: "/team/Susan-Marriott.webp" },
  { name: "Charlene Emerson", role: "Business Development", photo: "/team/Charlene-Emerson.webp" },
  { name: "Julie Edwards", role: "Publication Services", photo: "/team/Julie-Edwards.webp" },
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
          <div className="relative mx-auto flex max-w-6xl flex-col items-start px-5 py-24 sm:py-32">
            <div className="max-w-2xl rounded-[20px] border border-white/60 bg-white/50 p-8 backdrop-blur-md sm:p-11">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                PhD and MD Experts Since 2001
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
                Funding Secured.
                <br />
                Science Perfected.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Strategic grant review and manuscript editing by scientists who
                have sat on study sections and published in the journals you are
                targeting. We help you win funding and get published.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton href="/pricing/">View Pricing</PrimaryButton>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-[var(--radius-btn)] border border-slate-300 bg-white/80 px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Impact stats */}
        <section className="bg-[color:var(--color-band)]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="lg:row-span-1">
                <div className="font-display text-5xl font-semibold text-white sm:text-6xl">
                  $300M+
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  In research funding secured by our clients over the last five
                  years, with 58% returning for their next project.
                </p>
              </div>
              {STATS.map((s) => (
                <div key={s.label} className="border-l border-white/15 pl-6">
                  <div className="font-display text-4xl font-semibold text-white">
                    {s.value}
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* 3. Trusted by / Published in */}
        <section className="bg-ink">
          <div className="mx-auto max-w-6xl space-y-10 px-5 py-14">
            <Reveal>
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Trusted by researchers at
              </p>
              <Marquee items={institutions} direction="left" />
            </Reveal>
            <Reveal delay={80}>
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Published in
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
                title="Everything from first draft to funded and published"
                intro="One team of terminal-degree experts across the full research communication workflow."
              />
            </Reveal>

            {/* Flagship dark card */}
            <Reveal className="mt-12">
              <div className="grid overflow-hidden rounded-3xl bg-[color:var(--color-band)] lg:grid-cols-2">
                <div className="flex flex-col justify-center p-9 sm:p-12">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-hex-green">
                    Flagship service
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                    Grant Review and Editing
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-300">
                    A former study-section reviewer reads your proposal the way
                    the panel will, then edits for significance, approach, and
                    clarity. Strategic feedback that changes outcomes, not just
                    grammar.
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-slate-200">
                    {[
                      "Reviewer-perspective critique of aims and significance",
                      "Line editing for clarity and flow",
                      "Response-to-reviewers strategy for resubmissions",
                    ].map((li) => (
                      <li key={li} className="flex items-start gap-2.5">
                        <span className="mt-1 h-4 w-4 shrink-0 text-hex-green">
                          <svg viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 8.5 6.5 12 13 4.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {li}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <a
                      href="/grant-proposal-support/"
                      className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-white px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-slate-100"
                    >
                      Learn more
                      <span aria-hidden="true">-&gt;</span>
                    </a>
                  </div>
                </div>
                {/* Real grant-review photo with a dark overlay for the caption */}
                <div className="relative min-h-[240px] overflow-hidden">
                  <img
                    src="/services/grant-review.webp"
                    alt="A BioScience Writers editor reviewing a grant with a researcher"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a2a]/85 via-[#0b1a2a]/20 to-transparent" />
                  <div className="relative flex h-full items-end p-9">
                    <p className="font-display text-2xl font-semibold leading-snug text-white">
                      Written by scientists who have won the grants you are
                      applying for.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2x2 grid */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {SUB_SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-slate-900/5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[color:color-mix(in_srgb,var(--color-brand)_10%,white)] text-brand">
                      <span className="font-display text-lg font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                      {s.desc}
                    </p>
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
                    Learn to write like a funded scientist
                  </h3>
                  <p className="mt-1 text-[0.95rem] text-muted">
                    Workshops and self-paced courses on grant and manuscript
                    writing, taught by our editors.
                  </p>
                </div>
                <a
                  href="/knowledge-hub/"
                  className="shrink-0 rounded-[var(--radius-btn)] bg-[#577e20] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#466618]"
                >
                  Explore the Academy
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
                eyebrow="See the difference"
                title="Precision Editing Demonstrated"
                intro="Toggle the markup and click a category to see exactly what our editors change, and why, on a real grant excerpt."
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
                eyebrow="What researchers say"
                title="Outcomes our clients came back for"
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

        {/* 7. Process */}
        <section className="bg-[color:var(--color-band)]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                dark
                eyebrow="How it works"
                title="A streamlined four-step process"
                intro="From upload to guarantee, you always know where your project stands."
              />
            </Reveal>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} delay={i * 70}>
                  <div className="relative">
                    <div className="font-display text-5xl font-semibold text-white/15">
                      {p.step}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Team */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Our team"
                title="Scientists and editors behind your work"
                intro="A small, senior team you work with directly. No account managers, no hand-offs."
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
                eyebrow="Questions"
                title="Frequently asked questions"
              />
            </Reveal>
            <Reveal className="mt-12">
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* 10. BSW Commitment band */}
        <section className="bg-brand">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                The BSW Commitment
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                Founded in 2001. Terminal-degree editors. A 100% satisfaction
                guarantee on every project.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
                We exist to help researchers secure funding and publish their
                best work. If we do not meet that standard, we make it right.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/pricing/"
                  className="rounded-[var(--radius-btn)] bg-white px-6 py-3 text-sm font-bold text-brand transition-colors hover:bg-slate-100"
                >
                  Get a Quote
                </a>
                <a
                  href="/contact-us/"
                  className="rounded-[var(--radius-btn)] border border-white/40 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Talk to an editor
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
