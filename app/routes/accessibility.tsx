import type { Route } from "./+types/accessibility";
import { accessibilityStatement } from "@drdustinedwards/site-helpers/accessibility";
import { pageMeta, SITE } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta(page("/accessibility"));
}

// The statement is the network's shared text (Prelum); the name, the contact, the date and the two facts about the build
// are this site's: bsw is built with Tailwind, not Capsomer, and its links in running text are semibold in the link color.
export function loader() {
  const { html } = accessibilityStatement({
    siteName: SITE.name,
    contact: { href: "/contact-us", label: "the contact page" },
    date: "2026-11-01",
    capsomer: false,
    links: "bold",
  });
  return { html };
}

export default function Accessibility({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <PageHero title="Accessibility Statement" />
      <section>
        <div
          className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20"
          dangerouslySetInnerHTML={{ __html: loaderData.html }}
        />
      </section>
    </>
  );
}
