# BioScience Writers

Standalone, Cloudflare-native marketing site for BioScience Writers, a scientific editing and medical writing company. Built with React Router v8 (SSR) running in the Workers runtime via the Cloudflare Vite plugin.

## Stack

- React Router v8, server-side rendered
- Cloudflare Workers (via `@cloudflare/vite-plugin`)
- Tailwind CSS v4 with a tokenized theme in `app/app.css`
- TypeScript throughout
- Pictures through site-runtime `./image`: every photograph is a `<picture>` (AVIF and WebP at the sizes it is drawn) served by `/media/<key>` through the Images binding, from `public/` (the site's own photographs, hashed names) or from the media library
- The media library: Carrel uploads to it through `@dustinedwards/site-api` at `/api/carrel/v1` (key: the `CARREL_SITE_KEY` secret), stored in R2 (`MEDIA`) and indexed in D1 (`DB`, `drizzle/`); d1-dump backs both up nightly into `BACKUPS`. The page's copy is code, so Carrel lists no content for bsw
- A share card per page, drawn at build time from `app/config/pages.ts` (`scripts/share-cards.ts`, satori and resvg) to `/og/<page>.png`

## Develop

```sh
npm install        # also copies wrangler.jsonc.example to wrangler.jsonc (gitignored: it holds the D1 id)
npm run db:migrate # the local D1
npm run dev        # react-router dev on http://localhost:5173
```

Copy `.dev.vars.example` to `.dev.vars` for a local Carrel key.

## Build and deploy

```sh
npm run typecheck  # wrangler types + react-router typegen + tsc
npm test           # the /media route
npm run build      # production build
npm run deploy     # build + wrangler deploy (production Worker); run npm run db:migrate:prod first
```

Live at https://bsw.dustin-edwards.workers.dev

## Structure

- `app/routes/` one file per page; `routes/layout.tsx` is the shared header/main/footer shell
- `app/components/` presentational components (cards, marquee, editing demo, timeline, ...)
- `app/data/` typed content modules (nav, logos, stats, services, team, faq, testimonials)
- `app/config/pages.ts` every page's title, description and path (route meta, sitemap, share cards)
- `app/config/site.ts` single source of the base URL and per-route SEO meta helper
- `app/lib/media/` the picture sizes (`images.ts`), `/media` and the library's D1 rows; `app/lib/carrel/` Carrel's site API
- `workers/app.ts` the Worker, site-runtime's `./worker` (the gateway, the `Renderer` whose pages are stored at the edge, the request log and the cron), with what is bsw's own: the machine files (Prelum's `standardFiles`: robots.txt, ai.txt, site.webmanifest, the IndexNow key), `/health`, the operator tools, `/media` and Carrel's site API (site-api's `siteApiStep`). `workers/security-headers.ts` is the header set and the CSP, whose nonce is renewed for each reader of a stored page.
- `public/` static assets and logos; a photograph's name carries a hash of its bytes (`bsw-logo-web.2a9980c8.webp`), so its sizes are cached for good

## Conventions

- Every color, radius, and motion value is a token in `app/app.css`; no inline hex or duration literals
- Base URL lives only in `app/config/site.ts`
