-- The day each page of the sitemap last changed: one row, Prelum's trackPageDates record, kept by the daily page-dates job
-- (app/lib/page-dates.server.ts) through site-runtime's d1FireStore get and put, never through Drizzle.
--
-- ADDITIVE: one new table. No existing row is touched.
CREATE TABLE IF NOT EXISTS page_dates (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);
