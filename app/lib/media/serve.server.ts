// /media/<key>: the original or one size for `?w=` (site-runtime ./image, from the page's one defineImages in images.ts)
// of a library file (MEDIA, uploads/) or of one of the site's own photographs (public/, through ASSETS). Nothing else is
// served: not the earlier bytes under history/, not any other public/ file.
import { originalKey } from "@dustinedwards/site-runtime/image";
import { images, isSitePhotoKey, UPLOAD_PREFIX } from "./images";

const UPLOAD_KEY = /^uploads\/[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)*$/;

/**
 * A site photograph's name carries a hash of its bytes, so its sizes are cached for good. A library file keeps its key
 * through a replace, a turn or a revert, so a day: the new bytes show through within one.
 */
const IMMUTABLE = "public, max-age=31536000, immutable";
const LIBRARY = "public, max-age=86400";

/** A public/ photograph in the shape the image route reads from R2; null when there is none. */
async function assetObject(env: Env, key: string) {
  // The ASSETS binding ignores the hostname and matches only the pathname.
  const response = await env.ASSETS.fetch(new Request(`https://assets.local/${key}`));
  if (!response.ok || !response.body) return null;
  const contentType = response.headers.get("content-type") ?? "image/webp";
  return {
    body: response.body,
    httpEtag: response.headers.get("etag") ?? `"${key}"`,
    httpMetadata: { contentType },
    writeHttpMetadata: (headers: Headers) => headers.set("content-type", contentType),
  };
}

export async function serveMedia(request: Request, env: Env, cache?: Cache): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } });
  // A size URL names its format after the stored key (site-runtime 0.63: photo.webp.avif?w=112 is photo.webp).
  const key = originalKey(new URL(request.url).pathname.slice("/media/".length), request);
  const sitePhoto = isSitePhotoKey(key);
  if (!sitePhoto && !(key.startsWith(UPLOAD_PREFIX) && UPLOAD_KEY.test(key))) return new Response("Not found", { status: 404 });
  const read = () => (sitePhoto ? assetObject(env, key) : env.MEDIA.get(key));
  return images.respond(request, { object: await read(), images: env.IMAGES, cache, cacheControl: sitePhoto ? IMMUTABLE : LIBRARY, reread: read });
}
