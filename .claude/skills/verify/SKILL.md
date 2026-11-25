---
name: verify
description: Use before committing or opening a pull request that changes what bsw shows or does (app/routes, app/components, app/islands, app/data, app/app.css, app/lib, workers/, drizzle/). Boots the site in Vite on workerd with a local D1, drives the changed page in Chromium with Playwright, runs the checks that cover the area, and reports the evidence. Carrel's site API, the media library's R2 and Images, and the operator API are proved by test/ and the live check, not here.
---

# Verify a bsw change

Do it before every commit that touches `app/`, `workers/` or `drizzle/`, and before the
pull request.

## 1. Boot the site on a local D1

From the repo root, on the repo's Node (`.nvmrc`; in a cloud session put a Node 26
on PATH, the one the SessionStart hook installs under `~/.cache/capsid-node/`):

```sh
npm ci
npm run db:migrate
```

`npm ci` runs `devkit-bootstrap`, which copies `wrangler.jsonc.example` to the
gitignored `wrangler.jsonc`. `db:migrate` applies `drizzle/` to the local D1 under
`.wrangler/state`. The site has no seed data. `.dev.vars` (`cp .dev.vars.example
.dev.vars`) is only for Carrel's site API; a page flow does not need it.

Pick a free port, then start Vite in the background and keep its PID. This is `npm run
dev` with the flag it would relaunch itself with, so `$!` is the real server (under
`npm run dev` it is a wrapper):

```sh
curl -s -o /dev/null -m 2 http://localhost:5173/ && echo "5173 is busy: use another port" || echo "5173 free"
PORT=5173   # or another free port; other sessions share this machine
node --conditions=development node_modules/.bin/react-router dev --port $PORT --strictPort > "${TMPDIR:-/tmp}/bsw-dev.log" 2>&1 &
echo $! > "${TMPDIR:-/tmp}/bsw-dev.pid"
```

Wait until `curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/` prints 200
(the first request compiles), then confirm it is this app:

```sh
curl -s http://localhost:$PORT/ | grep -o '<title>[^<]*'    # BioScience Writers | Scientific and Medical Editing
curl -s http://localhost:$PORT/health                      # "ok":true,"db":"up"
```

`/health` reports `"status":"warn"` locally (no backup has run).

Local cannot show pictures (`/media/...avif?w=` 404s in dev), Images resizing, the edge
page cache, Carrel's R2 uploads, the backup cron, the operator API, the share cards at
`/og/<page>.png` or `public/_headers` (the build writes those).

## 2. Drive the changed flow

The repo has no browser driver; use the container's Playwright. In a cloud session
`require('playwright')` works from any directory in a `.cjs` script and
`chromium.launch()` needs no options. Never run `playwright install`. Write the script
in the session's scratchpad. Name each step as a person would say it, act through roles
and labels, assert what the person should see, collect console and page errors, and
keep a screenshot of the end state.

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

Drive the whole flow (act, see the result, go back, reload and see it hold): the
header panels, the testimonial carousel, the editing demo, the process timeline. Below
the `lg` breakpoint the header is a sheet, so at 390 px open the menu button. Repeat the
end state at 390 px when the change is responsive; the site has one theme.

`npm run dev` logs known console noise that production does not. Expect these and
nothing else: a 404 for `/@devkit/axe.js`; `TypeError: Cannot read properties of
null (reading 'replaceChildren')` from the devkit toolbar; 404s for
`/media/...avif?w=` pictures; and CORS and `ERR_FAILED` errors for
`cloudflareinsights.com/cdn-cgi/rum` (Cloudflare Web Analytics refuses
`localhost`). Anything else in the list is a finding.

Stop the dev server by its PID (never `pkill` by name):

```sh
kill "$(cat "${TMPDIR:-/tmp}/bsw-dev.pid")"
```

## 3. Run the checks that cover the area

`npm test` runs `test/media.test.ts` (the `/media` route) with `node --test` in seconds.

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

Run the ones your change can trip before the pull request.

## Rules

A failed step is a finding about the change: fix the code and rerun the same script;
never add a sleep, retry or looser selector. Stop the server by PID, never `pkill` by
name.

## The report

Put this in the reply and the pull request body:

- First line: verified, partly verified (and what was not), or failed.
- Each step's ok or FAIL line verbatim, the console errors line, and the end-state
  screenshot attached.
- The test summary lines (`tests`, `pass`, `fail`) and the other checks run.
- Not verified: what local cannot show (above). The live check after a merge is CI's
  `deploy` job (`.github/workflows/ci.yml`: `/health` reports the commit, the home page
  answers 200, rollback otherwise); look at https://bsw.dustin-edwards.workers.dev/health.
