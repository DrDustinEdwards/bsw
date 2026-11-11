// Testimonials, an island (app/site.ts starts it) on Testimonials.tsx's server-rendered scroll-snap
// track. Scrolling itself is native (touch, trackpad, keyboard); this wires the arrows and dots, keeps
// the current dot in step while the track scrolls, and says "Slide N of M" once a scroll settles.
// Previous and next loop: on an end slide, the slide at the other end is parked beside it with CSS
// `order`, never cloned or moved in the DOM. Fewer than three slides is finite: the arrows disable at
// the ends. Pattern: Modern Web Guidance "carousel".
import { DOT_OFF, DOT_ON } from "../components/carousel";
import { swap } from "../swap";

export default function carousel(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>("[data-track]")!;
  const slides = [...track.children] as HTMLElement[];
  const dots = [...root.querySelectorAll<HTMLElement>("[data-dot]")];
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const arrows = [...root.querySelectorAll<HTMLButtonElement>("[data-dir]")];
  const loops = slides.length >= 3;

  let pending: number | null = null; // the slide a click is scrolling to
  let marked = -1;
  let settled = 0;

  const middle = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
  const nearest = () => {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    slides.forEach((s, i) => {
      if (Math.abs(middle(s) - mid) < Math.abs(middle(slides[best]!) - mid)) best = i;
    });
    return best;
  };
  // Slides as they sit on screen, which differs from DOM order while one is parked.
  const visual = () => [...slides].sort((a, b) => a.offsetLeft - b.offsetLeft);

  const mark = (i: number) => {
    if (i === marked) return;
    marked = i;
    dots.forEach((dot, k) => {
      dot.setAttribute("aria-current", String(k === i));
      swap(dot.firstElementChild!, DOT_OFF, DOT_ON, k === i);
    });
  };

  const go = (i: number) => {
    pending = i;
    mark(i);
    track.scrollBy({ left: middle(slides[i]!) - (track.scrollLeft + track.clientWidth / 2) });
  };

  const step = (dir: number) => {
    const order = visual();
    const next = order[order.indexOf(slides[pending ?? nearest()]!) + dir];
    if (next) go(slides.indexOf(next));
  };

  // Park the far end slide beside slide i when i is an end, scrolling by the shift in the same task
  // so nothing moves on screen. Snapping is off for that step and the axis is locked for two frames (iOS Safari otherwise
  // paints one frame of the reordered layout).
  const park = (i: number) => {
    const before = slides[i]!.offsetLeft - track.scrollLeft;
    const last = slides.length - 1;
    slides[0]!.style.order = i === last ? "1" : "";
    slides[last]!.style.order = i === 0 ? "-1" : "";
    const shift = slides[i]!.offsetLeft - track.scrollLeft - before;
    if (shift !== 0) {
      track.style.scrollSnapType = "none";
      track.style.overflowX = "hidden";
      track.scrollBy({ left: shift, behavior: "instant" });
      track.style.scrollSnapType = "";
      requestAnimationFrame(() => requestAnimationFrame(() => (track.style.overflowX = "")));
    }
    // A parked slide is only a visual neighbor: keep it out of Tab order and the accessibility tree.
    slides.forEach((s, k) => (s.inert = k !== i && s.style.order !== ""));
  };

  const settle = (announce: boolean) => {
    const i = nearest();
    pending = null;
    mark(i);
    if (loops) park(i);
    else {
      const order = visual();
      arrows.forEach((a) => {
        const end = Number(a.dataset.dir) < 0 ? order[0] : order[order.length - 1];
        a.disabled = slides[i] === end;
      });
    }
    if (announce && i !== settled) status.textContent = `Slide ${i + 1} of ${slides.length}`;
    settled = i;
  };

  let frame = 0;
  track.addEventListener(
    "scroll",
    () => {
      if (pending !== null || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        mark(nearest());
      });
    },
    { passive: true },
  );
  if ("onscrollend" in window) track.addEventListener("scrollend", () => settle(true));
  else {
    let timer = 0;
    track.addEventListener(
      "scroll",
      () => {
        clearTimeout(timer);
        timer = window.setTimeout(() => settle(true), 120);
      },
      { passive: true },
    );
  }

  for (const arrow of arrows) {
    arrow.addEventListener("click", () => step(Number(arrow.dataset.dir)));
  }
  dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));
  settle(false);
}
