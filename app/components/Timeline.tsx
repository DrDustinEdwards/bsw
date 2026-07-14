import { useEffect, useRef } from "react";

/*
  Vertical process timeline, ported faithfully from the source HTML/CSS/JS.
  The fill line grows from 0 to (container height - circle size) once the
  timeline scrolls into view, via a 6s height transition (styles in app.css).
  Recomputes on resize. prefers-reduced-motion shows the fill at full height
  with no animation. Phosphor icon paths are the exact ones from the source.
*/

const STEPS = [
  {
    num: "01",
    title: "Submit Your Document",
    fill: "#0066A1",
    desc: "Upload your manuscript or grant proposal. Select your turnaround time and any special requirements.",
    path: "M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0ZM93.66,85.66,120,59.31V152a8,8,0,0,0,16,0V59.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,85.66Z",
  },
  {
    num: "02",
    title: "Matched with Your Expert",
    fill: "#577E20",
    desc: "We pair you with a PhD/MD editor in your field. Receive confirmation with estimated completion date.",
    path: "M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,1,0,12.24,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,1,0,12.25-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm189.66,13.66-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L208,128.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z",
  },
  {
    num: "03",
    title: "Receive Track Changes Edits",
    fill: "#B75B15",
    desc: "Download two versions: one showing all changes, and one clean copy with all edits accepted.",
    path: "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z",
  },
  {
    num: "04",
    title: "100% Satisfaction Guarantee",
    fill: "#0066A1",
    desc: "If reviewers request revisions, we re-edit at no charge. Your success is our guarantee.",
    path: "M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.91-13.53-5.19-80-31.09-80-109.91V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z",
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill={s.fill}
                viewBox="0 0 256 256"
              >
                <path d={s.path} />
              </svg>
            </div>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-description">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
