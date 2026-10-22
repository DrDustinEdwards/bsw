import type { Route } from "./+types/knowledge-hub";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Knowledge Hub",
    description:
      "A centralized library of articles, video tutorials, FAQs, and tools for scientific writing and grant applications.",
    path: "/knowledge-hub/",
  });
}

export default function KnowledgeHub() {
  return (
    <>
        <PageHero title="Knowledge Hub" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h2>Master the Art of Scientific Communication</h2>
            <p>
              The BioScience Writers Knowledge Hub is a centralized repository of
              expertise designed to empower researchers, clinicians, and
              students. By consolidating our extensive library of articles, news
              updates, and instructional media, we provide the tools you need to
              navigate the complexities of peer-reviewed publishing and federal
              grant applications. Explore our curated resources to sharpen your
              writing and stay informed on the evolving standards of global
              science.
            </p>

            <h3>The Scientific Writing &amp; Grant Library</h3>
            <p>
              Access a comprehensive collection of evidence-based guides tailored
              to the nuances of academic and medical writing. Our library is
              categorized to support you at every stage of the research
              lifecycle:
            </p>
            <ul>
              <li>
                <strong>Manuscript Strategy:</strong> Guides on structuring
                high-impact abstracts, choosing the right target journal, and
                navigating the peer-review process.
              </li>
              <li>
                <strong>Grant Writing Excellence:</strong> Specialized tips for
                mastering NIH Specific Aims, NSF Broader Impacts, and crafting
                compelling significance statements.
              </li>
              <li>
                <strong>Grammar &amp; Style for Scientists:</strong> Technical
                deep-dives into scientific nomenclature, the active vs. passive
                voice debate, and avoiding common pitfalls in ESL writing.
              </li>
              <li>
                <strong>News &amp; Industry Updates:</strong> Stay current with
                the latest changes in journal requirements, open-access policies,
                and federal funding shifts.
              </li>
            </ul>

            <h3>Video Library &amp; Visual Tutorials</h3>
            <p>
              For visual learners, our Video Library offers concise, expert-led
              tutorials on the most critical aspects of scientific communication.
              These resources provide a "behind-the-curtain" look at how editors
              and reviewers evaluate your work:
            </p>
            <ul>
              <li>
                <strong>Webinar Archives:</strong> Full-length presentations on
                advanced grant strategy and faculty development.
              </li>
              <li>
                <strong>Quick-Tips Series:</strong> Two-minute tutorials on
                formatting figures, responding to reviewer critiques, and
                optimizing your academic CV.
              </li>
              <li>
                <strong>Case Studies:</strong> Visual walkthroughs of "before and
                after" editing examples to demonstrate the impact of substantive
                scientific review.
              </li>
            </ul>

            <h3>Frequently Asked Questions (FAQ)</h3>
            <p>
              Find immediate answers to the most common questions regarding our
              processes, security standards, and service levels. We believe in
              complete transparency to ensure you feel confident in our
              partnership:
            </p>
            <ul>
              <li>
                <strong>Service &amp; Logistics:</strong> How do I choose between
                proofreading and substantive editing? What is the typical
                turnaround time for a 5,000-word manuscript?
              </li>
              <li>
                <strong>Security &amp; Confidentiality:</strong> How does BSW
                protect my unpublished data and intellectual property?
              </li>
              <li>
                <strong>Billing &amp; Institutional Support:</strong> Do you
                accept university purchase orders? How do I set up a departmental
                account for my lab?
              </li>
              <li>
                <strong>The BSW Guarantee:</strong> What happens if a journal asks
                for further language revisions after you have edited my paper?
              </li>
            </ul>

            <h3>Interactive Tools &amp; Research Utilities</h3>
            <p>
              To further support your daily workflow, we provide a suite of
              specialized utilities designed for the working scientist:
            </p>
            <ul>
              <li>
                <strong>Journal Finder Checklist:</strong> A strategic tool to
                help you evaluate potential publication venues based on impact and
                scope.
              </li>
            </ul>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to elevate your scientific writing?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us/" color="green">
                Ask About Our Resources
              </PrimaryButton>
            </div>
          </div>
        </section>
    </>
  );
}
