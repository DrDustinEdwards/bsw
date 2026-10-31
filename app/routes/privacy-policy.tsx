import type { Route } from "./+types/privacy-policy";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta(page("/privacy-policy"));
}

export default function PrivacyPolicy() {
  return (
    <>
        <PageHero title="Privacy Policy" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>Your Data Integrity and Professional Privacy</h3>
            <p>
              BioScience Writers is committed to protecting the personal and
              professional information of the global research community. This
              policy outlines how we collect, use, and safeguard your data to
              ensure your identity and research history remain private and
              secure.
            </p>

            <h3>1. Information Collection and Use</h3>
            <p>
              We collect only the essential data required to provide high-level
              editorial and consultative services:
            </p>
            <ul>
              <li>
                <strong>Account Information:</strong> Name, institutional
                affiliation, and contact details (email and phone) to facilitate
                project communication and billing.
              </li>
              <li>
                <strong>Project Metadata:</strong> Information regarding your
                research field and target journal to ensure accurate editor
                matching.
              </li>
              <li>
                <strong>Payment Data:</strong> Secure processing of financial
                information through encrypted gateways; we do not store full
                credit card details on our local servers.
              </li>
            </ul>

            <h3>2. Data Protection and Sharing</h3>
            <p>
              Your trust is the foundation of our business. We adhere to the
              following strict data boundaries:
            </p>
            <ul>
              <li>
                <strong>No Third-Party Sales:</strong> We never sell, lease, or
                trade your personal information or research history to marketing
                firms or third parties.
              </li>
              <li>
                <strong>Selective Disclosure:</strong> Your information is only
                shared with the specific editors and project managers assigned
                to your manuscript or grant.
              </li>
              <li>
                <strong>Legal Compliance:</strong> We disclose personal
                information only when required by law or to protect the safety
                and rights of our users and the public.
              </li>
            </ul>

            <h3>3. Global Privacy Standards (GDPR &amp; CCPA)</h3>
            <p>
              We comply with international data protection regulations to provide
              our global clients with control over their information:
            </p>
            <ul>
              <li>
                <strong>Right to Access:</strong> You may request a copy of the
                personal data we hold about you at any time.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You may request that we delete
                your account and associated personal data, subject to necessary
                financial record-keeping requirements.
              </li>
              <li>
                <strong>Data Portability:</strong> We provide tools for you to
                download and move your project history as needed.
              </li>
            </ul>

            <h3>4. Communication Preferences</h3>
            <p>
              We value your time and inbox. You have full control over how we
              contact you:
            </p>
            <ul>
              <li>
                <strong>Service Notifications:</strong> Essential emails
                regarding your order status, quotes, and file deliveries.
              </li>
              <li>
                <strong>Educational Updates:</strong> Optional newsletters
                containing grant writing tips and library resources, which you
                may opt out of at any time via the "Unsubscribe" link.
              </li>
            </ul>

            <h3>5. Policy Updates</h3>
            <p>
              As global privacy laws evolve, we may update this policy to reflect
              new protections. Any significant changes will be notified to active
              account holders via email or a prominent notice on our portal.
            </p>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Questions regarding your data privacy?
            </p>
          </div>
        </section>
    </>
  );
}
