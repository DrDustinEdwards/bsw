import { pageMeta, SITE } from "../config/site";
import { page } from "../config/pages";
import { ProsePage } from "capsomer/react/prose-page";

export function meta() {
  return pageMeta(page("/privacy-policy"));
}

export default function PrivacyPolicy() {
  return (
    <ProsePage title="Privacy Policy">
      <p>
        {SITE.legalName}, of {SITE.locality}, Texas, operates this website. This page says what the
        site collects and what we do with what you send us.
      </p>

      <h2 className="prose-sub">What this website collects</h2>
      <ul>
        <li>
          <strong>Visit counts:</strong> Cloudflare Web Analytics measures aggregate visits and page
          speed. It sets no cookie and does not follow you to other sites.
        </li>
        <li>
          <strong>Server logs:</strong> Cloudflare, which hosts the site, handles each request your
          browser makes, including your IP address, to deliver the page and to protect the site from
          abuse.
        </li>
        <li>
          <strong>Nothing else:</strong> The site has no accounts, forms, payments or newsletter
          sign-up, and it stores nothing about you in your browser.
        </li>
      </ul>

      <h2 className="prose-sub">What you send us</h2>
      <p>
        If you email or call us, we use your name, contact details and anything you send, such as a
        manuscript or grant proposal, to answer you, quote a price and do the work. We share it only
        with the editors and staff assigned to your project, and with a payment or email provider
        when needed to bill you or reply. We do not sell your personal information or use it for
        targeted advertising. We disclose it when the law requires.
      </p>

      <h2 className="prose-sub">Your requests</h2>
      <p>
        To see, correct or delete what we hold about you, email {SITE.email} or call{" "}
        {SITE.telephone}. If we decline, you may ask us to reconsider by replying to our answer.
      </p>

      <h2 className="prose-sub">Changes</h2>
      <p>We post any change to this policy on this page.</p>
    </ProsePage>
  );
}
