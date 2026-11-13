import { Icon, type IconName } from "capsomer/react/icons";
import { Timeline as CapTimeline } from "capsomer/react/timeline";

/*
  The process timeline: Capsomer's Timeline (capsomer/react/timeline), its look in app.css. The line
  fills once the timeline scrolls into view; the timeline island (app/islands/timeline.ts) starts
  Capsomer's behavior, since the page is not hydrated. It loads when the browser is idle, so the
  line is drawn empty before it comes into view and fills as it arrives. With no script, and under reduced motion, the
  line is drawn full. Icons are Capsomer's; each step keeps its accent color.
*/

const STEPS: {
  num: string;
  title: string;
  color: string;
  desc: string;
  icon: IconName;
}[] = [
  {
    num: "01",
    title: "Submit Your Document",
    color: "var(--color-accent-blue)",
    desc: "Upload your manuscript or grant proposal. Select your turnaround time and any special requirements.",
    icon: "upload",
  },
  {
    num: "02",
    title: "Matched with Your Expert",
    color: "var(--color-accent-green)",
    desc: "We pair you with a PhD/MD editor in your field. Receive confirmation with estimated completion date.",
    icon: "user-check",
  },
  {
    num: "03",
    title: "Receive Track Changes Edits",
    color: "var(--color-accent-orange)",
    desc: "Download two versions: one showing all changes, and one clean copy with all edits accepted.",
    icon: "document",
  },
  {
    num: "04",
    title: "100% Satisfaction Guarantee",
    color: "var(--color-accent-blue)",
    desc: "If reviewers request revisions, we re-edit at no charge. Your success is our guarantee.",
    icon: "shield-check",
  },
];

export function Timeline() {
  return (
    <div data-island="timeline" data-client="idle">
      <CapTimeline
        steps={STEPS.map((s) => ({
          mark: s.num,
          title: s.title,
          icon: (
            <span className="timeline-step-icon" style={{ color: s.color }}>
              <Icon name={s.icon} />
            </span>
          ),
          children: <p>{s.desc}</p>,
        }))}
      />
    </div>
  );
}
