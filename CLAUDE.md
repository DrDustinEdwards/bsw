# CLAUDE.md - BioScience Writers (bsw)

Current state is `bsw/core.md` in Capsid. This file holds only what is true of this repo.

## What this is

Standalone marketing site for BioScience Writers, rebuilt from the old WordPress install. Live at https://bsw.dustin-edwards.workers.dev.

Deeper context in the typed docs: `bsw/architecture.md`, `bsw/production-hardening.md`, `bsw/operations.md`, `bsw/content-notes.md`.

Stack and layout are in README.md. Single production Worker, no staging. The page's copy is code; D1 (`DB`) and R2 (`MEDIA`, `BACKUPS`) hold only the media library Carrel uploads to and its nightly backup, and the Images binding serves every photograph at /media; no KV; one DO class, site-runtime's `RateLimiter`, counts the operator API (`/api/operator`, the door Capsid Admin's backups reach the site through, `OPERATOR_TOKEN` bearer). `wrangler.jsonc` is gitignored (it holds the D1 id): `npm install` copies `wrangler.jsonc.example`. CI (`.github/workflows/ci.yml`) typechecks, lints, checks the format, tests, builds and audits every PR and push to main; `checks / Repo checks` (devkit's pr.yml) runs the shared checks, no-bloat and the Worker size on every PR.

## Rules every repo shares

- **Tests.** Keep the minimal set (a few browser tests for flows that must never break, one integration test per real behavior, unit tests only for tricky logic, shared code tested once where it lives), and remove any test that pins design, repeats coverage or has never caught a real mistake, unless it guards a harm that cannot be undone.
- **UI copy.** Let the layout explain. No eyebrows, restating subtitles, "this page lets you" intros, descriptions under obvious buttons, hints a label already gives, repeated captions or empty-state essays; labels, accessible names, errors, one-way warnings and legal text stay (Dustin, 2026-11-18; Capsid capsid/conventions.md).
- **Shared code.** Before writing anything another site might have, read https://github.com/DrDustinEdwards/devkit/blob/shared-list/SHARED.md (CI's shared-code check fails on a copy). Change shared code in place and delete what a change replaces in the same PR.
- **Browser support.** devkit's docs/browser-support.md (Baseline Widely available freely; Newly available with a small fallback; Limited only feature-detected; no polyfills).
- **Secrets.** Never commit or print a key, token, `.dev.vars` or `.env`.
- **Reproduce first.** A report that something is broken names a cause; reproduce the failure before fixing it, and report red before and green after.
- **Deploys.** A merge to the default branch deploys (CI's deploy job); never deploy from a session.
- **D1.** Migrations are additive: CI applies the ones that only add and refuses a drop, rename or row delete for a hand run; never hand-run production DDL. `wrangler d1 export` fails on FTS5 tables, so back up and restore with d1-dump (its README); never export an `*_fts` table. Checking backups, backing up now and running a scheduled job now are Capsid Admin's, for every site (`/api/operator`, site-runtime `./operator`).
- **Site copy and AI.** Copy describes only what the current build does. An AI provider key stays on the server, never in a client.

## Commands

- `npm run dev` local dev
- `npm run typecheck` before any commit, `npm run lint` (devkit's shared Oxlint config, `oxlint.config.ts`), `npm run format:check` (Oxfmt, `oxfmt.config.ts`; `npm run format` writes) and `npm test`
- `npm run db:migrate` (local) and `db:migrate:prod` (remote): hand-written SQL in `drizzle/` (the media tables are site-api's standard ones, read and written only through its `d1MediaStore`); CI's deploy applies them.
- A merge to main deploys (CI's `deploy` job, while the repo variable `CF_DEPLOY` is `true`).

## Rules for this repo

1. The site's content claims (stats, endorsements, turnaround, guarantee, pricing) are Dustin's to change (`bsw/content-notes.md`). Do not add new factual claims without his confirmation.
2. UI mechanisms have documented gotchas (marquee loop). Read `bsw/architecture.md` before touching them. The hero's hex field, the slanted band and the editing demo are Capsomer's ambient, section band and annotated document.
