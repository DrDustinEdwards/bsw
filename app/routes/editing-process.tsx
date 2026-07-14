import type { Route } from "./+types/editing-process";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Process: The BSW Scientific Pipeline | BioScience Writers" },
    {
      name: "description",
      content:
        "A four-phase editing pipeline with PhD-led editing, rush turnaround, multi-stage quality control, and submission-ready delivery.",
    },
  ];
}

export default function EditingProcess() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageHero title="Our Process: The BSW Scientific Pipeline" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>
              PhD-Led Precision. Urgent Turnaround. Global Publication Success.
            </h3>
            <p>
              At BioScience Writers, our workflow is engineered to meet the
              high-pressure demands of modern research. By combining an elite
              network of MD/PhD editors with a streamlined logistical system, we
              ensure your work moves from draft to submission-ready with surgical
              precision.
            </p>

            <h3>Phase 1: The Expert Match (Editorial Experience)</h3>
            <p>
              We don't just assign an editor; we match a Subject Matter Expert.
            </p>
            <ul>
              <li>
                <strong>The "Experience" Standard:</strong> Every editor in our
                network is a native English speaker with a terminal degree (PhD,
                MD, or DVM). We draw from a talent pool with active experience in
                over 200 scientific disciplines.
              </li>
              <li>
                <strong>Specialized Expertise:</strong> Whether your research
                involves complex clinical trials, molecular biophysics, or social
                sciences, we match you with an editor who understands your
                terminology as a peer, not just a proofreader.
              </li>
              <li>
                <strong>Confidentiality:</strong> Every project is handled within
                our secure system, backed by a strict non-disclosure policy to
                protect your intellectual property.
              </li>
            </ul>

            <h3>Phase 2: Accelerated Delivery (Rush Service Options)</h3>
            <p>
              We understand that grant deadlines and journal resubmission windows
              don't wait. Our "Rush" infrastructure is a core part of our
              process.
            </p>
            <ul>
              <li>
                <strong>Standard Turnaround:</strong> Thorough, multi-stage
                editing delivered on a reliable schedule.
              </li>
              <li>
                <strong>24-Hour &amp; 48-Hour Rush:</strong> For critical
                deadlines, our "Rapid Response" team can provide full-service
                scientific editing in as little as 24 hours.
              </li>
              <li>
                <strong>Weekend &amp; Holiday Coverage:</strong> Unlike many
                academic services, BSW operates year-round. Our process includes
                weekend workflows to ensure your Monday morning deadline is met.
              </li>
            </ul>

            <h3>Phase 3: The Multi-Stage Edit</h3>
            <p>Our process follows a "Two-Pass" quality control system:</p>
            <ul>
              <li>
                <strong>Deep-Dive Scientific Edit:</strong> The primary MD/PhD
                editor corrects grammar, logic, and flow while ensuring the
                scientific narrative is robust.
              </li>
              <li>
                <strong>Verification Pass:</strong> A senior editor verifies that
                all journal-specific formatting and technical instructions (AMA,
                APA, NLM, etc.) have been met to the letter.
              </li>
            </ul>

            <h3>Phase 4: Final Delivery &amp; Author Review</h3>
            <p>
              We return a submission-ready package to your secure dashboard:
            </p>
            <ul>
              <li>
                <strong>Tracked Changes File:</strong> A transparent MS Word
                document showing every strategic improvement.
              </li>
              <li>
                <strong>The "Clean" Final:</strong> A polished, ready-to-submit
                version.
              </li>
              <li>
                <strong>Certification of Editing:</strong> Upon request, we
                provide a formal certificate to satisfy journal "English
                Language" requirements.
              </li>
            </ul>

            <h2>Technical Specifications &amp; Standards</h2>
            <ul>
              <li>
                <strong>Supported Formats:</strong> We primarily utilize
                Microsoft Word (Track Changes), but our process also accommodates
                LaTeX, PDF, and PowerPoint for scientific posters.
              </li>
              <li>
                <strong>Reference Management:</strong> We verify and format
                citations according to your target journal's specific database
                (EndNote, Mendeley, etc.).
              </li>
              <li>
                <strong>Global Compliance:</strong> Our process is optimized for
                international researchers seeking publication in top-tier Western
                journals (Nature, Science, NEJM).
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
