/*
  Process timeline, an island (app/site.ts starts it) on Timeline.tsx: the fill line grows from 0 to
  (container height - circle size) once the timeline scrolls into view, through the 6s height transition in
  app.css, and is recomputed on resize. Under prefers-reduced-motion it is drawn at full height with no
  animation.
*/
export default function timeline(container: HTMLElement) {
  const fill = container.querySelector<HTMLElement>(".timeline-line-fill");
  if (!fill) return;
  const circleSize = () => (window.matchMedia("(max-width: 768px)").matches ? 48 : 64);
  const grow = () => {
    fill.style.height = `${container.offsetHeight - circleSize()}px`;
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fill.style.transition = "none";
    grow();
    return;
  }
  let resizeTimer: ReturnType<typeof setTimeout>;
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    grow();
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(grow, 150);
    });
  });
  io.observe(container);
}
