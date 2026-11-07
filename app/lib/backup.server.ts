// Nightly D1 backup into the BACKUPS bucket, by d1-dump's runCheckedBackup: dump without the marker, check, mark
// complete, prune. A dump that fails a check keeps its objects without the marker, so the run fails and /health's backup
// age keeps growing toward its 26 hour warning. The media library's files (uploads/ and history/ in MEDIA) are copied
// beside the dumps under files/media/ by d1-dump's backupFiles, each run going on where the last stopped.
//
// Never in a dump: preview_links (site-api's store, empty here), the hash of a preview link's token. The
// credential-column check refuses a dump that carries any other column named like a credential.
//
// Not backed up: BACKUPS, which is the backup, and the site's own photographs, which are files in the repository.
import { createSiteBackup } from "@dustinedwards/d1-dump";

const backup = createSiteBackup<Env>({
  dump: {
    required: ["media", "media_revisions"],
    exclude: ["preview_links"],
    credentials: true,
  },
  // A media pass stops itself at three minutes and goes on the next night, inside its job's four-minute
  // timeout (cron.server.ts).
  files: [{ name: "media", source: (env) => env.MEDIA, timeBudgetMs: 180_000 }],
});

export const runBackup = async (env: Env): Promise<void> => void (await backup.runBackup(env));

export const runMediaBackup = async (env: Env): Promise<void> =>
  void (await backup.runFilesBackup(env));

/** The newest complete dump and the media files pass, for /health's backup check and the operator API: it warns when either is stale. Never throws. */
export const backupStatus = (env: Env) => backup.status(env);
