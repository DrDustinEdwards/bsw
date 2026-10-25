// /llms.txt (llmstxt.org): Prelum's llmsDocument, the company in plain prose for AI readers. Its claims are
// Dustin's to change (CLAUDE.md, hard rule 1).
import { llmsDocument } from "@drdustinedwards/site-helpers/llms";
import { SITE } from "../config/site";

const BODY = llmsDocument({
  title: SITE.name,
  summary: "BioScience Writers is a scientific editing and medical writing company founded in 2001, serving the international research community. All editors are native English-speaking scientists holding terminal degrees (PhD, MD, or DVM) with active expertise in the author's specific field of research.",
  sections: [
    {
      heading: "What we do",
      body: [
        "BioScience Writers provides expert scientific communication services to researchers, universities, hospitals, and biotech and pharmaceutical companies worldwide:",
        "- Grant Review and Editing: strategic PhD-level review, writing, and alignment for NIH, NSF, and Foundation submissions.\n- Manuscript Editing: line-level editorial review plus field-specific scientific commentary to prepare papers for top-tier journals.\n- Medical Writing: clinical and regulatory documentation for pharma and biotech.\n- Journal Formatting: technical layout and formatting for any target journal.\n- Scientific Translation: nuance-aware translation that preserves scientific accuracy.\n- BSW Academy: self-paced eCourses on high-impact publishing and grant writing.",
      ],
    },
    {
      heading: "How the service works",
      body: [
        "1. Submit your manuscript or grant proposal and select a turnaround time.\n2. We match you with a PhD or MD editor in your field and confirm an estimated completion date.\n3. You receive two files: one with all changes shown in Track Changes, and one clean copy with edits accepted.\n4. If reviewers later request language revisions, we re-edit at no charge.",
      ],
    },
    {
      heading: "Key facts",
      body: [
        "BioScience Writers clients secured more than $300 million in grants over five years. Other figures: 58% repeat clients, more than 7,000 clients across 185 countries, more than 37,000 documents edited, and clients at more than 2,400 institutions publishing in more than 5,000 journals.",
        "- Founded: 2001\n- Editors: native English-speaking PhD, MD, or DVM scientists\n- Confidentiality: all staff sign a legally binding nondisclosure agreement\n- Guarantee: 100% satisfaction guarantee with free re-edits for language issues raised by reviewers\n- Location: Houston, Texas, United States",
      ],
    },
    { heading: "Contact", body: [`- Website: ${SITE.url}\n- Editing and Writing Operations: 832-517-3001 or 713-516-7228`] },
  ],
});

export function loader() {
  return new Response(BODY, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
