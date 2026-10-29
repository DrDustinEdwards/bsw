/*
  Hero hexagons, an island (app/site.ts starts it) on HexField.tsx's empty field. Source spec: clip-path
  hexagon, height = size * 1.15, four colors cycling (blue, green, orange, white), 24 on desktop and 12 on a
  phone, randomized once per page view: size 45-89px, top 0-90%, left 0-95%, duration 25-44s, delay -(0-29)s.
  The drift keyframes live in app.css (@keyframes hex-drift), which also halts them under
  prefers-reduced-motion. The animation pauses while the hero is offscreen.
*/
const HEX_CLIP = "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)";
// Fairly solid fills from the mark palette tokens (app.css), so the hexagons stay in sync with the logo.
const HEX_COLORS = [
  "color-mix(in srgb, var(--color-hex-blue) 78%, transparent)",
  "color-mix(in srgb, var(--color-hex-green) 78%, transparent)",
  "color-mix(in srgb, var(--color-hex-orange) 78%, transparent)",
  "rgba(255,255,255,0.85)",
];

export default function hexField(field: HTMLElement) {
  const count = window.matchMedia("(max-width: 767px)").matches ? 12 : 24;
  const hexes: HTMLElement[] = [];
  for (let i = 0; i < count; i++) {
    const size = 45 + Math.random() * (89 - 45);
    const hex = document.createElement("span");
    hex.className = "hex absolute";
    Object.assign(hex.style, {
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 95}%`,
      width: `${size}px`,
      height: `${size * 1.15}px`,
      background: HEX_COLORS[i % HEX_COLORS.length],
      clipPath: HEX_CLIP,
      animation: `hex-drift ${25 + Math.random() * (44 - 25)}s ease-in-out ${-(Math.random() * 29)}s infinite`,
    });
    hexes.push(hex);
  }
  for (const hex of hexes) field.appendChild(hex);
  new IntersectionObserver(([entry]) => {
    for (const hex of hexes) hex.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
  }).observe(field);
}
