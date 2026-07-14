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
            dark ? "text-slate-200" : "text-[#3f4e5c]"
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
