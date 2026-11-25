# CLAUDE.md - bsw

BioScience Writers' marketing site, https://bsw.dustin-edwards.workers.dev. Stack and layout are in README.md.

## Rules every repo shares

- **Tests.** Reproduce a reported failure first: red before, green after. Keep the set minimal; delete a test that pins design or repeats coverage.
- **UI copy.** Let the layout explain: no eyebrows, restating subtitles, intros or hints a label already gives (Dustin, 2026-11-18).
- **Shared code.** Check devkit's [SHARED.md](https://github.com/DrDustinEdwards/devkit/blob/shared-list/SHARED.md) before writing anything another repo might have. Change shared code in place and delete what it replaces.
- **Secrets.** Never commit or print a key or token. AI provider keys stay on the server.
- **Production.** Never deploy, tag, release or run production DDL from a session; a merge deploys. Back up and restore D1 only with d1-dump.
- **Copy.** Site copy says only what the current build does.

## Rules for this repo

- **Claims.** The site's content claims (stats, endorsements, turnaround, guarantee, pricing) are Dustin's to change; add no new factual claim without his yes.

## Commands

- `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test`.
