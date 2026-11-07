// Carrel's media group: site-api's media library (mediaLibrary) over the `media` tables (drizzle/0000_media.sql, the
// network's standard ones, so d1MediaStore) and the MEDIA bucket, served at /media/<key> (app/lib/media/serve.server.ts).
// The page's copy is code, so no Carrel item names a library file and nothing counts uses: the site gives no `usage`,
// and a delete removes the file.
//
// Keys for new files are uploads/<yyyy>/<mm>/<name>-<hash>.<ext>. The bytes a replace, turn, revert or shrink overwrites
// are kept in MEDIA under history/<key>/<hash>, which /media never serves (serve.server.ts serves only uploads/ keys and
// the site's own photographs).
import {
  d1MediaStore,
  datedKey,
  mediaLibrary,
  type MediaAdapter,
  type MediaResize,
} from "@dustinedwards/site-api";
import { mediaUrl, UPLOAD_PREFIX } from "~/lib/media/images";
import { suggestFor } from "~/lib/media/suggest.server";

/**
 * Pictures only. No SVG, which would be script on this site's own origin. HEIC and HEIF (an iPhone's photos) are taken
 * too, and stored as JPEG.
 */
const LIMITS = {
  maxBytes: 20 * 1024 * 1024,
  types: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
    "image/heic",
    "image/heif",
  ],
};

/**
 * What an upload shrinks to unless it says `resize=no`: a phone photo (4032 pixels) keeps its size, a larger camera
 * file is shrunk, and its original is kept in the file's history.
 */
const RESIZE: MediaResize = { maxEdge: 4096, quality: 85 };

export function carrelMediaAdapter(env: Env): MediaAdapter {
  return mediaLibrary({
    store: d1MediaStore(env.DB),
    bucket: env.MEDIA,
    images: env.IMAGES,
    limits: LIMITS,
    url: mediaUrl,
    key: datedKey(UPLOAD_PREFIX),
    resize: RESIZE,
    history: { bucket: env.MEDIA, prefix: "history/" },
    suggest: (picture, id) => suggestFor(env, picture, id),
    // The package checks every address and each redirect before this fetch runs.
    importFetch: ((input: RequestInfo | URL, init?: RequestInit) =>
      fetch(input, init)) as typeof fetch,
  });
}
