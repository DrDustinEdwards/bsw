import type { Route } from "./+types/visual-design";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Visual Design",
    description:
      "Publication-ready figures, tables, medical illustration, and journal formatting for scientific content.",
    path: "/visual-design/",
  });
}

export default function VisualDesign() {
  return (
    <>
        <PageHero title="Visual Design" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>
              Professional Design and Technical Precision for Scientific Content
            </h3>
            <p>
              In the competitive world of peer-reviewed publishing, how your
              data is presented is as important as the data itself. BioScience
              Writers has consolidated our design and technical services into a
              specialized Visuals Hub. We combine scientific expertise with
              professional graphic design to ensure your figures, tables, and
              layouts meet the highest standards of international publishing and
              regulatory compliance.
            </p>

            <h3>Scientific Figure &amp; Table Optimization</h3>
            <p>
              We transform raw data and rough sketches into publication-ready
              assets. Our team ensures that your visuals are not only
              aesthetically professional but also scientifically accurate and
              compliant with journal specifications:
            </p>
            <ul>
              <li>
                <strong>Data Visualization:</strong> We refine complex charts,
                graphs, and models to ensure maximum clarity and "scannability"
                for reviewers.
              </li>
              <li>
                <strong>Technical Formatting:</strong> Optimization of tables and
                figures for resolution, color space (CMYK/RGB), and file formats
                (TIFF, EPS, PDF) required by high-impact journals.
              </li>
              <li>
                <strong>Consistency &amp; Style:</strong> We apply uniform font,
                line weight, and labeling across all figures to provide a
                cohesive, professional appearance for your entire manuscript.
              </li>
            </ul>

            <h3>Medical Illustration &amp; Specialized Design</h3>
            <p>
              For concepts that cannot be captured by data alone, our medical
              illustration services provide high-fidelity visual explanations.
              We support authors, educators, and clinicians in creating custom
              visuals for a variety of media:
            </p>
            <ul>
              <li>
                <strong>Custom Medical Illustration:</strong> Professionally
                rendered anatomical, surgical, or molecular illustrations
                designed for clarity and impact.
              </li>
              <li>
                <strong>Process Diagrams:</strong> Visualizing complex biological
                pathways or experimental workflows to supplement your Methods
                and Results sections.
              </li>
              <li>
                <strong>Book &amp; Monograph Design:</strong> Comprehensive
                layout services for long-form scientific works, including
                professional book indexing and technical typesetting.
              </li>
            </ul>

            <h3>Journal Formatting &amp; Technical Layouts</h3>
            <p>
              Technical errors in formatting are a leading cause of
              administrative rejection. Our layout specialists handle the
              meticulous details of journal compliance, allowing you to focus on
              the science:
            </p>
            <ul>
              <li>
                <strong>Author Instruction Compliance:</strong> We ensure every
                aspect of your manuscript, from margins and citations to
                reference lists and appendices, adheres to your target journal's
                specific "Instructions for Authors."
              </li>
              <li>
                <strong>Technical Layouts:</strong> Expert formatting for
                clinical trial reports, regulatory documents, and book chapters,
                ensuring that complex hierarchies of information remain organized
                and accessible.
              </li>
              <li>
                <strong>Book Indexing:</strong> Specialized indexing services for
                scientific and medical monographs to ensure your published work
                is searchable and user-friendly.
              </li>
            </ul>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to professionalize your research visuals?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us/">
                Submit Your Project
              </PrimaryButton>
            </div>
          </div>
        </section>
    </>
  );
}
