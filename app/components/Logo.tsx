import { sitePicture } from "../lib/media/images";
import { Picture } from "./Picture";

/*
  Real horizontal logo lockup (cube mark plus wordmark) from the WP media
  library, used in the header. Above the fold on every page, so it loads first.
*/
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Picture
      {...sitePicture({ src: "/brand/bsw-logo-web.2a9980c8.webp", width: 250, height: 80 }, "wordmark", {
        alt: "BioScience Writers",
        priority: true,
        className: `h-9 w-auto ${className}`.trim(),
      })}
    />
  );
}
