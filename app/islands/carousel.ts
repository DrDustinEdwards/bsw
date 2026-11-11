// Testimonials, an island (app/site.ts starts it) on the server-rendered Capsomer carousel
// (Testimonials.tsx): Capsomer's behavior wires its arrows, markers and status line.
import { attach, partsOf } from "capsomer/behavior/carousel";

export default function carousel(root: HTMLElement) {
  const el = root.querySelector<HTMLElement>(".cap-carousel");
  const parts = el && partsOf(el);
  if (parts) attach(parts);
}
