import { useState } from "react";

const FAQS = [
  {
    q: "How much does editing cost?",
    a: "Pricing depends on document length, service level, and turnaround. Grant review and manuscript editing are quoted per project after a free assessment, so you see the full cost before any work begins. Request a quote and you will have a figure the same business day.",
  },
  {
    q: "What are your editors' credentials?",
    a: "Every editor holds a terminal degree (PhD or MD) in a life-science or biomedical field and has first-hand experience writing and reviewing grants and manuscripts. You are matched with an editor whose expertise fits your subject area.",
  },
  {
    q: "What is your typical turnaround?",
    a: "Standard turnaround is two to five business days depending on length and service. Rush service is available when a deadline is tight. Your turnaround is confirmed in writing with your quote.",
  },
  {
    q: "How do you protect confidentiality?",
    a: "Your work is treated as confidential from the moment you submit it. Files are handled under strict access controls, editors work under confidentiality agreements, and nothing is shared or reused. See Security and Confidentiality for the full policy.",
  },
  {
    q: "What if I am not satisfied?",
    a: "Every project is backed by a 100% satisfaction guarantee. If an edit does not meet the standard you were promised, we make it right at no additional cost.",
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
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <path
                    d="M8 3v10M3 8h10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
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
