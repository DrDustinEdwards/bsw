import type { Route } from "./+types/home";
import { HexField } from "../components/HexField";
import { EditingDemo } from "../components/EditingDemo";
import { Timeline } from "../components/Timeline";
import { Faq } from "../components/Faq";
import { Testimonials } from "../components/Testimonials";
import { Reveal } from "../components/Reveal";
import { Marquee, PrimaryButton, SectionHeading } from "../components/ui";
import { StatItem, ServiceCard, TeamMember } from "../components/cards";
import { homeLd } from "../config/structured-data";
import { jsonLd } from "@drdustinedwards/site-helpers/schema";
import { institutions, journals } from "../data/logos";
import { STATS, FLAGSHIP, SERVICE_CARDS, TEAM } from "../data/content";
import { pageMeta } from "../config/site";
import { ArrowRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    ...pageMeta({
      title: "BioScience Writers | Scientific and Medical Editing",
      fullTitle: true,
      description:
        "PhD & MD editors providing scientific editing, grant writing, and manuscript proofreading services. Fast turnaround for researchers worldwide.",
      path: "/",
    }),
    ...homeLd().map(jsonLd),
  ];
}

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="hero-surface relative overflow-hidden">
        <HexField />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start px-5 py-24 sm:py-32">
          <div className="hero-card max-w-2xl">
            <h1 className="hero-title">Funding Secured. Science Perfected.</h1>
            <p className="hero-subtitle mt-4">
              Strategic Grant Review &amp; Manuscript Editing by PhD/MD Experts.
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
              <StatItem key={s.label} stat={s} />
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
                  width={512}
                  height={512}
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
                    <ServiceCard card={s} />
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

      {/* 5. Testimonials */}
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
                <TeamMember member={member} />
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
              maximize the accuracy and impact of their documents. Every editor
              on our team is a native English speaker with a terminal degree
              (PhD, MD, or DVM) and active expertise in your specific field of
              research. We combine elite scientific precision with personal
              attention and rapid turnaround to ensure your work stands out.
            </p>
            <p className="mx-auto mt-6 inline-block rounded-[var(--radius-btn)] bg-white/10 px-5 py-3 text-sm font-semibold text-white">
              100% Satisfaction Guarantee, free re-edits for language issues
              raised by reviewers.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
