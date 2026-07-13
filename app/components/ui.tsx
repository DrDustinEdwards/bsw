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

export function LogoTile({ name }: { name: string }) {
  return (
    <div className="flex h-14 w-40 shrink-0 items-center justify-center rounded-lg border border-white/15 px-4">
      <span className="text-center font-display text-sm font-semibold tracking-tight text-white/85">
        {name}
      </span>
    </div>
  );
}

// Duplicated track so the marquee loops seamlessly (translateX(-50%)).
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden">
      <div className="marquee-track flex w-max gap-4" style={{ animation: "marquee 38s linear infinite" }}>
        {[...items, ...items].map((name, i) => (
          <LogoTile key={i} name={name} />
        ))}
      </div>
    </div>
  );
}
