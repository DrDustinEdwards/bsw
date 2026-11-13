import { SITE, pageMeta } from "../config/site";
import { page } from "../config/pages";
import { ContactCard, ContactGrid } from "capsomer/react/contact-card";
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

        <ContactCard
          title="Telephone Numbers"
          headingLevel="h2"
          lines={PHONE_LINES.map(([label, ...numbers]) => ({ label, numbers, join: "or" }))}
        />

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
