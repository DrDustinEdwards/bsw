---
name: verify
description: Use before committing or opening a pull request that changes what bsw shows or does (app/routes, app/components, app/islands, app/data, app/app.css, app/lib, workers/, drizzle/). Boots the site in Vite on workerd with a local D1, drives the changed page in Chromium with Playwright, runs the checks that cover the area, and reports the evidence. Carrel's site API, the media library's R2 and Images, and the operator API are proved by test/ and the live check, not here.
---

# Verify a bsw change

Tests prove what someone thought to test. This skill proves the change itself: run
the real site, use the changed page as a visitor would, and look at the result. Do
it before every commit that touches `app/`, `workers/` or `drizzle/`, and before
the pull request. bsw stays on workers.dev, and deploys are CI's.

## 1. Boot the site on a local D1

From the repo root, on the repo's Node (`.nvmrc`; in a cloud session prepend a Node
26 to PATH, for example `~/.cache/capsid-node/node-v26.13.1-linux-x64/bin`):

```sh
npm ci
npm run db:migrate
```

`npm ci` runs `devkit-bootstrap`, which copies `wrangler.jsonc.example` to the
gitignored `wrangler.jsonc` (the D1 id stays a placeholder, which local does not
need). `db:migrate` applies `drizzle/` to the local D1 under `.wrangler/state`. The
site has no seed data: its copy is code. `.dev.vars` is only needed to exercise
Carrel's site API (`cp .dev.vars.example .dev.vars`); a page flow does not need it,
and it must never be committed.

Pick a free port, then start Vite (workerd, local D1 and R2, bindings from
`wrangler.jsonc`) in the background and keep its PID. This is `npm run dev` with
the `--conditions` flag it would relaunch itself with; started that way, `$!` is the
real server, where under `npm run dev` it is a wrapper and killing it leaves the
server running:

```sh
curl -s -o /dev/null -m 2 http://localhost:5173/ && echo "5173 is busy: use another port" || echo "5173 free"
PORT=5173   # or another free port; other sessions share this machine
node --conditions=development node_modules/.bin/react-router dev --port $PORT --strictPort > "${TMPDIR:-/tmp}/bsw-dev.log" 2>&1 &
echo $! > "${TMPDIR:-/tmp}/bsw-dev.pid"
```

Wait until `curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/` prints
200 (the first request compiles and takes a few seconds). Then confirm it is this
app and not another repo's server: the title must be BioScience Writers.

```sh
curl -s http://localhost:$PORT/ | grep -o '<title>[^<]*'    # BioScience Writers | Scientific and Medical Editing
curl -s http://localhost:$PORT/health                      # "ok":true,"db":"up"
```

`/health` reports `"status":"warn"` locally because no backup has run; that is
normal.

What local shows: every page's markup and copy, the headers and CSP the Worker
sends, the islands (carousel, timeline, editing demo), `/sitemap.xml`,
`/llms.txt`, the schema from every migration. What it cannot show: pictures (the
`/media/...avif?w=` requests 404 in dev, so images are blank), Images resizing, the
edge page cache (`cache` in `wrangler.jsonc`), Carrel's real uploads in R2, the
nightly backup cron, the operator API (`OPERATOR_TOKEN`), the share cards at
`/og/<page>.png` (drawn only by `npm run build`), and `public/_headers` (also
written by the build).

## 2. Drive the changed flow

The repo has no browser driver, so use the container's preinstalled Playwright. In a
cloud session `require('playwright')` works from any directory in a `.cjs` script
and `chromium.launch()` needs no options. Never run `playwright install`. Write the
script in the session's scratchpad, never in the repo. Name each step the way a
person would say it, act through roles and labels, and assert what the person should
see afterward. Collect console errors and page errors, and keep a screenshot of the
end state.

```js
// <scratchpad>/drive.cjs: cd <scratchpad> && node drive.cjs http://localhost:5173/
const { chromium } = require("playwright");
(async () => {
  const base = process.argv[2];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  const log = [];
  async function step(name, fn) {
    try {
      await fn();
      log.push(`ok   ${name}`);
    } catch (e) {
      log.push(`FAIL ${name}: ${e.message.split("\n")[0]}`);
      await page.screenshot({ path: "fail.png", fullPage: true });
      throw e;
    }
  }
  try {
    await step("open the home page", async () => {
      const r = await page.goto(base);
      if (!r.ok()) throw new Error(`status ${r.status()}`);
      await page
        .getByRole("heading", { name: "Funding Secured. Science Perfected.", level: 1 })
        .waitFor();
    });
    await step("go to Pricing from View Pricing", async () => {
      await page.getByRole("link", { name: "View Pricing" }).first().click();
      await page.waitForURL("**/pricing");
      await page.getByRole("heading", { name: "Pricing", level: 1 }).waitFor();
    });
    // ...the changed flow: click, fill, submit, then assert the visible result.
    await page.screenshot({ path: "after.png", fullPage: true });
  } finally {
    console.log(log.join("\n"));
    console.log("console errors:", errors.length ? errors : "none");
    await browser.close();
  }
})();
```

Drive the whole flow, not just the page load: follow the link, use the control (the
header's Services, Operations and Resources panels, the testimonial carousel, the
editing demo, the process timeline), see the result, go back, reload and see it
hold. The header collapses into a sheet below the `lg` breakpoint, so at 390 px wide
open the menu button instead of the panel buttons. If the change is responsive,
repeat the end state at 390 px wide (`page.setViewportSize`). The site has one
theme, so there is no dark mode to check. If copy changed, remember hard rule 1 in
CLAUDE.md: no new factual claim without Dustin's yes.

`npm run dev` logs known console noise that production does not. Expect these and
nothing else: a 404 for `/@devkit/axe.js`; `TypeError: Cannot read properties of
null (reading 'replaceChildren')` from the devkit toolbar; 404s for
`/media/...avif?w=` pictures; and CORS and `ERR_FAILED` errors for
`cloudflareinsights.com/cdn-cgi/rum` (Cloudflare Web Analytics refuses
`localhost`). Anything else in the list is a finding.

Stop the dev server you started by its PID (other sessions run servers on this
machine, so never `pkill` by name), and remove `.dev.vars` if you made it:

```sh
kill "$(cat "${TMPDIR:-/tmp}/bsw-dev.pid")"
```

Its workerd child exits with it. `git status` should show nothing new.

## 3. Run the checks that cover the area

`npm test` runs `test/*.test.ts` with `node --test` and takes seconds. There is
one test, and it covers the `/media` route (`app/lib/media/serve.server.ts`): what a
library upload and a brand file serve, and that history files, other `public/`
files and sizes outside the closed set never do.

| Area changed                                          | Check                                                          |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| `app/lib/media/`, `/media` serving                    | `npm test`                                                     |
| Any `.ts` or `.tsx`, route types, bindings            | `npm run typecheck`                                            |
| Any code                                              | `npm run lint`                                                 |
| Any file CI formats, including this skill             | `npm run format:check` (`npm run format` writes)               |
| `drizzle/`                                            | `npm run check:migrations` (expand-only; a new file only adds) |
| Added or removed code, dependencies                   | `npm run bloat` (devkit-no-bloat; never raise its baseline)    |
| Headers, CSP, share cards, anything the build touches | `npm run build`                                                |
| Carrel's site API, operator API, backup, cron         | no local test: read the code, then the live check after merge  |

CI's `ci` job runs typecheck, lint, format check, `npm test`, `check:migrations`,
`build` and `npm audit --omit=dev --audit-level=high`; `checks / Repo checks` adds
the shared checks, no-bloat and the Worker size. Run the ones your change can trip
before the pull request. A new migration in `drizzle/` is hand-written SQL.

## Rules

- A failed step is a finding about the change. Fix the code, then run the same
  script again. Never add a sleep, a retry or a looser selector to make it pass.
- If a step fails sometimes, find out why before going on; a flaky check teaches
  the next thread to re-run instead of fix.
- Never edit the existing test to make it agree with new behavior unless the change
  is meant to alter that behavior, and say so in the pull request.
- Leave nothing behind: stop the server by the process id you started, and keep the
  scripts and screenshots in the scratchpad. Nothing from this skill is committed.

## The report

Put this in the reply and the pull request body:

- First line: verified, partly verified (and what was not), or failed.
- Each step's ok or FAIL line, verbatim, and the console errors line.
- The end-state screenshot, attached (Dustin cannot open a scratchpad path).
- The test run's summary lines (`tests`, `pass`, `fail`) and the other checks run.
- Anything local cannot show (pictures, the edge cache, share cards, Carrel's
  uploads, the operator API, the backup cron), named as not verified. The live
  check runs after the merge: CI's `deploy` job (`.github/workflows/ci.yml`) waits
  for `/health` to report the commit, fetches the home page and rolls back if it
  does not answer 200; look at https://bsw.dustin-edwards.workers.dev/health and the
  home page after it.
