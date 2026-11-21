import type { Logo } from "../data/logos";

/*
  Small shared building blocks: the section heading and the logo
  tile the home page's marquees show.
*/

// Section heading: a large uppercase title.
export function SectionHeading({
  title,
  center = true,
  dark = false,
}: {
  title: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={center ? "section-heading section-heading-center" : "section-heading"}
      data-dark={dark || undefined}
    >
      <h2 className="section-heading-title">{title}</h2>
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
