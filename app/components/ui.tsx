/*
  Small shared building blocks. Avatars and logo tiles are placeholders,
  standing in for team webp headshots and institution / journal SVG logos that
  will be pulled from the WordPress export. No real names or marks are asserted.
*/

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = true,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-[1.05rem] leading-relaxed ${
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
  "linear-gradient(135deg,#006db7,#0066a1)",
  "linear-gradient(135deg,#8dc63f,#577e20)",
  "linear-gradient(135deg,#f58220,#b75b15)",
  "linear-gradient(135deg,#3f4e5c,#1a2b3c)",
  "linear-gradient(135deg,#0066a1,#8dc63f)",
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

// Logos sit directly on the dark band with no card or border. Every mark is
// forced to solid white with brightness(0) invert(1) so colored (UCSF blue,
// nature wordmarks) and black logos alike read uniformly on the band.
export function LogoTile({ src, name }: { src: string; name: string }) {
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      className="h-10 w-auto shrink-0 object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}

// Shared duration for both rows; only the scroll direction differs. Content is
// duplicated so translateX(-50%) loops seamlessly. Hovering the row pauses it,
// and prefers-reduced-motion halts it (both handled via .marquee-track).
const MARQUEE_DURATION = "48s";

export function Marquee({
  items,
  direction = "left",
}: {
  items: { src: string; name: string }[];
  direction?: "left" | "right";
}) {
  return (
    <div className="group relative overflow-hidden">
      <div
        className="marquee-track flex w-max items-center gap-14 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${MARQUEE_DURATION} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((logo, i) => (
          <LogoTile key={i} src={logo.src} name={logo.name} />
        ))}
      </div>
    </div>
  );
}
