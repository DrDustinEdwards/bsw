import { kvPageRecord, trackRenderedPageDates } from "@drdustinedwards/site-helpers/lastmod";
import { PAGES } from "~/config/pages";
import { SITE } from "~/config/site";

// The day each page of /sitemap.xml last changed: the daily job reads each as Markdown (Prelum's trackPageDates) and keeps the day in the one `page_dates` row.

/** The record the job keeps: the table's one row. */
export const pageRecordStore = ({ DB }: Env) =>
  kvPageRecord(
    {
      get: () => DB.prepare("SELECT value FROM page_dates").first<string>("value"),
      put: (key, value) =>
        DB.prepare("REPLACE INTO page_dates VALUES (?1, ?2)").bind(key, value).run(),
    },
    "sitemap",
  );

/** The daily job: date every page of the sitemap. */
export async function runPageDates(env: Env): Promise<void> {
  await trackRenderedPageDates({
    paths: PAGES.map((page) => page.path),
    origin: SITE.url,
    env,
    ...pageRecordStore(env),
  });
}
