// Carrel's site API, mounted by workers/app.ts at /api/carrel/v1. One key (CARREL_SITE_KEY, a Worker secret) reaches only
// that prefix and nothing else on the site. No publish hooks: no Carrel write changes a page (adapter.server.ts).
import { createSiteApi } from "@dustinedwards/site-api";
import { d1SiteApiStore } from "@dustinedwards/site-api/store";
import { OWASP_EVENTS, logEvent } from "@dustinedwards/site-runtime/log";
import { createCarrelAdapter } from "./adapter.server";

/**
 * site-api's log lines through site-runtime's logger (scrubbed). A refused request is named in the OWASP vocabulary:
 * a missing or wrong key is `authz_fail`, a rate-limited one `excess_rate_limit_exceeded`; the reason stays a field.
 */
function siteApiLog(entry: Record<string, unknown>): void {
  if (entry.siteApi === "refused") {
    const limited = entry.reason === "rate-limited";
    const denied = entry.reason === "wrong-key" || entry.reason === "no-key";
    const event = limited ? OWASP_EVENTS.rateLimitExceeded : denied ? OWASP_EVENTS.authorizationFailure : "site_api_refused";
    logEvent(event, entry, { level: "warn" });
    return;
  }
  logEvent(`site_api_${String(entry.siteApi ?? "log")}`, entry);
}

export function carrelApi(env: Env, origin: string) {
  return createSiteApi({
    adapter: createCarrelAdapter(env, origin),
    key: env.CARREL_SITE_KEY,
    limiter: env.CARREL_RATE_LIMIT,
    log: siteApiLog,
    // Each write's answer under its change id, so a retried upload answers the same and stores nothing twice
    // (drizzle/0002_site_api_store.sql).
    store: d1SiteApiStore(env.DB),
  });
}
