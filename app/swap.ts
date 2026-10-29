// Swaps one set of utility classes for another: the header (app/site.ts) and the testimonial dots
// (app/islands/carousel.ts) both turn a state on and off this way.
export function swap(el: Element, off: string, on: string, state: boolean) {
  el.classList.remove(...(state ? off : on).split(" "));
  el.classList.add(...(state ? on : off).split(" "));
}
