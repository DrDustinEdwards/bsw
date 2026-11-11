// /media/<key>: the original or one size for `?w=` (site-runtime ./image, from the page's one defineImages in images.ts)
// of a library file (MEDIA, uploads/) or of one of the site's brand files (public/brand, through ASSETS). Nothing else is
// served: not the earlier bytes under history/, not any other public/ file.
import { assetsObject, IMMUTABLE_CACHE } from "@dustinedwards/site-runtime/image";
import { images, isSitePhotoKey, UPLOAD_PREFIX } from "./images";

const UPLOAD_KEY = /^uploads\/[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)*$/;

/**
 * A brand file's name carries a hash of its bytes, so its sizes are cached for good. A library file keeps its key
 * through a replace, a turn or a revert, so a day: the new bytes show through within one.
 */
const LIBRARY = "public, max-age=86400";

export function serveMedia(request: Request, env: Env, cache?: Cache): Promise<Response> {
  return images.serve(request, {
    // Nothing else is served: not the earlier bytes under history/, not any other public/ file.
    read: async (key) => {
      if (isSitePhotoKey(key)) return assetsObject(env.ASSETS, key);
      return key.startsWith(UPLOAD_PREFIX) && UPLOAD_KEY.test(key) ? env.MEDIA.get(key) : null;
    },
    images: env.IMAGES,
    cache,
    cacheControl: ({ key }) => (isSitePhotoKey(key) ? IMMUTABLE_CACHE : LIBRARY),
  });
}
