import type { Route } from "./+types/career-development";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Career Development",
    description:
      "PhD-level editorial support for dissertations, theses, CV and biosketch formatting, monographs, and faculty development.",
    path: "/career-development/",
  });
}

export default function CareerDevelopment() {
  return (
    <>
        <PageHero title="Career Development" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>Empowering Researchers from Graduate School to Tenure</h3>
            <p>
              The path of a professional researcher requires more than just
              successful experiments; it requires a meticulously managed
              portfolio of professional documents. BioScience Writers has
              consolidated our career-focused services into a specialized hub
              designed to support scholars at every milestone. Whether you are
              finalizing a dissertation, transitioning to a faculty role, or
              publishing a career-defining monograph, we provide the expert
              PhD-level oversight necessary to advance your academic trajectory.
            </p>

            <h3>Dissertation &amp; Thesis Excellence</h3>
            <p>
              Finalizing a doctoral dissertation or master's thesis is a
              significant academic undertaking. Our specialized editors ensure
              that your final defense copy meets the highest standards of your
              institution and the global scientific community:
            </p>
            <ul>
              <li>
                <strong>Structural Cohesion:</strong> We ensure that individual
                chapters, from Introduction to Discussion, function as a
                unified, logical whole.
              </li>
              <li>
                <strong>Technical Compliance:</strong> Strict adherence to
                university-specific formatting, citation styles (APA, MLA,
                Chicago, etc.), and margin requirements.
              </li>
              <li>
                <strong>Defensible Logic:</strong> We sharpen your arguments and
                clarify complex data interpretations to ensure your work stands
                up to the scrutiny of your committee.
              </li>
            </ul>

            <h3>Professional Persona: CV &amp; Biosketch Optimization</h3>
            <p>
              In the competitive landscape of hiring and funding, your
              professional summary is your first impression. We help you
              transform a standard list of achievements into a compelling
              narrative of scientific impact:
            </p>
            <ul>
              <li>
                <strong>NIH/NSF Biosketch Formatting:</strong> Expert tailoring
                of your biosketch to meet the latest federal requirements, with
                a focus on crafting high-impact "Contributions to Science"
                sections.
              </li>
              <li>
                <strong>Academic CV Polishing:</strong> Streamlining your
                curriculum vitae for clarity and professional presentation,
                ensuring your publications, grants, and awards are highlighted
                for maximum visibility.
              </li>
              <li>
                <strong>Promotion &amp; Tenure Support:</strong> Assistance in
                refining the personal statements and research summaries required
                for career advancement within your institution.
              </li>
            </ul>

            <h3>Monographs, Book Chapters &amp; Faculty Development</h3>
            <p>
              For senior researchers and faculty, we provide the high-level
              editorial support required for long-form publications and
              departmental leadership:
            </p>
            <ul>
              <li>
                <strong>Book Chapters &amp; Monographs:</strong> Comprehensive
                editing for edited volumes and academic books, ensuring a
                consistent voice across chapters and professional indexing for
                the final publication.
              </li>
              <li>
                <strong>Faculty Development Programs:</strong> We partner with
                institutions to provide writing workshops and webinars designed
                to increase the "publishability" and funding success of their
                research staff.
              </li>
              <li>
                <strong>Monograph Project Management:</strong> From initial
                manuscript review to final technical layout, we support the
                production of authoritative scientific books.
              </li>
            </ul>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to accelerate your academic career?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us/" color="green">
                Submit Your Career Materials
              </PrimaryButton>
            </div>
          </div>
        </section>
    </>
  );
}
