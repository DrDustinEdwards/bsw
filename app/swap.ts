// Swaps one set of utility classes for another: the testimonial dots (app/islands/carousel.ts) turn a state on and
// off this way.
export function swap(el: Element, off: string, on: string, state: boolean) {
  el.classList.remove(...(state ? off : on).split(" "));
  el.classList.add(...(state ? on : off).split(" "));
}
