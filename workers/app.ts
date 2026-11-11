// aislop-ignore-next-line ai-slop/hallucinated-import -- a Workers built-in, not an npm package
import { WorkerEntrypoint } from "cloudflare:workers";
import type { ServerBuild } from "react-router";
import { siteApiStep } from "@dustinedwards/site-api";
import { standardFiles } from "@drdustinedwards/site-helpers/files";
import { markdownCopies } from "@drdustinedwards/site-helpers/markdown-copy";
import { cronCheck, runJobTool } from "@dustinedwards/site-runtime/cron";
import { healthResponse, imagesCheck, r2Check } from "@dustinedwards/site-runtime/health";
import { defineSite, siteRenderer, siteWorker } from "@dustinedwards/site-runtime/worker";
import { FONT_PRELOADS } from "../app/preloads";
import { INDEXNOW_KEY, SITE } from "../app/config/site";
import { backupStatus } from "../app/lib/backup.server";
import { carrelApi } from "../app/lib/carrel/handler.server";
import { allCronJobs, cronJobs } from "../app/lib/cron.server";
import { serveMedia } from "../app/lib/media/serve.server";
import { withSecurityHeaders } from "./security-headers";

// site-runtime's limiter class, bound as RATE_LIMITER (wrangler.jsonc); the operator API counts through it.
export { RateLimiter } from "@dustinedwards/site-runtime/rate-limit/durable-object";

/**
 * The site's Worker: site-runtime's gateway, Renderer, request log and cron (./worker), with what is this site's own:
 * its machine files, /health, the operator tools, the media library and Carrel's site API.
 */
const site = defineSite<Env>({
  name: "BioScience Writers",
  serverBuild: () => import("virtual:react-router/server-build") as Promise<ServerBuild>,
  mode: import.meta.env.MODE,
  withSecurityHeaders,
  // robots.txt, ai.txt, site.webmanifest and the IndexNow key file (Prelum ./files).
  files: standardFiles({
    origin: SITE.url,
    indexNowKey: INDEXNOW_KEY,
    ai: { name: SITE.name, contact: SITE.email },
    manifest: {
      name: SITE.name,
      description: SITE.description,
      themeColor: "#0066a1",
      backgroundColor: "#0066a1",
      lang: "en",
    },
  }),
  operator: (env) => ({
    backup_status: {
      description:
        "Reads the backup state now, uncached: the newest complete D1 dump's age and the media files pass, with when each last completed, and a warning when either is past 26 hours. The same read as /health's backup field.",
      run: () => backupStatus(env),
    },
    run_job: runJobTool(env.DB, () => allCronJobs(env)),
  }),
  steps: [
    // site-runtime's healthResponse, with the deployed commit devkit's shared deploy waits for (CI passes DEPLOY_SHA).
    // 503 only when D1 does not answer, since Carrel's library needs it; the pages do not, so everything else warns: the
    // newest complete nightly dump or media files pass older than 26 hours (both under `backup`), the MEDIA bucket, the
    // Images binding, and a job that failed, stopped or never ran (`cron_runs`). Not probed: BACKUPS (a dead bucket
    // shows as a stale backup) and the rate limits, which have no read that spends nothing.
    (_request, env, _ctx, { url }) =>
      url.pathname === "/health"
        ? healthResponse({
            ping: () => env.DB.prepare("select 1").first(),
            backup: () => backupStatus(env),
            sha: (env as Env & { DEPLOY_SHA?: string }).DEPLOY_SHA,
            checks: [
              { ...r2Check("media", env.MEDIA), level: "warn" },
              imagesCheck("images", env.IMAGES),
              cronCheck(env.DB, {
                jobs: allCronJobs(env),
                deployedAt: new Date(env.CF_VERSION_METADATA.timestamp),
              }),
            ],
          })
        : undefined,
    // The site's photographs and the media library (app/lib/media), each size cached at the edge (`caches.default` is
    // the Workers runtime's).
    (request, env, _ctx, { url }) =>
      url.pathname.startsWith("/media/")
        ? serveMedia(request, env, (caches as CacheStorage & { default: Cache }).default)
        : undefined,
    // Carrel's site API under /api/carrel/v1 and its preview links (site-api's step); a write it accepts purges the
    // stored pages.
    siteApiStep((env, kit) => carrelApi(env, kit.url.origin)),
  ],
  preloads: FONT_PRELOADS,
  // Every page also answers as Markdown at /path.md and for Accept: text/markdown, made from its <main>, and
  // /llms-full.txt is built from llms.txt and the sitemap (Prelum ./markdown-copy).
  wrap: (handler) =>
    markdownCopies(handler, {
      origin: SITE.url,
      siteMarkdown: false,
      skip: (path) =>
        path.startsWith("/media/") || path.startsWith("/api/") || path.startsWith("/preview/"),
    }),
  cron: cronJobs,
});

export class Renderer extends siteRenderer(WorkerEntrypoint<Env>, site) {}

export default siteWorker(site) satisfies ExportedHandler<Env>;
