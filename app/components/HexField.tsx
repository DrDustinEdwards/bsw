import { useEffect, useMemo, useRef, useState } from "react";

/*
  Hero signature: drifting clip-path hexagons.
  Source spec:
  - clip-path polygon(0% 25%,0% 75%,50% 100%,100% 75%,100% 25%,50% 0%)
  - height = size * 1.15
  - four colors cycling: blue, green, orange, white
  - 24 hexagons on desktop, 12 on mobile
  - randomized once on mount (useMemo), stable for the session
    size 45-89px, top 0-90%, left 0-95%, duration 25-44s, delay -(0-29)s
  - drift keyframes live in app.css (@keyframes hex-drift)
  - animation pauses when the hero is offscreen (IntersectionObserver)
  - prefers-reduced-motion halts the animation (handled in app.css)
*/

const HEX_CLIP =
  "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)";

// Fairly solid fills, matching the reference where the hexes read as crisp
// color shapes (the ones behind the glass card soften via its backdrop blur).
// The three brand hues reference the mark palette tokens (app.css) so the hero
// hexagons stay in sync with the logo; color-mix applies the fill opacity.
const COLORS = [
  "color-mix(in srgb, var(--color-hex-blue) 78%, transparent)", // blue
  "color-mix(in srgb, var(--color-hex-green) 78%, transparent)", // green
  "color-mix(in srgb, var(--color-hex-orange) 78%, transparent)", // orange
  "rgba(255,255,255,0.85)", // white
];

type Hex = {
  size: number;
  top: number;
  left: number;
  color: string;
  dur: number;
  delay: number;
};

function generate(count: number): Hex[] {
  const out: Hex[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      size: 45 + Math.random() * (89 - 45),
      top: Math.random() * 90,
      left: Math.random() * 95,
      color: COLORS[i % COLORS.length],
      dur: 25 + Math.random() * (44 - 25),
      delay: -(Math.random() * 29),
    });
  }
  return out;
}

export function HexField() {
  const ref = useRef<HTMLDivElement | null>(null);
  // count is 0 until mounted, so nothing renders during SSR (no hydration
  // mismatch from Math.random) and the field is generated once on the client.
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setCount(window.matchMedia("(max-width: 767px)").matches ? 12 : 24);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const hexes = useMemo(() => (count ? generate(count) : []), [count]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hexes.map((h, i) => (
        <span
          key={i}
          className="hex absolute"
          style={{
            top: `${h.top}%`,
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size * 1.15}px`,
            background: h.color,
            clipPath: HEX_CLIP,
            WebkitClipPath: HEX_CLIP,
            animation: `hex-drift ${h.dur}s ease-in-out ${h.delay}s infinite`,
            animationPlayState: visible ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}
