import { CtaBand } from "capsomer/react/cta-band";
import { pageMeta } from "../config/site";
import { page } from "../config/pages";
import { ProsePage } from "capsomer/react/prose-page";

export function meta() {
  return pageMeta(page("/knowledge-hub"));
}

export default function KnowledgeHub() {
  return (
    <ProsePage title="Knowledge Hub">
      <p>
        Our <a href="/#faq">frequently asked questions</a> cover turnaround, confidentiality,
        billing and the Editing Guarantee. For anything else, ask us.
      </p>

      <CtaBand
        title="Have a question?"
        actions={
          <a href="/contact-us" data-accent="green" className="cap-btn">
            Contact Us
          </a>
        }
      />
    </ProsePage>
  );
}
