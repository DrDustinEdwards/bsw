import type { Route } from "./+types/contact-us";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Contact Us",
    description:
      "Reach BioScience Writers by phone, fax, email, or our online document submission form. Business office located in Houston, Texas.",
    path: "/contact-us/",
  });
}

export default function ContactUs() {
  return (
    <>
        <PageHero title="Contact Us" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <p>
              BioScience Writers is located in Houston, Texas in the United States
              of America. You can reach us by any of the following methods. We are
              happy to discuss how our premier scientific editing services, medical
              writing services, publisher copyediting services, English translation
              services, and scientific writing workshops can benefit you. Contact
              us with any questions you might have about our top quality services.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 not-prose">
              <div className="rounded-lg border border-slate-200 p-6">
                <h2 className="font-display text-lg font-bold text-ink">
                  Online Request for Service
                </h2>
                <p className="mt-2 text-muted">Document Submission Form</p>
              </div>

              <div className="rounded-lg border border-slate-200 p-6">
                <h2 className="font-display text-lg font-bold text-ink">
                  Email Addresses
                </h2>
                <ul className="mt-3 space-y-2 text-muted">
                  <li>Editing and Writing Operations</li>
                  <li>Online Courses</li>
                  <li>Writing Workshops</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 p-6">
                <h2 className="font-display text-lg font-bold text-ink">
                  Telephone Numbers
                </h2>
                <dl className="mt-3 space-y-2 text-muted">
                  <div>
                    <dt className="font-semibold text-ink">
                      Editing and Writing Operations
                    </dt>
                    <dd>832-517-3001 or 713-516-7228</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">
                      Accounts Receivables
                    </dt>
                    <dd>832-291-1811</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">
                      Business Administration
                    </dt>
                    <dd>832-291-1811</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Legal Policy</dt>
                    <dd>713-516-0114</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Online Courses</dt>
                    <dd>713-516-7228</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Writing Workshops</dt>
                    <dd>713-516-7228</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border border-slate-200 p-6">
                <h2 className="font-display text-lg font-bold text-ink">
                  Secure Facsimile Numbers
                </h2>
                <dl className="mt-3 space-y-2 text-muted">
                  <div>
                    <dt className="font-semibold text-ink">Primary</dt>
                    <dd>256-526-7464</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Alternate</dt>
                    <dd>832-649-3674</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border border-slate-200 p-6">
                <h2 className="font-display text-lg font-bold text-ink">
                  Business Office
                </h2>
                <address className="mt-2 not-italic text-muted">
                  4008 Law St
                  <br />
                  Houston, TX 77005
                </address>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
