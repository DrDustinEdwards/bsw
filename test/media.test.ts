// /media through the site's real route (app/lib/media/serve.server.ts): what it serves and what it never does. A library
// upload comes from MEDIA and a site photograph from ASSETS; the earlier bytes under history/ and every other public/
// file are 404, and a size outside the closed set is 400, never a billed transform.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";

// The app's extensionless imports, as Vite resolves them.
const app = new URL("../app/", import.meta.url).href;
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith(".") && context.parentURL?.startsWith(app) && !/\.[cm]?[jt]sx?$/.test(specifier)) {
      const target = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(target)) return next(target.href, context);
    }
    return next(specifier, context);
  },
});
const { serveMedia } = await import(new URL("lib/media/serve.server.ts", app).href);

const PHOTO = "team/Lisa-Giles.630f0b9c.webp";
const UPLOAD = "uploads/2026/10/portrait-0a1b2c3d.jpg";

const object = (contentType: string) => ({
  body: new Response("bytes").body!,
  httpEtag: '"e1"',
  httpMetadata: { contentType },
  writeHttpMetadata: (headers: Headers) => headers.set("content-type", contentType),
});

const env = {
  MEDIA: { get: async (key: string) => (key === UPLOAD || key.startsWith("history/") ? object("image/jpeg") : null) },
  ASSETS: { fetch: async (request: Request) => new Response("bytes", { status: new URL(request.url).pathname.endsWith(".svg") || new URL(request.url).pathname === `/${PHOTO}` ? 200 : 404, headers: { "content-type": "image/webp" } }) },
} as unknown as Env;

const get = (path: string) => serveMedia(new Request(`https://bsw.example.com/media/${path}`), env);

test("/media serves a library upload and a site photograph, and nothing else", async () => {
  const upload = await get(UPLOAD);
  assert.equal(upload.status, 200);
  assert.equal(upload.headers.get("cache-control"), "public, max-age=86400");

  const photo = await get(PHOTO);
  assert.equal(photo.status, 200);
  assert.equal(photo.headers.get("cache-control"), "public, max-age=31536000, immutable");

  for (const path of [`history/${UPLOAD}/0a1b2c3d`, "logos/institutions/logo-mayo-clinic.svg", "team/Lisa-Giles.webp", "uploads/../history/x.jpg"]) {
    assert.equal((await get(path)).status, 404, path);
  }
  // A size URL as the page writes it names its format after the stored key: found (then refused for its width), not 404.
  assert.equal((await get(`${PHOTO}.avif?w=999`)).status, 400);
});
