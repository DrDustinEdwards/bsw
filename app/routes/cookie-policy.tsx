import type { Route } from "./+types/cookie-policy";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Cookie Policy",
    description:
      "How BioScience Writers uses cookies and similar tracking technologies, and how you can manage your preferences.",
    path: "/cookie-policy/",
  });
}

export default function CookiePolicy() {
  return (
    <>
        <PageHero title="Cookie Policy" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>Transparency in Digital Experience and Site Functionality</h3>
            <p>
              BioScience Writers uses cookies and similar tracking technologies
              to ensure our website and secure client portal function
              efficiently. This policy explains what cookies are, how we use
              them, and how you can manage your preferences to ensure your
              browsing experience aligns with your privacy needs.
            </p>

            <h3>1. What Are Cookies?</h3>
            <p>
              Cookies are small text files stored on your device when you visit a
              website. They help the site recognize you, remember your
              preferences, and provide a secure, personalized experience.
            </p>
            <ul>
              <li>
                <strong>Session Cookies:</strong> Temporary files that expire when
                you close your browser. These are used for things like keeping you
                logged into the portal during a single session.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Files that remain on your
                device for a set period or until deleted. These help us remember
                your settings for future visits.
              </li>
            </ul>

            <h3>2. How We Use Cookies</h3>
            <p>
              We categorize our cookies into three main areas to maintain
              transparency:
            </p>
            <ul>
              <li>
                <strong>Strictly Necessary (Always Active):</strong> These are
                essential for the website to work. They enable basic functions
                like page navigation, secure login to the client portal, and the
                ability to upload files for editing.
              </li>
              <li>
                <strong>Performance &amp; Analytics:</strong> We use Cloudflare
                Web Analytics to measure aggregate visits and page speed. It
                does not use cookies or track you across other sites. This helps us identify
                which resources (like grant writing guides) are most helpful so we
                can improve our content.
              </li>
              <li>
                <strong>Functional Preferences:</strong> These cookies allow the
                site to remember choices you make, such as your preferred language
                or region, providing a more tailored experience.
              </li>
            </ul>

            <h3>3. Third-Party Cookies</h3>
            <p>
              In some cases, we use cookies provided by trusted third parties.
              This includes:
            </p>
            <ul>
              <li>
                <strong>Portal Security:</strong> Third-party security scripts
                that protect our file-uploading system from malicious activity.
              </li>
              <li>
                <strong>Payment Processing:</strong> Secure payment gateways (like
                Stripe or PayPal) use cookies to process transactions safely
                without BioScience Writers ever seeing your full credit card
                details.
              </li>
            </ul>

            <h3>4. Managing Your Preferences</h3>
            <p>
              You have full control over the cookies used during your visit. You
              can manage them in the following ways:
            </p>
            <ul>
              <li>
                <strong>Browser Settings:</strong> Most browsers allow you to
                block or delete cookies entirely. Note that disabling "Strictly
                Necessary" cookies will prevent you from using the secure Client
                Portal and ordering system.
              </li>
              <li>
                <strong>Cookie Banner:</strong> Upon your first visit, you can use
                our consent banner to "Accept All" or "Manage Settings" to opt-out
                of non-essential tracking.
              </li>
              <li>
                <strong>Global Privacy Control (GPC):</strong> Our site is
                designed to honor GPC signals, which automatically communicate
                your privacy preferences to the websites you visit.
              </li>
            </ul>

            <h3>5. Policy Updates</h3>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in technology or data protection laws. Any updates will be
              posted on this page with an updated "Last Modified" date.
            </p>

            <p>
              Have questions about our use of cookies? Contact our IT Security
              Team.
            </p>
          </div>
        </section>
    </>
  );
}
