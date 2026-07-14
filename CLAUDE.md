# CLAUDE.md - BioScience Writers (bsw)

Standalone marketing site for BioScience Writers. RR8 rebuild of the old WordPress install (dustinedwards.info/bsw on HostGator, retired after cutover).

## Session ritual (Capsid)

Capsid MCP is the memory layer. At session start read `capsid/conventions.md`, then `bsw/core.md`. Deeper context lives in the typed docs: `bsw/decisions.md`, `bsw/architecture.md`, `bsw/production-hardening.md`, `bsw/operations.md`, `bsw/content-notes.md`. At session end write a `session-YYYY-MM-DD.md` episodic entry (type `episodic`, under ~2KB) to the bsw namespace.

## Stack

- React Router v8 framework mode, SSR on Cloudflare Workers via `@cloudflare/vite-plugin`
- Tailwind v4, Open Sans, lucide-react
- Single production Worker, no staging, no CI; D1/KV/R2/DO deliberately not used yet
- Live at https://bsw.dustin-edwards.workers.dev

## Commands

- `npm run dev` local dev
- `npx tsc --noEmit` type check before any commit
- `npm run deploy` deploys to the production Worker; confirm the new Version ID and that the site responds before reporting done

## Hard rules

- No em dashes anywhere: code, copy, comments, commit messages
- No AI attribution in commits or PRs
- Never name Claude or Anthropic in user-facing copy; say "AI"
- Content claims are a launch blocker: `bsw/content-notes.md` lists unverified factual claims (turnaround and guarantee copy) and the testimonial anonymization policy. Do not restore named endorsements or add new factual claims without verification
- UI mechanisms have documented gotchas (marquee loop, band-slab z-index, HexField hydration): read `bsw/architecture.md` before touching them
