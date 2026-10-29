import {
  Upload,
  UserCheck,
  FileText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/*
  Vertical process timeline.
  The fill line grows from 0 to (container height - circle size) once the
  timeline scrolls into view, via a 6s height transition (styles in app.css),
  set by the timeline island (app/islands/timeline.ts). Recomputes on resize. prefers-reduced-motion shows the fill at full height
  with no animation. Icons are Lucide; each step keeps its accent color.
*/

const STEPS: {
  num: string;
  title: string;
  color: string;
  desc: string;
  Icon: LucideIcon;
}[] = [
  {
    num: "01",
    title: "Submit Your Document",
    color: "var(--color-accent-blue)",
    desc: "Upload your manuscript or grant proposal. Select your turnaround time and any special requirements.",
    Icon: Upload,
  },
  {
    num: "02",
    title: "Matched with Your Expert",
    color: "var(--color-accent-green)",
    desc: "We pair you with a PhD/MD editor in your field. Receive confirmation with estimated completion date.",
    Icon: UserCheck,
  },
  {
    num: "03",
    title: "Receive Track Changes Edits",
    color: "var(--color-accent-orange)",
    desc: "Download two versions: one showing all changes, and one clean copy with all edits accepted.",
    Icon: FileText,
  },
  {
    num: "04",
    title: "100% Satisfaction Guarantee",
    color: "var(--color-accent-blue)",
    desc: "If reviewers request revisions, we re-edit at no charge. Your success is our guarantee.",
    Icon: ShieldCheck,
  },
];

export function Timeline() {
  return (
    <div
      className="vertical-timeline"
      data-island="timeline"
      data-client="visible"
      data-client-root-margin="200px"
    >
      <div className="timeline-line-bg" />
      <div className="timeline-line-fill" />
      {STEPS.map((s) => (
        <div className="timeline-step" key={s.num}>
          <div className="timeline-circle">
            <div className="step-number">{s.num}</div>
          </div>
          <div className="timeline-content">
            <div className="step-icon">
              <s.Icon size={40} strokeWidth={2} style={{ color: s.color }} />
            </div>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-description">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
