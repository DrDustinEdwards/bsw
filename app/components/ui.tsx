import { ArrowRight } from "lucide-react";
import type { Logo } from "../data/logos";

/*
  Small shared building blocks: the site button, section heading, and the logo
  tile / marquee used by the trust rows.
*/

/*
  The single button used everywhere. One dimensional style (gradient face,
  color-matched shadow, hover lift, trailing arrow) with three brand colors:
  blue is the default; green and orange are used where a section leans that way
  (careers / learning, and grant / deadline work). All visual detail lives in
  the .btn / .btn-{color} classes in app.css so there is one source of truth.
*/
export function PrimaryButton({
  href,
  children,
  color = "blue",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  color?: "blue" | "green" | "orange";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a href={href} className={`btn btn-${color} ${className}`}>
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          strokeWidth={2.5}
          className="btn-arrow"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

/*
  Section heading matched to the reference: a large uppercase title, an optional
  lighter-weight subtitle beneath it, and an optional intro paragraph. `intro`
  accepts a node so a section (e.g. the process) can inline a trailing link.
*/
export function SectionHeading({
  title,
  subtitle,
  intro,
  center = true,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  intro?: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}`}>
      <h2
        className={`font-display text-3xl font-extrabold uppercase leading-tight tracking-[0.01em] sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 text-2xl font-normal leading-snug sm:text-[1.9rem] ${
            dark ? "text-slate-200" : "text-band"
          }`}
        >
          {subtitle}
        </p>
      )}
      {intro && (
        <p
          className={`mx-auto mt-5 max-w-3xl text-[1.05rem] leading-relaxed ${
            dark ? "text-slate-300" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

// Transparent logo box, no card. The img is forced solid white via
// brightness(0) invert(1) (in .logo-box img) so colored and black marks read
// uniformly on the dark band. Sizing/spacing live in app.css. An SVG, so no sizes to offer; role="img" so every
// browser names it by its alt as one picture.
function LogoTile({ src, name, width, height }: Logo) {
  return (
    <div className="logo-box">
      <img src={src} alt={name} width={width} height={height} loading="lazy" decoding="async" role="img" />
    </div>
  );
}

// Both rows share one duration (240s desktop / 120s mobile, in .logo-track);
// the journal row runs in reverse. The full list is duplicated so the
// translateX(-50%) loop is seamless. Pause-on-hover and prefers-reduced-motion
// are handled in app.css.
export function Marquee({
  items,
  direction = "left",
}: {
  items: Logo[];
  direction?: "left" | "right";
}) {
  return (
    <div className="logo-marquee">
      <div className={`logo-track ${direction === "right" ? "reverse" : ""}`}>
        {[...items, ...items].map((logo, i) => (
          <LogoTile key={i} {...logo} />
        ))}
      </div>
    </div>
  );
}
