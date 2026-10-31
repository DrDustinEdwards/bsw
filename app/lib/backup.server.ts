// Nightly D1 backup into the BACKUPS bucket, by d1-dump's runCheckedBackup: dump without the marker, check, mark
// complete, prune. A dump that fails a check keeps its objects without the marker, so the run fails and /health's backup
// age keeps growing toward its 26 hour warning. The media library's files (uploads/ and history/ in MEDIA) are copied
// beside the dumps under files/media/ by d1-dump's backupFiles, each run going on where the last stopped.
//
// Never in a dump: preview_links (site-api's store, empty here), the hash of a preview link's token. The
// credential-column check refuses a dump that carries any other column named like a credential.
//
// Not backed up: BACKUPS, which is the backup, and the site's own photographs, which are files in the repository.
import { backupFiles, runCheckedBackup } from "@dustinedwards/d1-dump";

// A media pass stops itself at three minutes and goes on the next night, inside its job's four-minute timeout
// (cron.server.ts).
export const MEDIA_BACKUP = { name: "media", timeBudgetMs: 180_000 };

export async function runBackup(env: Env): Promise<void> {
  await runCheckedBackup(env.DB, env.BACKUPS, {
    required: ["media", "media_revisions"],
    exclude: ["preview_links"],
    credentials: true,
  });
}

export async function runMediaBackup(env: Env): Promise<void> {
  await backupFiles(env.MEDIA, env.BACKUPS, MEDIA_BACKUP);
}
