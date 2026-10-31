import type { Route } from "./+types/institutional-partnerships";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return pageMeta(page("/institutional-partnerships"));
}

export default function InstitutionalPartnerships() {
  return (
    <>
        <PageHero title="Institutional Partnerships" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>
              Centralized Research Support for Universities, Biotech, and
              Research Hospitals
            </h3>
            <p>
              BioScience Writers provides scalable, enterprise-grade scientific
              support through our Institutional Solutions hub. We partner with
              academic departments, corporate research divisions, and medical
              centers to provide a seamless bridge between administrative
              procurement and high-level scientific editing. By consolidating
              individual projects into centralized accounts, we help institutions
              increase their publication output while significantly reducing
              administrative overhead.
            </p>

            <h3>Enterprise Account Management</h3>
            <p>
              We simplify the way institutions manage scientific support. Our
              centralized account structure is designed to meet the rigorous
              audit and procurement requirements of large organizations:
            </p>
            <ul>
              <li>
                <strong>Institutional Accounts:</strong> Establishing a single
                point of contact for departmental or university-wide editing and
                grant support.
              </li>
              <li>
                <strong>Master Service Agreements (MSA):</strong> We work with
                your legal and procurement teams to establish pre-vetted
                contracts, eliminating the need for individual purchase orders
                for every project.
              </li>
              <li>
                <strong>Consolidated Billing:</strong> Flexible invoicing options
                including monthly statements, PO-based billing, or direct
                departmental transfers.
              </li>
            </ul>

            <h3>Cooperative Agreements &amp; Partnerships</h3>
            <p>
              Our partnership programs are designed to foster long-term faculty
              success. We go beyond transactional editing to become an integrated
              part of your research infrastructure:
            </p>
            <ul>
              <li>
                <strong>University &amp; Biotech Partnerships:</strong> Dedicated
                support pools that prioritize your institution's manuscripts and
                grants to meet critical submission deadlines.
              </li>
              <li>
                <strong>Custom Service Tiers:</strong> Developing bespoke service
                levels that align with your department's specific research focus
                and budget constraints.
              </li>
              <li>
                <strong>Cooperative Programs:</strong> Collaborative initiatives
                designed to support junior faculty and graduate students in
                achieving their first major publications and federal awards.
              </li>
            </ul>

            <h3>Strategic Budgeting &amp; Bulk Purchasing</h3>
            <p>
              Maximize the impact of your research budget with our bulk-purchase
              and credit systems. These tools provide predictability for PIs and
              financial controllers alike:
            </p>
            <ul>
              <li>
                <strong>Bulk Credit Purchasing:</strong> Purchase service credits
                in advance to secure discounted rates and ensure your team has
                immediate access to editing support throughout the fiscal year.
              </li>
              <li>
                <strong>Pre-payment Systems:</strong> Utilize remaining year-end
                grant or departmental funds to secure future editing support,
                ensuring research dollars are maximized before they expire.
              </li>
              <li>
                <strong>Volume Discounts:</strong> Tiered pricing structures that
                reward high-volume departments and organizations with reduced
                rates across all service tracks.
              </li>
            </ul>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to streamline research support for your institution?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us">
                Request a Consultation
              </PrimaryButton>
            </div>
          </div>
        </section>
    </>
  );
}
