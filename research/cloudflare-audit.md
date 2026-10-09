# Cloudflare best-practices check: bsw (2026-10-09)

bsw is a mockup, so this is a light check of the repo only. The Cloudflare best-practices page could not be fetched from the audit sandbox (DNS blocked), so these checks come from the list in the job, not from the page text. Nothing was checked against the live Worker.

| Check | Result |
|---|---|
| Has Worker code | Yes. `workers/app.ts` is the entry (`main` in `wrangler.jsonc`). |
| compatibility_date | `2026-07-13`, about three months old. Not stale. Bump it only with a test pass. |
| Observability | On (`observability.enabled: true`). `upload_source_maps` is also on. |
| Workers Static Assets, not Pages | Workers, not Pages: no `functions/`, no `_worker.js`, and the deploy is `wrangler deploy`. `wrangler.jsonc` has no `assets` block, so assets are expected to come from `@cloudflare/vite-plugin` at build time. Not verified, since no build was run here. |
| No secrets in config | None found. `wrangler.jsonc` has no vars or bindings, `.env` is gitignored, and a grep for secret, token, api key and password in config and source finds only CSS design tokens. |
| Shared packages (Capsomer, security-headers, site-helpers) | None used. `package.json` lists none. The CSP and security headers are hand-written in `workers/app.ts`. Job_147b84937837 already says to adopt the shared security-headers package once it has released. |

## Findings
No safety issues. No small clear fix worth a code change, so this PR is the audit file only.

1. Security headers are a local copy. Adopt the shared package when it ships (see above).
2. `compatibility_date` is fine now. Revisit at the next deploy.
3. Confirm after the next build that the generated config includes the assets directory.
