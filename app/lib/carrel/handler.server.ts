// Carrel's site API, mounted by workers/app.ts at /api/carrel/v1. One key (CARREL_SITE_KEY, a Worker secret) reaches only
// that prefix and nothing else on the site. No publish hooks: no Carrel write changes a page (adapter.server.ts).
import { createSiteApi } from "@dustinedwards/site-api";
import { d1SiteApiStore } from "@dustinedwards/site-api/store";
import { createCarrelAdapter } from "./adapter.server";

export function carrelApi(env: Env, origin: string) {
  return createSiteApi({
    adapter: createCarrelAdapter(env, origin),
    key: env.CARREL_SITE_KEY,
    limiter: env.CARREL_RATE_LIMIT,
    // Each write's answer under its change id, so a retried upload answers the same and stores nothing twice
    // (drizzle/0002_site_api_store.sql).
    store: d1SiteApiStore(env.DB),
  });
}
