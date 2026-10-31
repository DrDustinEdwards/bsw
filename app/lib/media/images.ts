// Pictures on the page: where a file is served and the sizes the page offers (site-runtime ./image). One
// `defineImages`, so the page never asks /media for a size the route refuses.
//
// Two kinds of file reach /media/<key>. The media library Carrel uploads to (MEDIA, keys under uploads/), and the site's
// own photographs, which stay files in public/ and are read through the ASSETS binding (sitePhotoKey): each name carries
// a hash of its bytes (bsw-logo-web.2a9980c8.webp), so a changed photograph is a new address and every size is cached
// for good.
import { defineImages, pictureProps, type ImageAttributes } from "@dustinedwards/site-runtime/image";

/** Every upload's key starts here; the earlier bytes a file's history keeps are under history/, never served. */
export const UPLOAD_PREFIX = "uploads/";

/** Where a file is served. */
export const mediaUrl = (key: string) => `/media/${key}`;

/** A photograph in public/: its path and its real size, so the page offers only sizes it has. */
export type SitePhoto = { src: string; width: number; height: number };

/** The public/ photographs /media serves, by key (the path without its leading slash): a hashed .webp in these folders. */
const SITE_PHOTO = /^(?:brand|team|services)\/[A-Za-z0-9-]+\.[0-9a-f]{8}\.webp$/;

export function isSitePhotoKey(key: string): boolean {
  return SITE_PHOTO.test(key);
}

/**
 * Each way the page shows a picture, at the CSS width it is drawn (app/components). `wordmark` is the header logo (h-9),
 * `mark` the footer's cube (h-11), `team` a team card's photo and `flagship` the grant review card's photo: 449px wide
 * in the five-of-twelve column from 1024px, the container's width below it.
 */
export const images = defineImages({
  uses: {
    wordmark: { layout: "fixed", width: 112 },
    mark: { layout: "fixed", width: 44 },
    team: { layout: "fixed", width: 200 },
    flagship: { layout: "fixed", width: 512, sizes: "(min-width: 1024px) 449px, calc(100vw - 40px)" },
  },
});

export type ImageUse = "wordmark" | "mark" | "team" | "flagship";

/** A public/ photograph's attributes, served through /media at the use's sizes in AVIF and WebP. */
export function sitePhoto(photo: SitePhoto, use: ImageUse): ImageAttributes {
  return images.attributes({ src: mediaUrl(photo.src.slice(1)), width: photo.width, height: photo.height }, use);
}

/** A public/ photograph as `<picture>` props (site-runtime pictureProps): lazy and async unless `priority`. */
export function sitePicture(photo: SitePhoto, use: ImageUse, options: { alt: string; priority?: boolean; className?: string }) {
  return pictureProps(sitePhoto(photo, use), options);
}
