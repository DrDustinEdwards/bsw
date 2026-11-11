// The scheduled jobs, keyed by the cron that fires them (wrangler.jsonc triggers.crons). workers/app.ts runs the list
// for the cron it receives through site-runtime's runJobs, and /health's cronCheck reads every list (names and
// intervals only), so a job whose trigger never fires warns as "never ran". Nightly: the D1 dump and the media files (a
// pass stops itself at three minutes and goes on the next night), nine minutes in all, inside a scheduled invocation's 15.
import { backupJob, type CronJob } from "@dustinedwards/site-runtime/cron";
import { runBackup, runMediaBackup } from "~/lib/backup.server";

const NIGHTLY_CRON = "47 3 * * *";

const MINUTE = 60_000;

export function cronJobs(env: Env): Record<string, CronJob[]> {
  return {
    [NIGHTLY_CRON]: [
      backupJob(() => runBackup(env), { timeoutMs: 5 * MINUTE }),
      backupJob(() => runMediaBackup(env), { name: "media-backup", timeoutMs: 4 * MINUTE }),
    ],
  };
}

/** Every job of every cron, for /health's cronCheck and the operator API's run_job (names and intervals; `run` is called only by run_job). */
export function allCronJobs(env: Env): CronJob[] {
  return Object.values(cronJobs(env)).flat();
}
