import type { Route } from "./+types/security-confidentiality";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Security and Confidentiality | BioScience Writers" },
    {
      name: "description",
      content:
        "Our multi-layered security framework protects your unpublished research with 256-bit encryption, mandatory NDAs, and a zero-distribution policy.",
    },
  ];
}

export default function SecurityConfidentiality() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageHero title="Security and Confidentiality" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>Protecting the Integrity of Your Intellectual Property</h3>
            <p>
              At BioScience Writers, we recognize that your unpublished
              research, proprietary data, and grant strategies are your most
              valuable assets. We have established a multi-layered security
              framework to ensure that every document you upload remains
              confidential, secure, and protected throughout the entire
              editorial process.
            </p>

            <h3>The Triple-Lock Security Framework</h3>
            <p>
              Our security protocols are designed to meet the rigorous standards
              of leading research universities and federal funding agencies:
            </p>
            <ul>
              <li>
                <strong>Enterprise-Grade Encryption:</strong> Our platform
                utilizes 256-bit SSL encryption for all file transfers. This
                ensures that your data is protected from the moment it leaves
                your computer until it is safely stored on our secure servers.
              </li>
              <li>
                <strong>Mandatory Non-Disclosure Agreements (NDAs):</strong>{" "}
                Access to your work is strictly controlled. Every editor,
                consultant, and staff member in the BioScience Writers network
                is bound by a legally enforceable NDA before they are granted
                access to any client files.
              </li>
              <li>
                <strong>Zero-Distribution Policy:</strong> We never share, sell,
                or distribute your research to third parties. Your work is never
                used for AI model training or public databases; it remains
                exclusively within our secure internal workflow.
              </li>
            </ul>

            <h3>Specialized Compliance</h3>
            <p>
              We understand the specific regulatory requirements of medical and
              academic institutions:
            </p>
            <ul>
              <li>
                <strong>HIPAA Awareness:</strong> For medical manuscripts and
                clinical trials, our editors follow strict protocols to protect
                patient privacy and de-identified data.
              </li>
              <li>
                <strong>Institutional Requirements:</strong> Our security
                standards are designed to align with the procurement and IT
                safety requirements of major universities and research hospitals
                worldwide.
              </li>
              <li>
                <strong>Conflict of Interest Mitigation:</strong> We ensure that
                your manuscript is matched with an editor who has no direct
                conflict of interest with your specific project or laboratory.
              </li>
            </ul>

            <h3>Secure Data Handling &amp; Deletion</h3>
            <p>
              We maintain your files only as long as necessary to provide our
              services.
            </p>
            <ul>
              <li>
                <strong>Audit Trails:</strong> Every version of your document is
                tracked through a secure internal audit trail to ensure
                accountability.
              </li>
              <li>
                <strong>Request for Deletion:</strong> Upon project completion,
                clients may request the permanent deletion of their files from
                our active servers.
              </li>
              <li>
                <strong>Long-Term Privacy:</strong> Even after a project is
                closed, the confidentiality obligations of our editors remain in
                effect indefinitely.
              </li>
            </ul>

            <h3>Institutional Verification</h3>
            <p>
              If your university or department requires a signed Master Service
              Agreement (MSA) or specific security documentation to clear our
              service for use with grant funds, our compliance team is available
              to assist.
            </p>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Have questions about our security protocols?
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
