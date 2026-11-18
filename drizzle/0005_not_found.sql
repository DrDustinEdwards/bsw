-- site-runtime's 404 table (NOT_FOUND_SQL from ./not-found, as written), written and read only through it, never
-- through Drizzle (app/db/schema.ts): the 404s the site serves per path, referring host and UTC day, pruned to 90 days
-- by the nightly job. The worker records every 404 through it, so a database without the table fails each one.
--
-- ADDITIVE: one new table and one index. No existing row is touched.
CREATE TABLE IF NOT EXISTS page_404_daily (
  id TEXT PRIMARY KEY NOT NULL,
  day INTEGER NOT NULL,
  path TEXT NOT NULL,
  referrer_host TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'page',
  hit_count INTEGER DEFAULT 0 NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS page_404_daily_day_path_referrer_uq ON page_404_daily (day, path, referrer_host);
