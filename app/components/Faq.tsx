import { ChevronDown } from "lucide-react";
import { FAQS } from "../data/content";

// Native disclosure: one shared name makes the browser keep a single answer open, so no script runs here.
// The open/close animation is CSS (.faq-item in app.css).
export function Faq() {
  return (
    <div
      data-faq
      className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white"
    >
      {FAQS.map((item, i) => (
        <details key={i} name="faq" open={i === 0} className="faq-item group">
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left">
            <span className="font-display text-lg font-semibold text-ink">
              {item.q}
            </span>
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-brand transition-transform duration-300 ease-out group-open:rotate-180"
              aria-hidden="true"
            >
              <ChevronDown size={16} strokeWidth={2} />
            </span>
          </summary>
          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
