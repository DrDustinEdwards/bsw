import type { Route } from "./+types/grant-proposal-support";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Grant and Proposal Support",
    description:
      "Strategic grant review, consulting, and writing support for NIH, NSF, DoD, and private foundation applications.",
    path: "/grant-proposal-support",
  });
}

export default function GrantProposalSupport() {
  return (
    <>
        <PageHero title="Grant and Proposal Support" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h2>Maximizing Your Competitive Edge in Research Funding</h2>
            <p>
              Securing research funding requires more than just good data; it
              requires a strategic narrative that aligns with agency priorities.
              BioScience Writers has consolidated our grant-related expertise
              into a specialized Funding Hub, providing a comprehensive support
              system for PIs navigating the complex lifecycle of NIH, NSF, DoD,
              and private foundation applications.
            </p>

            <h3>The Strategic Review Advantage</h3>
            <p>
              Our grant services go beyond proofreading to provide deep-level
              structural and strategic feedback. Every proposal is reviewed by a
              subject-matter expert with a track record of successful funding:
            </p>
            <ul>
              <li>
                <strong>Strategic Alignment:</strong> We ensure your proposal
                directly addresses the specific funding opportunity announcement
                (FOA) or request for applications (RFA).
              </li>
              <li>
                <strong>Narrative Impact:</strong> We sharpen the "innovation"
                and "significance" arguments to convince reviewers of your
                project's high priority.
              </li>
              <li>
                <strong>Technical Consistency:</strong> Cross-checking for
                alignment between your budget justification, specific aims, and
                research strategy.
              </li>
              <li>
                <strong>Agency Compliance:</strong> Ensuring all components meet
                strict formatting, page limit, and font requirements for federal
                and private portals.
              </li>
            </ul>

            <h3>Integrated Support for the Grant Lifecycle</h3>
            <ol>
              <li>
                <strong>Specific Aims &amp; Proposal Strategy.</strong> The
                Specific Aims page is the most critical document in your
                application. We provide intensive, rapid-response editing to
                ensure your aims are clear, logical, and compelling, setting the
                foundation for a high-impact proposal. Our consultants help you
                frame your research questions to meet the specific "mission" of
                your target study section.
              </li>
              <li>
                <strong>Comprehensive Grant Consulting &amp; Review.</strong>{" "}
                Whether you require full-scale grant writing support or a
                pre-submission "mock" review, we provide feedback that mimics the
                rigor of a real study section. We identify potential reviewer
                pitfalls, gaps in logic, or technical oversights before they can
                impact your score.
              </li>
              <li>
                <strong>Resubmission Strategy &amp; Critiques.</strong> A low
                score or a "not discussed" result is often a starting point for
                success. We specialize in analyzing reviewer Summary Statements
                to help you craft a strategic "Introduction to Revised
                Application." We help you address critiques directly and
                highlight improvements to your science to turn a rejection into
                an award.
              </li>
            </ol>

            <h3>Resources for Continued Success</h3>
            <p>
              Beyond project-specific support, our hub provides a library of
              grant-writing tips and technical guides focused on navigating
              federal agency nuances. We empower researchers with the tools
              needed to build a sustainable, well-funded research program through
              professional development and evidence-based writing strategies.
            </p>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to secure your next research grant?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us">
                Submit Your Proposal
              </PrimaryButton>
            </div>
          </div>
        </section>
    </>
  );
}
