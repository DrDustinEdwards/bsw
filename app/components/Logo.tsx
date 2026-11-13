import { sitePicture } from "../lib/media/images";
import { Picture } from "capsomer/react/picture";

/*
  Real horizontal logo lockup (cube mark plus wordmark) from the WP media
  library, used in the header. Above the fold on every page, so it loads first.
*/
export function Wordmark() {
  return (
    <Picture
      picture={sitePicture(
        { src: "/brand/bsw-logo-web.2a9980c8.webp", width: 250, height: 80 },
        "wordmark",
        {
          alt: "BioScience Writers",
          priority: true,
          className: "wordmark",
        },
      )}
    />
  );
}
