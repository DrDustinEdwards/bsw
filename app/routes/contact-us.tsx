import { SITE, pageMeta } from "../config/site";
import { page } from "../config/pages";
import { Fragment } from "react";
import { ContactCard, ContactGrid, telHref } from "capsomer/react/contact-card";
import { ProsePage } from "capsomer/react/prose-page";

export function meta() {
  return pageMeta(page("/contact-us"));
}

// Each line: what it is for, then its numbers.
const PHONE_LINES = [
  ["Editing and Writing Operations", "832-517-3001", "713-516-7228"],
  ["Accounts Receivables", "832-291-1811"],
  ["Business Administration", "832-291-1811"],
  ["Legal Policy", "713-516-0114"],
  ["Online Courses", "713-516-7228"],
  ["Writing Workshops", "713-516-7228"],
];

export default function ContactUs() {
  return (
    <ProsePage title="Contact Us">
      <p>
        BioScience Writers is located in Houston, Texas in the United States of America. You can
        reach us by any of the following methods. We are happy to discuss how our premier scientific
        editing services, medical writing services, publisher copyediting services, English
        translation services, and scientific writing workshops can benefit you. Contact us with any
        questions you might have about our top quality services.
      </p>

      <ContactGrid>
        <ContactCard
          title="Email"
          headingLevel="h2"
          text={
            <>
              Editing and writing operations, online courses and writing workshops:{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </>
          }
        />

        {/* Written as Capsomer's contact lines (contact-card.md) because one line joins two numbers with "or",
            which the card's `lines` cannot say. */}
        <ContactCard title="Telephone Numbers" headingLevel="h2">
          <dl className="cap-contact-lines">
            {PHONE_LINES.map(([label, ...numbers]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {numbers.map((n, i) => (
                    <Fragment key={n}>
                      {i > 0 ? " or " : null}
                      <a href={telHref(n)}>{n}</a>
                    </Fragment>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </ContactCard>

        <ContactCard
          title="Secure Facsimile Numbers"
          headingLevel="h2"
          lines={[
            { label: "Primary", numbers: ["256-526-7464"] },
            { label: "Alternate", numbers: ["832-649-3674"] },
          ]}
        />

        <ContactCard
          title="Business Office"
          headingLevel="h2"
          address={["4008 Law St", "Houston, TX 77005"]}
        />
      </ContactGrid>
    </ProsePage>
  );
}
