import type { Route } from "./+types/terms-of-service";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service | BioScience Writers" },
    {
      name: "description",
      content:
        "The professional relationship, service scope, payment, refund, and intellectual property terms governing BioScience Writers editorial services.",
    },
  ];
}

export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageHero title="Terms of Service" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>Professional Standards and Engagement Framework</h3>
            <p>
              By utilizing the services provided by BioScience Writers, you agree
              to the following Terms of Service. These terms define the
              professional relationship between our editorial team and our
              clients, ensuring transparency, accountability, and scientific
              integrity.
            </p>

            <h3>1. Scope of Services</h3>
            <p>
              BioScience Writers provides expert editorial, consultative, and
              design support for scientific, medical, and academic documents.
            </p>
            <ul>
              <li>
                <strong>Editorial Role:</strong> Our editors provide
                recommendations to improve clarity, logic, and grammar. We do not
                ghostwrite or generate original research content.
              </li>
              <li>
                <strong>Final Authority:</strong> The author retains full
                responsibility for the accuracy of the data and the final
                decision to submit or publish the work.
              </li>
              <li>
                <strong>Outcome Disclaimer:</strong> While our services
                significantly increase the quality of a manuscript or grant, we
                do not guarantee acceptance by a journal or funding from a
                specific agency.
              </li>
            </ul>

            <h3>2. Project Delivery and Timelines</h3>
            <ul>
              <li>
                <strong>Commencement:</strong> Turnaround times begin once we
                receive a confirmed order, payment, or an authorized University
                Purchase Order.
              </li>
              <li>
                <strong>Delivery:</strong> Completed files are delivered via our
                secure Client Portal. We are not responsible for delays caused by
                technical issues on the client's network or failure to retrieve
                files.
              </li>
              <li>
                <strong>Expedited Services:</strong> Rush orders are subject to
                availability and additional fees as outlined in the formal quote.
              </li>
            </ul>

            <h3>3. Payment, Quotes, and Refunds</h3>
            <ul>
              <li>
                <strong>Quotes:</strong> All pricing is based on the word count
                and service level selected. Quotes are valid for 30 days.
              </li>
              <li>
                <strong>Invoicing:</strong> For institutional accounts, payment
                is due within the net terms specified in the Master Service
                Agreement (MSA) or Purchase Order.
              </li>
              <li>
                <strong>Refund Policy:</strong> Due to the personalized nature of
                scientific editing, refunds are generally not provided once work
                has commenced. However, if you are dissatisfied with the quality
                of the service, we will provide a secondary review or re-edit in
                accordance with our Editing Guarantee.
              </li>
            </ul>

            <h3>4. Intellectual Property and Copyright</h3>
            <ul>
              <li>
                <strong>Author Ownership:</strong> You retain 100% of the
                copyright and intellectual property rights to your original work
                and the final edited version.
              </li>
              <li>
                <strong>Confidentiality:</strong> We claim no rights to your data.
                All editors are bound by strict Non-Disclosure Agreements as
                outlined in our Security &amp; Confidentiality policy.
              </li>
            </ul>

            <h3>5. Ethical Conduct</h3>
            <ul>
              <li>
                <strong>Plagiarism:</strong> BioScience Writers does not provide
                services for manuscripts known to contain plagiarized material.
                Authors are responsible for ensuring the originality of their
                work.
              </li>
              <li>
                <strong>Conflict of Interest:</strong> We match projects with
                editors who have the appropriate expertise and no competing
                interests regarding your specific research.
              </li>
            </ul>

            <h3>6. Limitation of Liability</h3>
            <p>
              BioScience Writers shall not be liable for any indirect,
              incidental, or consequential damages resulting from the use of our
              services, including but not limited to journal rejections or missed
              funding deadlines.
            </p>

            <p>Questions regarding these terms? Contact our Business Office.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
