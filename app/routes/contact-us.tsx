import { SITE, pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";

export function meta() {
  return pageMeta(page("/contact-us"));
}

// A US phone or fax number as a tel: link, semibold in the brand color like every link in running text (the
// accessibility statement says so).
function Tel({ number }: { number: string }) {
  return (
    <a className="text-link" href={`tel:+1-${number}`}>
      {number}
    </a>
  );
}

export default function ContactUs() {
  return (
    <>
      <PageHero title="Contact Us" />
      <section>
        <div data-context="prose" className="page-prose">
          <p>
            BioScience Writers is located in Houston, Texas in the United States of America. You can
            reach us by any of the following methods. We are happy to discuss how our premier
            scientific editing services, medical writing services, publisher copyediting services,
            English translation services, and scientific writing workshops can benefit you. Contact
            us with any questions you might have about our top quality services.
          </p>

          <div className="contact-grid">
            <div className="contact-card">
              <h2 className="contact-card-title">Email</h2>
              <p className="contact-card-text">
                Editing and writing operations, online courses and writing workshops:{" "}
                <a className="text-link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </p>
            </div>

            <div className="contact-card">
              <h2 className="contact-card-title">Telephone Numbers</h2>
              <dl className="contact-list">
                <div>
                  <dt>Editing and Writing Operations</dt>
                  <dd>
                    <Tel number="832-517-3001" /> or <Tel number="713-516-7228" />
                  </dd>
                </div>
                <div>
                  <dt>Accounts Receivables</dt>
                  <dd>
                    <Tel number="832-291-1811" />
                  </dd>
                </div>
                <div>
                  <dt>Business Administration</dt>
                  <dd>
                    <Tel number="832-291-1811" />
                  </dd>
                </div>
                <div>
                  <dt>Legal Policy</dt>
                  <dd>
                    <Tel number="713-516-0114" />
                  </dd>
                </div>
                <div>
                  <dt>Online Courses</dt>
                  <dd>
                    <Tel number="713-516-7228" />
                  </dd>
                </div>
                <div>
                  <dt>Writing Workshops</dt>
                  <dd>
                    <Tel number="713-516-7228" />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="contact-card">
              <h2 className="contact-card-title">Secure Facsimile Numbers</h2>
              <dl className="contact-list">
                <div>
                  <dt>Primary</dt>
                  <dd>
                    <Tel number="256-526-7464" />
                  </dd>
                </div>
                <div>
                  <dt>Alternate</dt>
                  <dd>
                    <Tel number="832-649-3674" />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="contact-card">
              <h2 className="contact-card-title">Business Office</h2>
              <address className="contact-address">
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
