import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Question set and answer text verbatim from the reference site.
const FAQS = [
  {
    q: "How much will editing cost?",
    a: "Visit our prices page for our hourly rate and estimate calculator. Because all work is done hourly, you can reduce costs by spell-checking your document and ensuring it's well organized before submission.",
  },
  {
    q: "What are your credentials?",
    a: "BioScience Writers was founded in 2001 and has edited thousands of manuscripts and grants. All of our editors are native English-speaking, PhD- or MD-trained scientists with active expertise in your specific field of research. Our staff members maintain active roles at various universities.",
  },
  {
    q: "How long will it take to edit my document?",
    a: "Typical turnaround time for a 3,000–5,000-word manuscript is 5–7 days. Longer documents may require more time, but can usually be completed in 7–10 days. Rush service is available upon request and can be as quick as next-day for most documents.",
  },
  {
    q: "Can you revise my grant or manuscript quickly or on short notice?",
    a: "Yes! We offer rush service as quickly as next-day for most documents. Just email or call to let us know what you need. Rush service may require an additional fee depending on turnaround time, document length, and complexity.",
  },
  {
    q: "Is your service confidential?",
    a: "Yes! All submitted documents are held in strict confidence. Everyone at BioScience Writers, editors and staff, has signed a legally binding nondisclosure and confidentiality agreement. We can provide a signed confidentiality agreement before you submit your document if requested.",
  },
  {
    q: "What exactly will you do to improve my writing?",
    a: "Depending on the editing level you select, we will correct spelling, grammar, punctuation, verb tense, and formatting. We also edit for clarity, word count, style, and impact, eliminating jargon, smoothing language, and rewriting to improve sentence clarity and organization.",
  },
  {
    q: "What if I am not happy with the work?",
    a: "Please let us know immediately! We will respond quickly to completely resolve your concerns. If we cannot completely satisfy you within 30 days of receiving your revisions, we will provide a complete refund.",
  },
  {
    q: "How will I receive my revisions?",
    a: "You can download your revisions from our secure website or receive them via email as attachments. Either way, we'll send an email notification when your revisions are complete. You'll receive two files: one showing all changes with Track Changes, and one with all changes accepted.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
            >
              <span className="font-display text-lg font-semibold text-ink">
                {item.q}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-brand transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <ChevronDown size={16} strokeWidth={2} />
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
