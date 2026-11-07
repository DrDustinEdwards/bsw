// Carrel's media group: site-api's media library (mediaLibrary) over the `media` tables (drizzle/0000_media.sql, the
// network's standard ones, so d1MediaStore) and the MEDIA bucket, served at /media/<key> (app/lib/media/serve.server.ts).
// The page's copy is code, so no Carrel item names a library file and nothing counts uses: the site gives no `usage`,
// and a delete removes the file.
//
// Keys for new files are uploads/<yyyy>/<mm>/<name>-<hash>.<ext>. The bytes a replace, turn, revert or shrink overwrites
// are kept in MEDIA under history/<key>/<hash>, which /media never serves (serve.server.ts serves only uploads/ keys and
// the site's own photographs).
import {
  pictureLimits,
  PICTURE_RESIZE,
  d1MediaStore,
  datedKey,
  mediaLibrary,
  type MediaAdapter,
} from "@dustinedwards/site-api";
import { mediaUrl, UPLOAD_PREFIX } from "~/lib/media/images";
import { suggestFor } from "~/lib/media/suggest.server";

export function carrelMediaAdapter(env: Env): MediaAdapter {
  return mediaLibrary({
    store: d1MediaStore(env.DB),
    bucket: env.MEDIA,
    images: env.IMAGES,
    limits: pictureLimits(),
    url: mediaUrl,
    key: datedKey(UPLOAD_PREFIX),
    resize: PICTURE_RESIZE,
    history: { bucket: env.MEDIA, prefix: "history/" },
    suggest: (picture, id) => suggestFor(env, picture, id),
  });
}
