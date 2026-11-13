import { Hero } from "capsomer/react/hero";
import { HexField } from "../components/HexField";
import { EditingDemo } from "../components/EditingDemo";
import { Timeline } from "../components/Timeline";
import { Faq } from "../components/Faq";
import { Testimonials } from "../components/Testimonials";
import { Marquee, MarqueePause } from "capsomer/react/marquee";
import { LogoTile, PrimaryButton, SectionHeading } from "../components/ui";
import { StatItem, ServiceCard, TeamMember } from "../components/cards";
import { Picture } from "capsomer/react/picture";
import { sitePicture } from "../lib/media/images";
import { homeLd } from "../config/structured-data";
import { jsonLd } from "@drdustinedwards/site-helpers/schema";
import { institutions, journals } from "../data/logos";
import { STATS, FLAGSHIP, SERVICE_CARDS, TEAM } from "../data/content";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { Icon, iconArrowRight } from "capsomer/react/icons";

export function meta() {
  return [...pageMeta(page("/")), ...homeLd().map(jsonLd)];
}

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        className="hero-surface home-hero"
        card
        backdrop={<HexField />}
        title="Funding Secured. Science Perfected."
        lead="Strategic Grant Review & Manuscript Editing by PhD/MD Experts."
        actions={<PrimaryButton href="/pricing">View Pricing</PrimaryButton>}
      >
        <p className="hero-body">
          Fast turnaround, 100% confidentiality, and an uncompromising quality guarantee.
        </p>
        <p className="hero-body">
          Trusted by PIs at top-tier universities and global research institutions for NIH, NSF, and
          high-impact journal submissions.
        </p>
      </Hero>

      {/*
        2. Impact stats + trust marquees. On the reference these sit in one
        continuous dark band with diagonal top/bottom edges, so they are a
        single section here. The band-cut class (app.css) draws the slants.
      */}
      <section className="band-cut">
        <span aria-hidden="true" className="band-ghost band-ghost--top" />
        <span aria-hidden="true" className="band-slab" />
        <span aria-hidden="true" className="band-ghost band-ghost--bottom" />
        <div className="band-inner">
          <div className="cap-reveal">
            <SectionHeading dark title="Our Impact, by the Numbers" />
          </div>
          <div className="cap-reveal stats-grid">
            {STATS.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>
        </div>

        <div className="cap-marquee-group logo-band">
          <div className="cap-reveal">
            <h2 className="logo-band-title">Trusted by Researchers At</h2>
            <Marquee
              label="Institutions our researchers work at"
              items={institutions.map((logo) => (
                <LogoTile key={logo.name} {...logo} />
              ))}
            />
          </div>
          <div className="cap-reveal">
            <h2 className="logo-band-title">Published In</h2>
            <Marquee
              label="Journals our clients have published in"
              direction="reverse"
              items={journals.map((logo) => (
                <LogoTile key={logo.name} {...logo} />
              ))}
            />
          </div>
          {/* The rows scroll for minutes, so they carry Capsomer's Pause (WCAG 2.2.2); a native checkbox, no script. */}
          <div className="logo-band-pause">
            <MarqueePause />
          </div>
        </div>
      </section>

      {/* 3. Services: flagship card + 2x2 grid + BSW Academy banner */}
      <section id="services" className="section-alt">
        <div className="section-inner">
          <div className="cap-reveal">
            <SectionHeading
              title="Our Services"
              subtitle="Personal Expert Scientists for High-Impact Research"
              intro="We provide the highest quality scientific editing, writing, and strategy services. Our editors are PhD and MD-credentialed professionals who understand that competing successfully for grant funding is critical to your career success."
            />
          </div>

          <div className="services-grid">
            {/* Flagship card */}
            <div className="cap-reveal services-flagship">
              <div className="flagship-card">
                <Picture
                  picture={sitePicture(FLAGSHIP.photo, "flagship", {
                    alt: "A BioScience Writers editor reviewing a grant with a researcher",
                    className: "flagship-photo",
                  })}
                />
                <div className="flagship-body">
                  <p className="band-eyebrow">Flagship Service</p>
                  <h3 className="band-card-title">{FLAGSHIP.title}</h3>
                  <p className="band-card-subhead">{FLAGSHIP.subhead}</p>
                  <p className="band-card-text">{FLAGSHIP.desc}</p>
                  <p className="band-card-note">{FLAGSHIP.note}</p>
                  <div className="band-card-actions">
                    <PrimaryButton href={FLAGSHIP.href}>{FLAGSHIP.cta}</PrimaryButton>
                  </div>
                </div>
              </div>
            </div>

            {/* 2x2 grid of secondary services + Academy banner */}
            <div className="services-more">
              <div className="services-cards">
                {SERVICE_CARDS.map((s) => (
                  <div key={s.title} className="cap-reveal">
                    <ServiceCard card={s} />
                  </div>
                ))}
              </div>

              {/* BSW Academy banner */}
              <div className="cap-reveal academy">
                <div className="academy-card">
                  <p className="band-eyebrow band-eyebrow-green">
                    eCourse &middot; Self-Paced Learning
                  </p>
                  <h3 className="band-card-title">BSW Academy</h3>
                  <p className="band-card-subhead">Elite Scientific Writing Curriculum</p>
                  <p className="band-card-text">
                    Master the mechanics of high-impact publishing and grant-winning through our
                    expert-led eCourses.{" "}
                    <a href="/knowledge-hub" className="academy-link">
                      Explore courses
                      <Icon d={iconArrowRight} />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Precision Editing Demonstrated */}
      <section className="section-plain">
        <div className="section-inner">
          <div className="cap-reveal">
            <SectionHeading
              title="Precision Editing, Demonstrated"
              subtitle="The Difference Expert Editing Makes"
              intro="Every manuscript edited by BioScience Writers receives both line-level editorial review and field-specific scientific commentary from a credentialed PhD or MD expert. Select any highlighted passage to examine the rationale behind each revision."
            />
          </div>
          <div className="cap-reveal section-body">
            <EditingDemo />
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="section-alt">
        <div className="section-inner">
          <div className="cap-reveal">
            <SectionHeading
              title="Trusted Worldwide"
              subtitle="What Our Clients Say"
              intro="From Nobel Laureates and Academy members to deans and principal investigators at top institutions worldwide, researchers trust BioScience Writers to help secure funding and publish in high-impact journals."
            />
          </div>
          <div className="cap-reveal section-body">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* 6. Streamlined four-step process (vertical timeline) */}
      <section className="section-plain">
        <div className="section-inner section-inner-narrow">
          <div className="cap-reveal">
            <SectionHeading
              title="Streamlined Process, Start to Finish"
              subtitle="Your Path from Submission to Success"
              intro={
                <>
                  Every order follows our proven four-step workflow: expert matching, comprehensive
                  editing, track changes delivery, and our satisfaction guarantee. See exactly what
                  happens from the moment you submit your document.{" "}
                  <a href="/editing-process" className="text-link">
                    See our full process &rarr;
                  </a>
                </>
              }
            />
          </div>
          <div className="section-body-lg">
            <Timeline />
          </div>
        </div>
      </section>

      {/* 7. Team */}
      <section className="section-alt">
        <div className="section-inner">
          <div className="cap-reveal">
            <SectionHeading
              title="Behind Every Edit"
              subtitle="Experienced Professionals Managing Every Detail"
              intro="Our core team personally oversees every project from first submission to final delivery. Each document is matched with a field-specific PhD or MD specialist, ensuring your work receives the scientific expertise it deserves."
            />
          </div>
          <div className="team-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="cap-reveal">
                <TeamMember member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="section-plain">
        <div className="section-inner">
          <div className="cap-reveal">
            <SectionHeading
              title="Clear Answers, No Surprises"
              subtitle="Frequently Asked Questions"
              intro="Find quick answers to the most common questions about our editing process, turnaround times, credentials, and satisfaction guarantee."
            />
          </div>
          <div className="cap-reveal section-body">
            <Faq />
          </div>
          <div className="cap-reveal faq-more">
            <p className="faq-more-title">Still have questions?</p>
            <p className="faq-more-text">Our team responds within one business day.</p>
            <PrimaryButton href="/contact-us" className="faq-more-action">
              Ask Us a Question
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* 9. BSW Commitment band */}
      <section className="section-band">
        <div className="commitment-inner">
          <div className="cap-reveal">
            <h2 className="commitment-title">The BSW Commitment</h2>
            <p className="commitment-text">
              Since 2001, we have helped the international research community maximize the accuracy
              and impact of their documents. Every editor on our team is a native English speaker
              with a terminal degree (PhD, MD, or DVM) and active expertise in your specific field
              of research. We combine elite scientific precision with personal attention and rapid
              turnaround to ensure your work stands out.
            </p>
            <p className="commitment-badge">
              100% Satisfaction Guarantee, free re-edits for language issues raised by reviewers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
