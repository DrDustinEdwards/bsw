import { pageMeta, SITE } from "../config/site";
import { PrimaryButton } from "../components/ui";
import { page } from "../config/pages";
import { PriceCard, PriceGrid } from "capsomer/react/price-card";
import { ProsePage } from "capsomer/react/prose-page";

const QUOTE_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(
  "Name:\nInstitution:\nDocument type (manuscript, grant, thesis):\nWord count:\nField of research:\nDeadline or turnaround:\n",
)}`;

export function meta() {
  return pageMeta(page("/pricing"));
}

export default function Pricing() {
  return (
    <ProsePage title="Pricing">
      <p>Flat per-word rates. Minimum order for very small documents, such as abstracts: $50.00.</p>

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

      <h2 id="quote">Request a Quote</h2>
      <p>
        <PrimaryButton href={QUOTE_MAILTO}>Email Us for a Quote</PrimaryButton>
      </p>

      <h2 className="prose-sub">The Quality Seal</h2>
      <ul>
        <li>
          <strong>100% Satisfaction Guarantee:</strong> If a journal rejects a paper for English
          quality after BSW editing, BSW re-edits for free.
        </li>
        <li>
          <strong>PhD/MD Only:</strong> Your document is edited by a peer-level scientist, not by AI
          or a student.
        </li>
      </ul>

      <h2 className="prose-sub">Institutional &amp; Volume Discounts</h2>
      <ul>
        <li>
          <strong>Referral Program:</strong> Discounts for PIs who refer their colleagues.
        </li>
        <li>
          <strong>Institutional Accounts:</strong> Pre-paid accounts for departments, so individual
          researchers do not need a purchase order.
        </li>
        <li>
          <strong>Volume Discount:</strong> Lower per-word rates for documents over 10,000 words
          (theses/books).
        </li>
      </ul>

      <h2>Exclusive Discount Programs</h2>
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
