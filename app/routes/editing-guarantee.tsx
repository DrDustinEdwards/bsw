import type { Route } from "./+types/editing-guarantee";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta(page("/editing-guarantee"));
}

export default function EditingGuarantee() {
  return (
    <>
        <PageHero title="Editing Guarantee" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>MD/PhD Oversight for Peer-Review Success</h3>
            <p>
              At BioScience Writers, we believe that scientific editing requires
              more than just linguistic correction, it requires subject-matter
              expertise. We have consolidated our quality standards into a
              single, comprehensive guarantee to give our authors absolute
              confidence in their submission.
            </p>

            <h3>The Universal Quality Standard</h3>
            <p>
              Every document processed by our network undergoes a multi-stage
              review to ensure it meets the publication-ready threshold:
            </p>
            <ul>
              <li>
                <strong>Scientific Logic:</strong> We ensure your conclusions
                are supported by the narrative of your data.
              </li>
              <li>
                <strong>Technical Precision:</strong> Correct usage of
                field-specific nomenclature and units.
              </li>
              <li>
                <strong>Grammatical Excellence:</strong> Removal of all syntax
                errors, idiosyncratic phrasing, and punctuation issues.
              </li>
              <li>
                <strong>Style Compliance:</strong> Adherence to the specific
                formatting (AMA, APA, CSE, etc.) of your target journal.
              </li>
            </ul>

            <h3>Our Re-Editing Promise</h3>
            <p>
              We stand behind the work of our editors. If a journal or publisher
              raises concerns regarding the quality of the English language in a
              manuscript edited by BioScience Writers, we will re-edit the
              document at no additional cost.
            </p>
            <p>Conditions of the Guarantee:</p>
            <ul>
              <li>
                The guarantee covers the version of the manuscript delivered to
                each client by BSW.
              </li>
              <li>
                We will work with you through the revision process until the
                language requirements of the journal are fully satisfied.
              </li>
              <li>
                To invoke the guarantee, simply provide the reviewers' comments
                or the journal's feedback to your project manager.
              </li>
            </ul>

            <h3>Certificates of Editing</h3>
            <p>
              Many high-impact journals now require international authors to
              provide proof that their manuscript has been reviewed by a
              professional English editing service. Upon request, we provide a
              formal Certificate of Scientific Editing. This document confirms
              that your paper has been vetted by an MD/PhD editor and meets the
              linguistic standards required for global publication.
            </p>

            <h3>Client Satisfaction &amp; Revisions</h3>
            <p>
              Our relationship does not end when we deliver your file. If you
              have questions about specific edits or feel a technical nuance was
              misunderstood, our editors are available for follow-up. We provide
              a clear channel for feedback to ensure the final document reflects
              your research accurately and professionally.
            </p>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to submit with confidence?
            </p>
          </div>
        </section>
    </>
  );
}
