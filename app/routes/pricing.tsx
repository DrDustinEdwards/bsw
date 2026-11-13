import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { PriceCard, PriceGrid } from "capsomer/react/price-card";
import { ProsePage } from "capsomer/react/prose-page";

export function meta() {
  return pageMeta(page("/pricing"));
}

export default function Pricing() {
  return (
    <ProsePage title="Pricing">
      <h2 className="prose-sub">1. The Core Pricing</h2>
      <p>BSW traditionally uses a Per-Word rate based on Turnaround Time.</p>
      <ul>
        <li>
          <strong>Standard Service (7-10 Days):</strong> $0.05 - $0.07 per word.
        </li>
        <li>
          <strong>Rush Service (2-3 Days):</strong> $0.08 - $0.10 per word.
        </li>
        <li>
          <strong>Extreme Rush (24 Hours):</strong> $0.12 - $0.15 per word.
        </li>
        <li>
          <strong>Note:</strong> There is typically a Minimum Order Fee (e.g., $50.00) for very
          small documents (abstracts).
        </li>
      </ul>

      <h2 className="prose-sub">2. The Quality Seal</h2>
      <ul>
        <li>
          <strong>100% Satisfaction Guarantee:</strong> If a journal rejects a paper for English
          quality after BSW editing, BSW re-edits for free.
        </li>
        <li>
          <strong>PhD/MD Only:</strong> You aren't paying for "AI" or "Students." You are paying for
          a peer-level scientist.
        </li>
      </ul>

      <h2 className="prose-sub">3. Institutional &amp; Volume Discounts</h2>
      <ul>
        <li>
          <strong>Referral Program:</strong> Discounts for PIs who refer their colleagues.
        </li>
        <li>
          <strong>Institutional Accounts:</strong> Pre-paid accounts for departments (removes the
          "Purchase Order" headache for individual researchers).
        </li>
        <li>
          <strong>Volume Discount:</strong> Lower per-word rates for documents over 10,000 words
          (theses/books).
        </li>
      </ul>

      <h2>No Compromise</h2>
      <p>Transparent, Expert-Led Pricing</p>
      <p>
        Premium scientific editing is an investment in your career. We provide flat-rate, per-word
        pricing with zero hidden fees.
      </p>

      <PriceGrid>
        <PriceCard
          name="Standard"
          price="$0.07"
          unit="/ word"
          label="7-10 Business Days"
          text={["PhD-Level Review", "Best for Manuscripts"]}
        />
        <PriceCard
          name="Accelerated"
          price="$0.10"
          unit="/ word"
          label="3-5 Business Days"
          text={["Priority Placement", "Best for Resubmissions"]}
        />
        <PriceCard
          name="Critical Rush"
          price="$0.14"
          unit="/ word"
          label="24-48 Hours"
          text={["Journal Formatting", "Best for Grant Deadlines"]}
        />
      </PriceGrid>

      <h2>Exclusive Discount Programs</h2>
      <p>Maximize Your Budget</p>
      <ul>
        <li>
          <strong>New Client Initiative:</strong> 10% off your first submission to experience the
          BSW difference.
        </li>
        <li>
          <strong>Institutional Partners:</strong> We offer streamlined billing and discounted rates
          for University departments and Research Centers.
        </li>
        <li>
          <strong>The Referral Credit:</strong> Refer a colleague and both receive a $50 credit
          toward your next project.
        </li>
      </ul>
    </ProsePage>
  );
}
