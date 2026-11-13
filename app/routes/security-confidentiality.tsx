import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";

export function meta() {
  return pageMeta(page("/security-confidentiality"));
}

export default function SecurityConfidentiality() {
  return (
    <>
      <PageHero title="Security and Confidentiality" />
      <section>
        <div data-context="prose" className="page-prose">
          <h2 className="prose-sub">Protecting the Integrity of Your Intellectual Property</h2>
          <p>
            At BioScience Writers, we recognize that your unpublished research, proprietary data,
            and grant strategies are your most valuable assets. We have established a multi-layered
            security framework to ensure that every document you upload remains confidential,
            secure, and protected throughout the entire editorial process.
          </p>

          <h2 className="prose-sub">The Triple-Lock Security Framework</h2>
          <p>
            Our security protocols are designed to meet the rigorous standards of leading research
            universities and federal funding agencies:
          </p>
          <ul>
            <li>
              <strong>Enterprise-Grade Encryption:</strong> Our platform utilizes 256-bit SSL
              encryption for all file transfers. This ensures that your data is protected from the
              moment it leaves your computer until it is safely stored on our secure servers.
            </li>
            <li>
              <strong>Mandatory Non-Disclosure Agreements (NDAs):</strong> Access to your work is
              strictly controlled. Every editor, consultant, and staff member in the BioScience
              Writers network is bound by a legally enforceable NDA before they are granted access
              to any client files.
            </li>
            <li>
              <strong>Zero-Distribution Policy:</strong> We never share, sell, or distribute your
              research to third parties. Your work is never used for AI model training or public
              databases; it remains exclusively within our secure internal workflow.
            </li>
          </ul>

          <h2 className="prose-sub">Specialized Compliance</h2>
          <p>
            We understand the specific regulatory requirements of medical and academic institutions:
          </p>
          <ul>
            <li>
              <strong>HIPAA Awareness:</strong> For medical manuscripts and clinical trials, our
              editors follow strict protocols to protect patient privacy and de-identified data.
            </li>
            <li>
              <strong>Institutional Requirements:</strong> Our security standards are designed to
              align with the procurement and IT safety requirements of major universities and
              research hospitals worldwide.
            </li>
            <li>
              <strong>Conflict of Interest Mitigation:</strong> We ensure that your manuscript is
              matched with an editor who has no direct conflict of interest with your specific
              project or laboratory.
            </li>
          </ul>

          <h2 className="prose-sub">Secure Data Handling &amp; Deletion</h2>
          <p>We maintain your files only as long as necessary to provide our services.</p>
          <ul>
            <li>
              <strong>Audit Trails:</strong> Every version of your document is tracked through a
              secure internal audit trail to ensure accountability.
            </li>
            <li>
              <strong>Request for Deletion:</strong> Upon project completion, clients may request
              the permanent deletion of their files from our active servers.
            </li>
            <li>
              <strong>Long-Term Privacy:</strong> Even after a project is closed, the
              confidentiality obligations of our editors remain in effect indefinitely.
            </li>
          </ul>

          <h2 className="prose-sub">Institutional Verification</h2>
          <p>
            If your university or department requires a signed Master Service Agreement (MSA) or
            specific security documentation to clear our service for use with grant funds, our
            compliance team is available to assist.
          </p>

          <p className="prose-cta">Have questions about our security protocols?</p>
        </div>
      </section>
    </>
  );
}
