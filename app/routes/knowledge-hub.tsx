import { CtaBand } from "capsomer/react/cta-band";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { ProsePage } from "capsomer/react/prose-page";
import { PrimaryButton } from "../components/ui";

export function meta() {
  return pageMeta(page("/knowledge-hub"));
}

export default function KnowledgeHub() {
  return (
    <ProsePage title="Knowledge Hub">
      <h2 className="prose-sub">The Scientific Writing &amp; Grant Library</h2>
      <p>
        Access a comprehensive collection of evidence-based guides tailored to the nuances of
        academic and medical writing. Our library is categorized to support you at every stage of
        the research lifecycle:
      </p>
      <ul>
        <li>
          <strong>Manuscript Strategy:</strong> Guides on structuring high-impact abstracts,
          choosing the right target journal, and navigating the peer-review process.
        </li>
        <li>
          <strong>Grant Writing Excellence:</strong> Specialized tips for mastering NIH Specific
          Aims, NSF Broader Impacts, and crafting compelling significance statements.
        </li>
        <li>
          <strong>Grammar &amp; Style for Scientists:</strong> Technical deep-dives into scientific
          nomenclature, the active vs. passive voice debate, and avoiding common pitfalls in ESL
          writing.
        </li>
        <li>
          <strong>News &amp; Industry Updates:</strong> Stay current with the latest changes in
          journal requirements, open-access policies, and federal funding shifts.
        </li>
      </ul>

      <h2 className="prose-sub">Video Library &amp; Visual Tutorials</h2>
      <p>
        For visual learners, our Video Library offers concise, expert-led tutorials on the most
        critical aspects of scientific communication. These resources provide a "behind-the-curtain"
        look at how editors and reviewers evaluate your work:
      </p>
      <ul>
        <li>
          <strong>Webinar Archives:</strong> Full-length presentations on advanced grant strategy
          and faculty development.
        </li>
        <li>
          <strong>Quick-Tips Series:</strong> Two-minute tutorials on formatting figures, responding
          to reviewer critiques, and optimizing your academic CV.
        </li>
        <li>
          <strong>Case Studies:</strong> Visual walkthroughs of "before and after" editing examples
          to demonstrate the impact of substantive scientific review.
        </li>
      </ul>

      <h2 className="prose-sub">Frequently Asked Questions (FAQ)</h2>
      <ul>
        <li>
          <strong>Service &amp; Logistics:</strong> How do I choose between proofreading and
          substantive editing? What is the typical turnaround time for a 5,000-word manuscript?
        </li>
        <li>
          <strong>Security &amp; Confidentiality:</strong> How does BSW protect my unpublished data
          and intellectual property?
        </li>
        <li>
          <strong>Billing &amp; Institutional Support:</strong> Do you accept university purchase
          orders? How do I set up a departmental account for my lab?
        </li>
        <li>
          <strong>The BSW Guarantee:</strong> What happens if a journal asks for further language
          revisions after you have edited my paper?
        </li>
      </ul>

      <h2 className="prose-sub">Interactive Tools &amp; Research Utilities</h2>
      <p>
        To further support your daily workflow, we provide a suite of specialized utilities designed
        for the working scientist:
      </p>
      <ul>
        <li>
          <strong>Journal Finder Checklist:</strong> A strategic tool to help you evaluate potential
          publication venues based on impact and scope.
        </li>
      </ul>

      <CtaBand
        title="Ready to elevate your scientific writing?"
        actions={
          <PrimaryButton href="/contact-us" color="green">
            Ask About Our Resources
          </PrimaryButton>
        }
      />
    </ProsePage>
  );
}
