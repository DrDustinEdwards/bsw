import type { Route } from "./+types/manuscript-editing";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Manuscript Editing | BioScience Writers" },
    {
      name: "description",
      content:
        "Expert MD/PhD editing for medical, scientific, and academic manuscripts, presentations, and posters.",
    },
  ];
}

export default function ManuscriptEditing() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageHero title="Manuscript Editing" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h2>Manuscript &amp; Publication Success</h2>
            <h3>Comprehensive Editing for the Modern Researcher</h3>
            <p>
              From initial draft to final publication, BioScience Writers
              provides the expert MD/PhD oversight required for high-impact
              results. We have consolidated our specialized editing tracks into
              a single center of excellence, ensuring that whether you are
              submitting a clinical trial, a theoretical paper, or a conference
              poster, your work meets the highest standards of the global
              scientific community.
            </p>

            <h3>The Universal Quality Standard</h3>
            <p>
              Every document processed through our hub undergoes a rigorous
              transformation. Unlike general proofreading, our scientific review
              optimizes your work for peer-reviewed success:
            </p>
            <ul>
              <li>
                <strong>Logical Continuity:</strong> We strengthen the narrative
                thread between your hypothesis, data, and conclusions.
              </li>
              <li>
                <strong>Field-Specific Precision:</strong> Your work is matched
                with an editor holding an MD or PhD in your exact discipline.
              </li>
              <li>
                <strong>Technical Integrity:</strong> Complete correction of
                scientific nomenclature, syntax, and complex grammar.
              </li>
              <li>
                <strong>Global Compliance:</strong> Adherence to AMA, APA, CSE,
                and specific journal-style instructions.
              </li>
            </ul>

            <h3>Specialized Publication Tracks</h3>
            <ol>
              <li>
                <strong>Medical &amp; Clinical Manuscripts.</strong> Tailored
                for clinical researchers, this track focuses on clinical
                relevance, patient privacy (HIPAA) awareness, and strict
                adherence to CONSORT, PRISMA, or STROBE guidelines. We ensure
                Case Reports and Systematic Reviews are ready for the exacting
                standards of the medical community.
              </li>
              <li>
                <strong>High-Impact Scientific &amp; Academic Editing.</strong>{" "}
                Our most rigorous review level, specifically designed for
                manuscripts destined for journals such as Nature, Science, and
                The Lancet. We address "big picture" issues, strengthening the
                Discussion section and ensuring the Abstract captures the full
                impact of your findings.
              </li>
              <li>
                <strong>Presentations, Posters, and Books.</strong> Science is
                often a visual or long-form medium. We edit the text for
                PowerPoint slides, Graphical Abstracts, and Book Chapters to
                ensure maximum scannability and impact, helping you remove
                rhetorical clutter so your data remains the focal point.
              </li>
            </ol>

            <h3>Finalization &amp; Submission Support</h3>
            <p>
              Don't let technicalities trigger a "desktop rejection." Our
              finalization service ensures your manuscript, references,
              citations, and figures meet the exact "Instructions for Authors"
              of your target journal. We handle the technical compliance so you
              can focus on your next breakthrough.
            </p>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to move your research toward publication?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us/">
                Submit Your Project
              </PrimaryButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
