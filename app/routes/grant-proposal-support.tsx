import { CtaBand } from "capsomer/react/cta-band";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { ProsePage } from "capsomer/react/prose-page";

export function meta() {
  return pageMeta(page("/grant-proposal-support"));
}

export default function GrantProposalSupport() {
  return (
    <ProsePage title="Grant and Proposal Support">
      <h2 className="prose-sub">The Strategic Review Advantage</h2>
      <p>
        Our grant services go beyond proofreading to provide deep-level structural and strategic
        feedback. Every proposal is reviewed by a subject-matter expert with a track record of
        successful funding:
      </p>
      <ul>
        <li>
          <strong>Strategic Alignment:</strong> We ensure your proposal directly addresses the
          specific funding opportunity announcement (FOA) or request for applications (RFA).
        </li>
        <li>
          <strong>Narrative Impact:</strong> We sharpen the "innovation" and "significance"
          arguments to convince reviewers of your project's high priority.
        </li>
        <li>
          <strong>Technical Consistency:</strong> Cross-checking for alignment between your budget
          justification, specific aims, and research strategy.
        </li>
        <li>
          <strong>Agency Compliance:</strong> Ensuring all components meet strict formatting, page
          limit, and font requirements for federal and private portals.
        </li>
      </ul>

      <h2 className="prose-sub">Integrated Support for the Grant Lifecycle</h2>
      <ol>
        <li>
          <strong>Specific Aims &amp; Proposal Strategy.</strong> The Specific Aims page is the most
          critical document in your application. We provide intensive, rapid-response editing to
          ensure your aims are clear, logical, and compelling, setting the foundation for a
          high-impact proposal. Our consultants help you frame your research questions to meet the
          specific "mission" of your target study section.
        </li>
        <li>
          <strong>Comprehensive Grant Consulting &amp; Review.</strong> Whether you require
          full-scale grant writing support or a pre-submission "mock" review, we provide feedback
          that mimics the rigor of a real study section. We identify potential reviewer pitfalls,
          gaps in logic, or technical oversights before they can impact your score.
        </li>
        <li>
          <strong>Resubmission Strategy &amp; Critiques.</strong> A low score or a "not discussed"
          result is often a starting point for success. We specialize in analyzing reviewer Summary
          Statements to help you craft a strategic "Introduction to Revised Application." We help
          you address critiques directly and highlight improvements to your science to turn a
          rejection into an award.
        </li>
      </ol>

      <h2 className="prose-sub">Resources for Continued Success</h2>
      <p>
        Beyond project-specific support, our team can advise on grant-writing and technical guides
        focused on navigating federal agency nuances. We empower researchers with the tools needed
        to build a sustainable, well-funded research program through professional development and
        evidence-based writing strategies.
      </p>

      <CtaBand
        title="Ready to secure your next research grant?"
        actions={
          <a href="/contact-us" className="cap-btn">
            Submit Your Proposal
          </a>
        }
      />
    </ProsePage>
  );
}
