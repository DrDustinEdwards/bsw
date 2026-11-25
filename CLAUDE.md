# CLAUDE.md - BioScience Writers (bsw)

## What this is

Standalone marketing site for BioScience Writers, rebuilt from the old WordPress install. Live at https://bsw.dustin-edwards.workers.dev.

Deeper context in the typed docs: `bsw/architecture.md`, `bsw/production-hardening.md`, `bsw/operations.md`, `bsw/content-notes.md`.

Stack and layout are in README.md. Single production Worker, no staging. The page's copy is code; D1 (`DB`) and R2 (`MEDIA`, `BACKUPS`) hold only the media library Carrel uploads to and its nightly backup, and the Images binding serves every photograph at /media; no KV; one DO class, site-runtime's `RateLimiter`, counts the operator API (`/api/operator`, the door Capsid Admin's backups reach the site through, `OPERATOR_TOKEN` bearer). `wrangler.jsonc` is gitignored (it holds the D1 id): `npm install` copies `wrangler.jsonc.example`. CI (`.github/workflows/ci.yml`) typechecks, lints, checks the format, tests, builds and audits every PR and push to main; `checks / Repo checks` (devkit's pr.yml) runs the shared checks, no-bloat and the Worker size on every PR.

## Rules every repo shares

- **Tests.** Reproduce a reported failure before fixing it, and report red before and green after. Keep the minimal set: a few browser tests for flows that must never break, one integration test per real behavior, unit tests only for tricky logic, shared code tested once where it lives. Remove a test that pins design, repeats coverage or never caught a mistake, unless it guards a harm that cannot be undone.
- **UI copy.** Let the layout explain: no eyebrows, restating subtitles, "this page lets you" intros, hints a label already gives or empty-state essays. Labels, accessible names, errors, one-way warnings and legal text stay (Dustin, 2026-11-18; capsid/conventions.md).
- **Shared code.** Before writing anything another site might have, check https://github.com/DrDustinEdwards/devkit/blob/shared-list/SHARED.md. Change shared code in place and delete what the change replaces in the same PR.
- **Browser support.** devkit's docs/browser-support.md: Baseline Widely available freely, Newly available with a small fallback, Limited only feature-detected, no polyfills.
- **Secrets.** Never commit or print a key, token, `.dev.vars` or `.env`.
- **Deploys.** A merge to the default branch deploys; never deploy from a session.
- **D1.** Never hand-run production DDL; CI applies additive migrations and refuses the rest. Back up and restore with d1-dump, never `wrangler d1 export` (it fails on FTS5 tables).
- **Site copy and AI.** Copy describes only what the current build does. An AI provider key stays on the server, never in a client.

## Commands

- `npm run dev` local dev
- `npm run typecheck` before any commit, `npm run lint` (devkit's shared Oxlint config, `oxlint.config.ts`), `npm run format:check` (Oxfmt, `oxfmt.config.ts`; `npm run format` writes) and `npm test`
- `npm run db:migrate` (local) and `db:migrate:prod` (remote): hand-written SQL in `drizzle/` (the media tables are site-api's standard ones, read and written only through its `d1MediaStore`); CI's deploy applies them.
- A merge to main deploys (CI's `deploy` job, while the repo variable `CF_DEPLOY` is `true`).

## Rules for this repo

1. The site's content claims (stats, endorsements, turnaround, guarantee, pricing) are Dustin's to change (`bsw/content-notes.md`). Do not add new factual claims without his confirmation.
2. UI mechanisms have documented gotchas (marquee loop). Read `bsw/architecture.md` before touching them. The hero's hex field, the slanted band and the editing demo are Capsomer's ambient, section band and annotated document.
