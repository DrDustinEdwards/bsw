// Carrel's media group: site-api's mediaLibrary over the standard `media` tables (d1MediaStore) and the MEDIA bucket, served at /media/<key>.
// No `usage` (the copy is code), so a delete removes the file. Keys: uploads/<yyyy>/<mm>/<name>-<hash>.<ext>; overwritten bytes stay under history/<key>/<hash>, never served.
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
