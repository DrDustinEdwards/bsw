// Nightly D1 backup and media-file copy into BACKUPS (d1-dump's runCheckedBackup, backupFiles). A failed check keeps the dump unmarked so /health's backup age warns.
// Never in a dump: preview_links. Not backed up: BACKUPS itself and the photographs in the repository.
import { createSiteBackup } from "@dustinedwards/d1-dump";

export const backup = createSiteBackup<Env>({
  dump: {
    required: ["media", "media_revisions"],
    exclude: ["preview_links"],
    credentials: true,
  },
  // A media pass stops itself at three minutes and goes on the next night, inside its job's four-minute
  // timeout (cron.server.ts).
  files: [{ name: "media", source: (env) => env.MEDIA, timeBudgetMs: 180_000 }],
});
