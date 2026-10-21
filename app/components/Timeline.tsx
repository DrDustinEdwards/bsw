import { useEffect, useRef } from "react";
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
  timeline scrolls into view, via a 6s height transition (styles in app.css).
  Recomputes on resize. prefers-reduced-motion shows the fill at full height
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const circleSize = () =>
      window.matchMedia("(max-width: 768px)").matches ? 48 : 64;
    const grow = () => {
      fill.style.height = container.offsetHeight - circleSize() + "px";
    };

    // Reduced motion: full height, no 6s animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transition = "none";
      grow();
      return;
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(grow, 150);
    };

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            grow();
            observer.unobserve(entry.target);
            window.addEventListener("resize", onResize);
          }
        });
      },
      { threshold: 0 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="vertical-timeline" ref={containerRef}>
      <div className="timeline-line-bg" />
      <div className="timeline-line-fill" ref={fillRef} />
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
