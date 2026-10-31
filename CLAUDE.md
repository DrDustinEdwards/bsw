# CLAUDE.md - BioScience Writers (bsw)

Current state is `bsw/core.md` in Capsid. This file holds only what is true of this repo. Before writing anything another site might have, read what the sites share: https://github.com/DrDustinEdwards/devkit/blob/shared-list/SHARED.md (CI's shared-code check fails on a copy).

## What this is

Standalone marketing site for BioScience Writers, rebuilt from the old WordPress install. Live at https://bsw.dustin-edwards.workers.dev.

- Tests: keep the minimal set (a few browser tests for flows that must never break, one integration test per real behavior, unit tests only for tricky logic, shared code tested once where it lives), and remove any test that pins design, repeats coverage or has never caught a real mistake, unless it guards a harm that cannot be undone.

Deeper context in the typed docs: `bsw/architecture.md`, `bsw/production-hardening.md`, `bsw/operations.md`, `bsw/content-notes.md`.

Stack and layout are in README.md. Single production Worker, no staging; D1/KV/R2/DO deliberately not used yet. CI (`.github/workflows/ci.yml`) typechecks, builds and audits every PR and push to main.

## Commands

- `npm run dev` local dev
- `npm run typecheck` before any commit (the Stop hook runs it too)
- A merge to main deploys (CI's `deploy` job, while the repo variable `CF_DEPLOY` is `true`). `npm run deploy` deploys by hand. Confirm the new Version ID and that the site responds before reporting done.

## Hard rules

1. The site's content claims (stats, endorsements, turnaround, guarantee, pricing) are Dustin's to change (`bsw/content-notes.md`). Do not add new factual claims without his confirmation.
2. UI mechanisms have documented gotchas (marquee loop, band-slab z-index, HexField hydration). Read `bsw/architecture.md` before touching them.
