/*
  Real horizontal logo lockup (cube mark plus wordmark) from the WP media
  library, used in the header.
*/
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/brand/bsw-logo-web.2a9980c8.webp"
      alt="BioScience Writers"
      width={250}
      height={80}
      fetchPriority="high"
      className={`h-9 w-auto ${className}`}
    />
  );
}
