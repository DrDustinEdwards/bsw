import type { Route } from "./+types/careers";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta(page("/careers"));
}

export default function Careers() {
  return (
    <>
        <PageHero title="Careers" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h2>Scientific Editing Jobs</h2>
            <p>
              We are seeking applications from editors and writers who can provide
              extensive grant editing and writing assistance. In particular, we
              are interested in applicants who have extensive grant experience
              with the following agencies and funding mechanisms:
            </p>
            <ul>
              <li>NIH</li>
              <li>NSF</li>
              <li>DoD</li>
              <li>AHRQ</li>
              <li>PCORI</li>
              <li>USDA</li>
              <li>SBIR</li>
            </ul>

            <h2>Required Qualifications</h2>
            <ul>
              <li>
                An advanced degree in a scientific field (e.g., MS, PhD, MD, DVM,
                PharmD)
              </li>
              <li>Ability to meet deadlines</li>
              <li>Ability to work without supervision</li>
              <li>Mastery of the English language</li>
              <li>Experience editing scientific material</li>
              <li>Completion of Taxpayer Identification Form</li>
              <li>Completion of Confidentiality Agreement</li>
              <li>
                Must reside in the United States and be a US citizen or permanent
                resident
              </li>
            </ul>

            <h2>Contract Benefits</h2>
            <ul>
              <li>Ability to work from any location</li>
              <li>Competitive rates paid on a per job basis</li>
              <li>Full control of your work schedule</li>
              <li>Tax incentives through home office deductions</li>
              <li>Continued involvement in the latest scientific developments</li>
              <li>Additional experience to include on your CV</li>
            </ul>

            <p>
              Click here to complete our applicant prescreening information. Once
              you complete this form, you will receive directions for subsequent
              application steps.
            </p>
          </div>
        </section>
    </>
  );
}
