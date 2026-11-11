// Carrel's site API, mounted by workers/app.ts at /api/carrel/v1 with its preview links at /preview/<token>. One key
// (CARREL_SITE_KEY, a Worker secret) reaches only that prefix and nothing else on the site. Carrel writes only the media
// library here (adapter.server.ts), so the standard hooks (IndexNow, the purge and webmentions) have no publish to act
// on; they are the network's same set, ready when a page is written in Carrel.
import { standardSiteApi } from "@dustinedwards/site-api";
import { INDEXNOW_KEY, SITE } from "~/config/site";
import { createCarrelAdapter } from "./adapter.server";

export function carrelApi(env: Env, origin: string) {
  // The replay store, preview links, hook retries and webmentions live in D1 (drizzle/0002 and 0004).
  return standardSiteApi({
    adapter: createCarrelAdapter(env, origin),
    key: env.CARREL_SITE_KEY,
    limiter: env.CARREL_RATE_LIMIT,
    db: env.DB,
    indexNow: { origin: SITE.url, key: INDEXNOW_KEY },
  });
}
