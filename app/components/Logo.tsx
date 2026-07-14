/*
  BioScience Writers mark: an isometric cube rendered inside a pointy-top
  hexagon, using the three brand hex colors plus white seams. Stands in for the
  original bsw-logo-web.webp until the real asset is pulled from the WP export.
*/
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 115"
      className={className}
      role="img"
      aria-label="BioScience Writers"
    >
      {/* top face */}
      <polygon points="50,0 100,28.75 50,57.5 0,28.75" fill="#8dc63f" />
      {/* left face */}
      <polygon points="0,28.75 50,57.5 50,115 0,86.25" fill="#006db7" />
      {/* right face */}
      <polygon points="100,28.75 100,86.25 50,115 50,57.5" fill="#f58220" />
      {/* seams */}
      <g stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" fill="none">
        <polygon points="50,0 100,28.75 100,86.25 50,115 0,86.25 0,28.75" />
        <path d="M50,0 L50,57.5 M0,28.75 L50,57.5 L100,28.75 M50,57.5 L50,115" />
      </g>
    </svg>
  );
}

// Real horizontal logo lockup (cube mark plus wordmark) from the WP media
// library. Falls back to nothing special; the SVG LogoMark above remains
// available if the asset is ever missing.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/brand/bsw-logo-web.webp"
      alt="BioScience Writers"
      className={`h-9 w-auto ${className}`}
    />
  );
}
