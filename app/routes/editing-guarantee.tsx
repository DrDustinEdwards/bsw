import { CtaBand } from "capsomer/react/cta-band";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { ProsePage } from "capsomer/react/prose-page";

export function meta() {
  return pageMeta(page("/editing-guarantee"));
}

export default function EditingGuarantee() {
  return (
    <ProsePage title="Editing Guarantee">
      <h2 className="prose-sub">MD/PhD Oversight for Peer-Review Success</h2>
      <p>
        At BioScience Writers, we believe that scientific editing requires more than just linguistic
        correction, it requires subject-matter expertise. We have consolidated our quality standards
        into a single, comprehensive guarantee to give our authors absolute confidence in their
        submission.
      </p>

      <h2 className="prose-sub">The Universal Quality Standard</h2>
      <p>
        Every document processed by our network undergoes a multi-stage review to ensure it meets
        the publication-ready threshold:
      </p>
      <ul>
        <li>
          <strong>Scientific Logic:</strong> We ensure your conclusions are supported by the
          narrative of your data.
        </li>
        <li>
          <strong>Technical Precision:</strong> Correct usage of field-specific nomenclature and
          units.
        </li>
        <li>
          <strong>Grammatical Excellence:</strong> Removal of all syntax errors, idiosyncratic
          phrasing, and punctuation issues.
        </li>
        <li>
          <strong>Style Compliance:</strong> Adherence to the specific formatting (AMA, APA, CSE,
          etc.) of your target journal.
        </li>
      </ul>

      <h2 className="prose-sub">Our Re-Editing Promise</h2>
      <p>
        We stand behind the work of our editors. If a journal or publisher raises concerns regarding
        the quality of the English language in a manuscript edited by BioScience Writers, we will
        re-edit the document at no additional cost.
      </p>
      <p>Conditions of the Guarantee:</p>
      <ul>
        <li>The guarantee covers the version of the manuscript delivered to each client by BSW.</li>
        <li>
          We will work with you through the revision process until the language requirements of the
          journal are fully satisfied.
        </li>
        <li>
          To invoke the guarantee, simply provide the reviewers' comments or the journal's feedback
          to your project manager.
        </li>
      </ul>

      <h2 className="prose-sub">Certificates of Editing</h2>
      <p>
        Many high-impact journals now require international authors to provide proof that their
        manuscript has been reviewed by a professional English editing service. Upon request, we
        provide a formal Certificate of Scientific Editing. This document confirms that your paper
        has been vetted by an MD/PhD editor and meets the linguistic standards required for global
        publication.
      </p>

      <h2 className="prose-sub">Client Satisfaction &amp; Revisions</h2>
      <p>
        Our relationship does not end when we deliver your file. If you have questions about
        specific edits or feel a technical nuance was misunderstood, our editors are available for
        follow-up. We provide a clear channel for feedback to ensure the final document reflects
        your research accurately and professionally.
      </p>

      <CtaBand title="Ready to submit with confidence?" actions={null} />
    </ProsePage>
  );
}
