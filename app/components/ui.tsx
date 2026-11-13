import { Icon, iconArrowRight } from "capsomer/react/icons";
import type { Logo } from "../data/logos";

/*
  Small shared building blocks: the site button, section heading, and the logo
  tile the home page's marquees show.
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
      {arrow && <Icon d={iconArrowRight} className="btn-arrow" />}
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
    <div
      className={center ? "section-heading section-heading-center" : "section-heading"}
      data-dark={dark || undefined}
    >
      <h2 className="section-heading-title">{title}</h2>
      {subtitle && <p className="section-heading-subtitle">{subtitle}</p>}
      {intro && <p className="section-heading-intro">{intro}</p>}
    </div>
  );
}

// A mark for Capsomer's Marquee (home.tsx): a transparent box, no card. The img is forced solid white via
// brightness(0) invert(1) (in .logo-box img) so colored and black marks read uniformly on the dark band.
// Sizing lives in app.css. An SVG, so no sizes to offer; role="img" so every browser names it by its alt as one picture.
export function LogoTile({ src, name, width, height }: Logo) {
  return (
    <div className="logo-box">
      <img
        src={src}
        alt={name}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        // oxlint-disable-next-line jsx-a11y/no-redundant-roles -- on purpose: an SVG img is named by its alt as one picture in every browser only with role="img".
        role="img"
      />
    </div>
  );
}
