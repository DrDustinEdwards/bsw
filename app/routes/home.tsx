import { Ambient } from "capsomer/react/ambient";
import { Icon, iconArrowRight } from "capsomer/react/icons";
import { StaticStatTile, StatTiles } from "capsomer/react/stat-tile";
import { Faq } from "capsomer/react/faq";
import { Hero } from "capsomer/react/hero";
import { SectionBand } from "capsomer/react/section-band";
import { EditingDemo } from "../components/EditingDemo";
import { Timeline } from "../components/Timeline";
import { Testimonials } from "../components/Testimonials";
import { Marquee, MarqueePause } from "capsomer/react/marquee";
import { LogoTile, SectionHeading } from "../components/ui";
import { ServiceCard, TeamMember } from "../components/cards";
import { Picture } from "capsomer/react/picture";
import { sitePicture } from "../lib/media/images";
import { homeLd } from "../config/structured-data";
import { jsonLd } from "@drdustinedwards/site-helpers/schema";
import { institutions, journals } from "../data/logos";
import { STATS, FLAGSHIP, SERVICE_CARDS, TEAM, FAQS } from "../data/content";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";

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
        backdrop={<Ambient variant="hex-field" />}
        title="Funding Secured. Science Perfected."
        lead="Strategic Grant Review & Manuscript Editing by PhD/MD Experts."
        actions={
          <a href="/pricing" className="cap-btn">
            View Pricing
          </a>
        }
      >
        <p className="hero-body">
          Trusted by PIs at top-tier universities and global research institutions for NIH, NSF, and
          high-impact journal submissions.
        </p>
      </Hero>

      {/*
        2. Impact stats + trust marquees. On the reference these sit in one
        continuous dark band with diagonal top/bottom edges, so they are a
        single section here: Capsomer's slanted section band, pulled over the hero and the services.
      */}
      <SectionBand cut="slant" overlap>
        <div className="band-inner">
          <div className="cap-reveal">
            <SectionHeading dark title="Our Impact, by the Numbers" />
          </div>
          <div className="cap-reveal stats-grid">
            <StatTiles layout="grid" label="Our impact">
              {STATS.map((s) => (
                <StaticStatTile
                  key={s.label}
                  figureFirst
                  icon={<Icon d={s.icon} />}
                  figure={s.value}
                  label={s.label}
                />
              ))}
            </StatTiles>
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
      </SectionBand>

      {/* 3. Services: flagship card + 2x2 grid + BSW Academy banner */}
      <section id="services" className="section-alt">
        <div className="section-inner">
          <div className="cap-reveal">
            <SectionHeading title="Our Services" />
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
                  <h3 className="band-card-title">{FLAGSHIP.title}</h3>
                  <p className="band-card-text">{FLAGSHIP.desc}</p>
                  <p className="band-card-note">{FLAGSHIP.note}</p>
                  <div className="band-card-actions">
                    <a href={FLAGSHIP.href} className="cap-btn">
                      {FLAGSHIP.cta}
                    </a>
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
                  <h3 className="band-card-title">BSW Academy</h3>
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
            <SectionHeading title="Precision Editing, Demonstrated" />
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
            <SectionHeading title="Trusted Worldwide" />
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
            <SectionHeading title="Streamlined Process, Start to Finish" />
          </div>
          <div className="section-body-lg">
            <Timeline />
          </div>
          <p className="cap-reveal section-body">
            <a href="/editing-process" className="text-link">
              See our full process &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* 7. Team */}
      <section className="section-alt">
        <div className="section-inner">
          <div className="cap-reveal">
            <SectionHeading title="Behind Every Edit" />
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
            <SectionHeading title="Clear Answers, No Surprises" />
          </div>
          <div className="cap-reveal section-body faq">
            <Faq items={FAQS} openFirst />
          </div>
          <div className="cap-reveal faq-more">
            <p className="faq-more-text">Our team responds within one business day.</p>
            <a href="/contact-us" className="cap-btn faq-more-action">
              Ask Us a Question
            </a>
          </div>
        </div>
      </section>

      {/* 9. BSW Commitment band */}
      <SectionBand>
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
      </SectionBand>
    </>
  );
}
