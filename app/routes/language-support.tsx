import type { Route } from "./+types/language-support";
import { pageMeta } from "../config/site";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/ui";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Language Support",
    description:
      "Scientific translation and ESL language polishing for international researchers.",
    path: "/language-support",
  });
}

export default function LanguageSupport() {
  return (
    <>
        <PageHero title="Language Support" />
        <section>
          <div className="page-prose mx-auto max-w-3xl px-5 py-16 sm:py-20">
            <h3>
              Bridging the Gap Between International Research and Global Impact
            </h3>
            <p>
              Scientific impact should not be limited by language barriers.
              BioScience Writers provides specialized linguistic support
              designed to help international researchers communicate their
              findings with the same clarity and nuance as a native English
              speaker. We have integrated our translation and ESL polishing
              services into a single hub to support global scholars at every
              stage of their career.
            </p>

            <h3>Professional Scientific Translation</h3>
            <p>
              We provide high-fidelity translation services that preserve the
              technical integrity and scientific nuance of your work. Every
              project is handled by translators who are also subject-matter
              experts in your specific field of research:
            </p>
            <ul>
              <li>
                <strong>Multi-Language Support:</strong> Accurate translation of
                manuscripts, abstracts, and technical documents into
                professional, publication-ready English.
              </li>
              <li>
                <strong>Technical Accuracy:</strong> We ensure that specialized
                terminology and discipline-specific nomenclature are correctly
                translated to meet international standards.
              </li>
              <li>
                <strong>Contextual Nuance:</strong> Beyond literal translation,
                we adapt your text to follow the rhetorical conventions of
                western scientific publishing.
              </li>
            </ul>

            <h3>ESL &amp; English Language Polishing</h3>
            <p>
              Designed for non-native English speakers who have a completed
              draft, our language polishing service focuses on the "naturalness"
              of the prose. We help you move past "correct" English to "fluent"
              scientific English:
            </p>
            <ul>
              <li>
                <strong>Natural Flow &amp; Phrasing:</strong> We correct awkward
                phrasing, idiosyncratic word choices, and non-standard syntax
                that can distract peer reviewers.
              </li>
              <li>
                <strong>Clarity &amp; Conciseness:</strong> Eliminating wordiness
                and clarifying complex sentence structures to ensure your data
                remains the focal point.
              </li>
              <li>
                <strong>Tone &amp; Register:</strong> Ensuring your manuscript
                maintains a professional, authoritative tone consistent with
                high-impact journals.
              </li>
            </ul>

            <h3>Integrated Global Scholar Support</h3>
            <p>
              Our mission is to empower international researchers to compete on a
              level playing field. By combining translation with substantive
              language polishing, we provide a comprehensive pathway to
              publication:
            </p>
            <ul>
              <li>
                <strong>Dissertation &amp; Thesis Support:</strong> Specialized
                assistance for international graduate students to ensure their
                final defense and published chapters meet institutional
                standards.
              </li>
              <li>
                <strong>Correspondence Support:</strong> Helping you craft clear,
                professional cover letters and responses to reviewer critiques.
              </li>
              <li>
                <strong>Certification of Editing:</strong> Upon request, we
                provide a certificate of English editing, which many journals
                require from international authors during the submission process.
              </li>
            </ul>

            <p className="mt-10 font-display text-xl font-bold text-ink">
              Ready to communicate your research to the world?
            </p>
            <div className="mt-5">
              <PrimaryButton href="/contact-us">
                Submit Your Project
              </PrimaryButton>
            </div>
          </div>
        </section>
    </>
  );
}
