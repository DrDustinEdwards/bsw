import { ArrowRight } from "lucide-react";

/*
  Small shared building blocks. Avatars and logo tiles are placeholders,
  standing in for team webp headshots and institution / journal SVG logos that
  will be pulled from the WordPress export. No real names or marks are asserted.
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

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,var(--color-hex-blue),var(--color-accent-blue))",
  "linear-gradient(135deg,var(--color-hex-green),var(--color-accent-green))",
  "linear-gradient(135deg,var(--color-hex-orange),var(--color-accent-orange))",
  "linear-gradient(135deg,var(--color-band),var(--color-ink))",
  "linear-gradient(135deg,var(--color-accent-blue),var(--color-hex-green))",
];

export function Avatar({
  name,
  index,
  className = "",
}: {
  name: string;
  index: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className={`flex items-center justify-center font-display text-2xl font-semibold text-white ${className}`}
      style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// Transparent logo box, no card. The img is forced solid white via
// brightness(0) invert(1) (in .logo-box img) so colored and black marks read
// uniformly on the dark band. Sizing/spacing live in app.css.
export function LogoTile({ src, name }: { src: string; name: string }) {
  return (
    <div className="logo-box">
      <img src={src} alt={name} loading="lazy" />
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
  items: { src: string; name: string }[];
  direction?: "left" | "right";
}) {
  return (
    <div className="logo-marquee">
      <div className={`logo-track ${direction === "right" ? "reverse" : ""}`}>
        {[...items, ...items].map((logo, i) => (
          <LogoTile key={i} src={logo.src} name={logo.name} />
        ))}
      </div>
    </div>
  );
}
