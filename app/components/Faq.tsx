import { Disclosure } from "capsomer/react/disclosure";
import { FAQS } from "../data/content";

// Capsomer's accordion Disclosure: one shared name makes the browser keep a single answer open, so no script runs here.
// The type and spacing are the site's own (.faq-item in app.css); the open/close animation is Capsomer's.
export function Faq() {
  return (
    <div
      data-faq
      className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      {FAQS.map((item, i) => (
        <Disclosure
          key={i}
          name="faq"
          defaultOpen={i === 0}
          variant="accordion"
          className="faq-item"
          summary={item.q}
        >
          {item.a}
        </Disclosure>
      ))}
    </div>
  );
}
