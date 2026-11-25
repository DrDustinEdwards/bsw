// /media/<key>: the original or one size (`?w=`) of a library file (MEDIA, uploads/) or a brand file (public/brand, through ASSETS). Nothing else is served, not history/ and not other public/ files.
import { assetsObject, IMMUTABLE_CACHE, versionedCache } from "@dustinedwards/site-runtime/image";
import { images, isSitePhotoKey, UPLOAD_PREFIX } from "./images";

const UPLOAD_KEY = /^uploads\/[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)*$/;

/**
 * A brand file's name carries a hash of its bytes, so its sizes are cached for good. A library file keeps its key through
 * a replace, a turn or a revert, so its address carries its version (`v=`) and is cached for good, and one without (an
 * address a person copied) for a day.
 */
const LIBRARY = versionedCache();

export function serveMedia(request: Request, env: Env, cache?: Cache): Promise<Response> {
  return images.serve(request, {
    // Nothing else is served: not the earlier bytes under history/, not any other public/ file.
    read: async (key) => {
      if (isSitePhotoKey(key)) return assetsObject(env.ASSETS, key);
      return key.startsWith(UPLOAD_PREFIX) && UPLOAD_KEY.test(key) ? env.MEDIA.get(key) : null;
    },
    images: env.IMAGES,
    cache,
    cacheControl: (file) => (isSitePhotoKey(file.key) ? IMMUTABLE_CACHE : LIBRARY(file)),
  });
}
