import { pageMeta, SITE } from "../config/site";
import { page } from "../config/pages";
import { ProsePage } from "capsomer/react/prose-page";

export function meta() {
  return pageMeta(page("/cookie-policy"));
}

export default function CookiePolicy() {
  return (
    <ProsePage title="Cookie Policy">
      <h2 className="prose-sub">Cookies on This Site</h2>
      <p>
        This site sets no cookies. We use Cloudflare Web Analytics to measure aggregate visits and
        page speed; it does not use cookies or track you across other sites.
      </p>
      <p>
        Because there are no cookies to accept or decline, the site shows no consent banner. Your
        browser's own settings control any cookies other sites set.
      </p>
      <p>Questions about this policy? Email {SITE.email}.</p>
    </ProsePage>
  );
}
