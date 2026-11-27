// The scheduled jobs by cron (wrangler.jsonc triggers.crons), run by workers/app.ts through site-runtime's runJobs and read by /health's cronCheck.
// Every minute: site-api's schedules, failed hook reruns and unfinished writes (it also prunes its old rows).
// Nightly total: twelve minutes, inside a scheduled invocation's 15.
import { backupJob, DAILY_MINUTES, type CronJob } from "@dustinedwards/site-runtime/cron";
import { pruneNotFoundJob } from "@dustinedwards/site-runtime/not-found";
import { SITE } from "~/config/site";
import { carrelApi } from "~/lib/carrel/handler.server";
import { backup } from "~/lib/backup.server";
import { runPageDates } from "~/lib/page-dates.server";

const SCHEDULES_CRON = "* * * * *";
const NIGHTLY_CRON = "47 3 * * *";

const MINUTE = 60_000;

export function cronJobs(env: Env): Record<string, CronJob[]> {
  return {
    [SCHEDULES_CRON]: [
      {
        name: "site-api-schedules",
        everyMinutes: 1,
        timeoutMs: 50_000,
        run: () => carrelApi(env, SITE.url).runSchedulesOrThrow(),
      },
    ],
    [NIGHTLY_CRON]: [
      backupJob(() => backup.runBackup(env), { timeoutMs: 5 * MINUTE }),
      backupJob(() => backup.runFilesBackup(env), { name: "media-backup", timeoutMs: 4 * MINUTE }),
      // The day each page's text last changed, for /sitemap.xml's lastmod (app/lib/page-dates.server.ts).
      {
        name: "page-dates",
        everyMinutes: DAILY_MINUTES,
        timeoutMs: 2 * MINUTE,
        run: () => runPageDates(env),
      },
      pruneNotFoundJob(env.DB),
    ],
  };
}

/** Every job of every cron, for /health's cronCheck and the operator API's run_job (names and intervals; `run` is called only by run_job). */
export function allCronJobs(env: Env): CronJob[] {
  return Object.values(cronJobs(env)).flat();
}
