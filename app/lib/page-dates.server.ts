import { kvPageRecord, trackPageDates } from "@drdustinedwards/site-helpers/lastmod";
import { htmlToMarkdown } from "@drdustinedwards/site-helpers/markdown-copy";
import { PAGES } from "~/config/pages";

// The day each page of /sitemap.xml last changed. The copy is code, so no row dates a page: the daily page-dates job reads
// each as Markdown, the way a Markdown copy is made, with Prelum's trackPageDates (the job germomics, Foxing and txasm run),
// and keeps the day its text last changed in the one row of `page_dates` (D1, because bsw has no KV). The sitemap reads it back.

/** Renders a path through the Worker's own page handler and returns its HTML, or null when it is not a page. workers/app.ts sets it. */
export type PageRenderer = (path: string, env: Env) => Promise<string | null>;
let renderPage: PageRenderer;
export const setPageRenderer = (renderer: PageRenderer) => (renderPage = renderer);

/** The record the job keeps: the table's one row. */
export const pageRecordStore = ({ DB }: Env) =>
  kvPageRecord(
    {
      get: () => DB.prepare("SELECT value FROM page_dates").first<string>("value"),
      put: (_key, value) => DB.prepare("REPLACE INTO page_dates VALUES ('sitemap', ?1)").bind(value).run(),
    },
    "sitemap",
  );

/** The daily job: date every page of the sitemap. */
export async function runPageDates(env: Env): Promise<void> {
  await trackPageDates({
    paths: PAGES.map((page) => page.path),
    read: async (path) => {
      const html = await renderPage(path, env);
      return html && htmlToMarkdown(html).markdown;
    },
    ...pageRecordStore(env),
  });
}
