// Testimonials, an island (app/site.ts starts it) on Testimonials.tsx's server-rendered first slide: arrows
// and dots move the track a slide at a time, wrapping at either end.
import { DOT_OFF, DOT_ON } from "../components/carousel";
import { swap } from "../swap";

export default function carousel(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>("[data-track]")!;
  const dots = [...root.querySelectorAll<HTMLElement>("[data-dot]")];
  let page = 0;
  const go = (to: number) => {
    page = (to + dots.length) % dots.length;
    track.style.transform = `translateX(-${page * 100}%)`;
    dots.forEach((dot, i) => {
      dot.setAttribute("aria-current", String(i === page));
      swap(dot.firstElementChild!, DOT_OFF, DOT_ON, i === page);
    });
  };
  for (const arrow of root.querySelectorAll<HTMLElement>("[data-dir]")) {
    arrow.addEventListener("click", () => go(page + Number(arrow.dataset.dir)));
  }
  dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));
}
