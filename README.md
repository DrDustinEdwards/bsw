# BioScience Writers

Standalone, Cloudflare-native marketing site for BioScience Writers, a scientific editing and medical writing company. Built with React Router v8 (SSR) running in the Workers runtime via the Cloudflare Vite plugin.

## Stack

- React Router v8, server-side rendered
- Cloudflare Workers (via `@cloudflare/vite-plugin`)
- Tailwind CSS v4 with a tokenized theme in `app/app.css`
- TypeScript throughout

## Develop

```sh
npm install
npm run dev        # react-router dev on http://localhost:5173
```

## Build and deploy

```sh
npm run typecheck  # wrangler types + react-router typegen + tsc
npm run build      # production build
npm run deploy     # build + wrangler deploy (production Worker)
```

Live at https://bsw.dustin-edwards.workers.dev

## Structure

- `app/routes/` one file per page; `routes/layout.tsx` is the shared header/main/footer shell
- `app/components/` presentational components (cards, marquee, editing demo, timeline, ...)
- `app/data/` typed content modules (nav, logos, stats, services, team, faq, testimonials)
- `app/config/site.ts` single source of the base URL and per-route SEO meta helper
- `workers/app.ts` request handler plus security response headers (site-runtime's set and the site's CSP) and the CSP report sink at `/csp-report` (site-runtime's receiver, rate-limited by the `CSP_REPORT_RATE_LIMIT` binding)
- `public/` static assets, logos, `robots.txt`, `llms.txt`

## Conventions

- Every color, radius, and motion value is a token in `app/app.css`; no inline hex or duration literals
- Base URL lives only in `app/config/site.ts`, `public/robots.txt`, and `public/llms.txt`
