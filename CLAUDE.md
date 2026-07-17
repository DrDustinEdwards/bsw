# CLAUDE.md - BioScience Writers (bsw)

Portfolio-wide rules live in Capsid, not here. Read `capsid/conventions.md` first, then `bsw/core.md`. This file holds only what is true of this repo.

## What this is

Standalone marketing site for BioScience Writers. RR8 rebuild of the old WordPress install (dustinedwards.info/bsw on HostGator, retired after cutover). Live at https://bsw.dustin-edwards.workers.dev.

## Session ritual

Start: read `capsid/conventions.md`, then `bsw/core.md`.
End: write a `session-YYYY-MM-DD.md` episodic (type `episodic`, under ~2KB) to the bsw namespace.

Deeper context in the typed docs: `bsw/decisions.md`, `bsw/architecture.md`, `bsw/production-hardening.md`, `bsw/operations.md`, `bsw/content-notes.md`.

## Stack

- React Router v8 framework mode, SSR on Cloudflare Workers via `@cloudflare/vite-plugin`
- Tailwind v4, Open Sans, lucide-react
- Single production Worker, no staging, no CI. D1/KV/R2/DO deliberately not used yet.

## Commands

- `npm run dev` local dev
- `npx tsc --noEmit` type check before any commit
- `npm run deploy` deploys to the production Worker. Confirm the new Version ID and that the site responds before reporting done.

## Hard rules

1. Content claims are a launch blocker. `bsw/content-notes.md` lists unverified factual claims (turnaround and guarantee copy) and the testimonial anonymization policy. Do not restore named endorsements or add new factual claims without verification.
2. UI mechanisms have documented gotchas (marquee loop, band-slab z-index, HexField hydration). Read `bsw/architecture.md` before touching them.
