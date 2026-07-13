/*
  Hero signature: 24 drifting clip-path hexagons.
  Spec (bsw/design-system.md):
  - clip-path polygon(0% 25%,0% 75%,50% 100%,100% 75%,100% 25%,50% 0%)
  - height = width * 1.15
  - four colors cycling: blue #006db7, green #8dc63f, orange #f58220, white
  - per-hex durations 25s to 43s, infinite ease-in-out
  - drift keyframes live in app.css (@keyframes hex-drift)
  - prefers-reduced-motion halts the animation (handled in app.css)
*/

const HEX_CLIP =
  "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)";

const COLORS = [
  "rgba(0,109,183,0.5)", // blue
  "rgba(141,198,63,0.5)", // green
  "rgba(245,130,32,0.5)", // orange
  "rgba(255,255,255,0.6)", // white
];

// Deterministic scatter: 24 hexagons with hand-tuned positions, sizes,
// durations and negative delays so they are mid-drift on first paint.
const HEXES = [
  { top: 6, left: 4, w: 74, d: 33, delay: -4 },
  { top: 12, left: 20, w: 46, d: 28, delay: -12 },
  { top: 4, left: 38, w: 96, d: 41, delay: -7 },
  { top: 18, left: 55, w: 40, d: 26, delay: -18 },
  { top: 8, left: 70, w: 66, d: 37, delay: -2 },
  { top: 3, left: 86, w: 52, d: 30, delay: -22 },
  { top: 30, left: 10, w: 58, d: 39, delay: -15 },
  { top: 34, left: 30, w: 38, d: 25, delay: -9 },
  { top: 40, left: 47, w: 84, d: 43, delay: -20 },
  { top: 28, left: 63, w: 44, d: 27, delay: -5 },
  { top: 36, left: 78, w: 70, d: 35, delay: -13 },
  { top: 32, left: 92, w: 34, d: 29, delay: -25 },
  { top: 55, left: 6, w: 50, d: 31, delay: -8 },
  { top: 60, left: 24, w: 90, d: 42, delay: -19 },
  { top: 52, left: 42, w: 42, d: 26, delay: -3 },
  { top: 64, left: 58, w: 62, d: 38, delay: -16 },
  { top: 58, left: 74, w: 36, d: 24, delay: -11 },
  { top: 62, left: 90, w: 56, d: 34, delay: -21 },
  { top: 80, left: 12, w: 44, d: 28, delay: -6 },
  { top: 84, left: 33, w: 68, d: 40, delay: -17 },
  { top: 78, left: 50, w: 38, d: 25, delay: -10 },
  { top: 86, left: 68, w: 80, d: 43, delay: -23 },
  { top: 82, left: 84, w: 48, d: 32, delay: -14 },
  { top: 76, left: 96, w: 40, d: 27, delay: -1 },
];

export function HexField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {HEXES.map((hex, i) => (
        <span
          key={i}
          className="hex absolute"
          style={{
            top: `${hex.top}%`,
            left: `${hex.left}%`,
            width: `${hex.w}px`,
            height: `${hex.w * 1.15}px`,
            background: COLORS[i % COLORS.length],
            clipPath: HEX_CLIP,
            WebkitClipPath: HEX_CLIP,
            animation: `hex-drift ${hex.d}s ease-in-out ${hex.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
