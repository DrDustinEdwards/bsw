import type { Route } from "./+types/pricing";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Pricing",
    description:
      "Flat-rate, per-word scientific editing pricing with no hidden fees across Standard, Accelerated, and Critical Rush turnaround tiers.",
    path: "/pricing/",
  });
}

export default function Pricing() {
  return (
    <>
        <PageHero title="Pricing" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>1. The Core Pricing</h3>
            <p>
              BSW traditionally uses a Per-Word rate based on Turnaround Time.
            </p>
            <ul>
              <li>
                <strong>Standard Service (7-10 Days):</strong> $0.05 - $0.07 per
                word.
              </li>
              <li>
                <strong>Rush Service (2-3 Days):</strong> $0.08 - $0.10 per word.
              </li>
              <li>
                <strong>Extreme Rush (24 Hours):</strong> $0.12 - $0.15 per word.
              </li>
              <li>
                <strong>Note:</strong> There is typically a Minimum Order Fee
                (e.g., $50.00) for very small documents (abstracts).
              </li>
            </ul>

            <h3>2. The Quality Seal</h3>
            <ul>
              <li>
                <strong>100% Satisfaction Guarantee:</strong> If a journal
                rejects a paper for English quality after BSW editing, BSW
                re-edits for free.
              </li>
              <li>
                <strong>PhD/MD Only:</strong> You aren't paying for "AI" or
                "Students." You are paying for a peer-level scientist.
              </li>
            </ul>

            <h3>3. Institutional &amp; Volume Discounts</h3>
            <ul>
              <li>
                <strong>Referral Program:</strong> Discounts for PIs who refer
                their colleagues.
              </li>
              <li>
                <strong>Institutional Accounts:</strong> Pre-paid accounts for
                departments (removes the "Purchase Order" headache for individual
                researchers).
              </li>
              <li>
                <strong>Volume Discount:</strong> Lower per-word rates for
                documents over 10,000 words (theses/books).
              </li>
            </ul>

            <h2>No Compromise</h2>
            <p>Transparent, Expert-Led Pricing</p>
            <p>
              Premium scientific editing is an investment in your career. We
              provide flat-rate, per-word pricing with zero hidden fees.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3 not-prose">
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-display text-xl font-bold text-ink">
                  Standard
                </h3>
                <p className="mt-3 text-3xl font-extrabold text-brand">
                  $0.07{" "}
                  <span className="text-base font-normal text-muted">
                    / word
                  </span>
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  7-10 Business Days
                </p>
                <p className="mt-1 text-sm text-muted">PhD-Level Review</p>
                <p className="mt-4 text-sm text-muted">Best for Manuscripts</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-display text-xl font-bold text-ink">
                  Accelerated
                </h3>
                <p className="mt-3 text-3xl font-extrabold text-brand">
                  $0.10{" "}
                  <span className="text-base font-normal text-muted">
                    / word
                  </span>
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  3-5 Business Days
                </p>
                <p className="mt-1 text-sm text-muted">Priority Placement</p>
                <p className="mt-4 text-sm text-muted">Best for Resubmissions</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-display text-xl font-bold text-ink">
                  Critical Rush
                </h3>
                <p className="mt-3 text-3xl font-extrabold text-brand">
                  $0.14{" "}
                  <span className="text-base font-normal text-muted">
                    / word
                  </span>
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  24-48 Hours
                </p>
                <p className="mt-1 text-sm text-muted">Journal Formatting</p>
                <p className="mt-4 text-sm text-muted">
                  Best for Grant Deadlines
                </p>
              </div>
            </div>

            <h2>Exclusive Discount Programs</h2>
            <p>Maximize Your Budget</p>
            <ul>
              <li>
                <strong>New Client Initiative:</strong> 10% off your first
                submission to experience the BSW difference.
              </li>
              <li>
                <strong>Institutional Partners:</strong> We offer streamlined
                billing and discounted rates for University departments and
                Research Centers.
              </li>
              <li>
                <strong>The Referral Credit:</strong> Refer a colleague and both
                receive a $50 credit toward your next project.
              </li>
            </ul>
          </div>
        </section>
    </>
  );
}
