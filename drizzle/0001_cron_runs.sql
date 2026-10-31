-- site-runtime's cron table (CRON_SQL from ./cron, as written), written and read only through it, never through Drizzle
-- (app/db/schema.ts): each nightly job's last start, success and failure, which /health's cron check reads.
--
-- ADDITIVE: one new table.
CREATE TABLE IF NOT EXISTS cron_runs (
  name TEXT PRIMARY KEY NOT NULL,
  every_minutes INTEGER NOT NULL,
  first_started_at INTEGER,
  last_started_at INTEGER,
  last_ok_at INTEGER,
  last_failed_at INTEGER,
  last_error TEXT
);
