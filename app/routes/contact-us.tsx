import type { Route } from "./+types/contact-us";
import { SITE, pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta(page("/contact-us"));
}

// A US phone or fax number as a tel: link.
function Tel({ number }: { number: string }) {
  return (
    <a className="underline" href={`tel:+1-${number}`}>
      {number}
    </a>
  );
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
                  Email
                </h2>
                <p className="mt-3 text-muted">
                  Editing and writing operations, online courses and writing
                  workshops:{" "}
                  <a className="underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </p>
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
                    <dd><Tel number="832-517-3001" /> or <Tel number="713-516-7228" /></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">
                      Accounts Receivables
                    </dt>
                    <dd><Tel number="832-291-1811" /></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">
                      Business Administration
                    </dt>
                    <dd><Tel number="832-291-1811" /></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Legal Policy</dt>
                    <dd><Tel number="713-516-0114" /></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Online Courses</dt>
                    <dd><Tel number="713-516-7228" /></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Writing Workshops</dt>
                    <dd><Tel number="713-516-7228" /></dd>
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
                    <dd><Tel number="256-526-7464" /></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Alternate</dt>
                    <dd><Tel number="832-649-3674" /></dd>
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
