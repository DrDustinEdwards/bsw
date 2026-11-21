import { kvPageRecord, trackPageDates } from "@drdustinedwards/site-helpers/lastmod";
import { htmlToMarkdown } from "@drdustinedwards/site-helpers/markdown-copy";
import { d1FireStore } from "@dustinedwards/site-runtime/routine";
import { PAGES } from "~/config/pages";
import { SITE } from "~/config/site";

// The day each page of /sitemap.xml last changed. The copy is code, so no row dates a page: the daily page-dates job reads
// each as Markdown, the way a Markdown copy is made, with Prelum's trackPageDates (the job germomics, Foxing and txasm run),
// and keeps the day its text last changed in one row of `page_dates` (D1, because bsw has no KV). The sitemap reads it back.
const PAGE_DATES_KEY = "sitemap";

/** Renders a path through the Worker's own page handler and returns its HTML, or null when it is not a page. workers/app.ts sets it. */
export type PageRenderer = (path: string, env: Env) => Promise<string | null>;
let renderPage: PageRenderer | undefined;
export function setPageRenderer(renderer: PageRenderer): void {
  renderPage = renderer;
}

/** The record the job keeps, from its D1 row. */
export const pageRecordStore = (env: Env) =>
  kvPageRecord(d1FireStore(env.DB, "page_dates"), PAGE_DATES_KEY);

/** The daily job: date every page of the sitemap. */
export async function runPageDates(env: Env): Promise<{ rowsProcessed: number }> {
  if (!renderPage) throw new Error("page-dates: no page renderer is set");
  const render = renderPage;
  const store = pageRecordStore(env);
  const { record } = await trackPageDates({
    paths: PAGES.map((page) => page.path),
    read: async (path) => {
      const html = await render(path, env);
      if (html === null) return null;
      const facts = htmlToMarkdown(html, { base: `${SITE.url}${path}` });
      return `${facts.title}\n${facts.description}\n${facts.markdown}`;
    },
    load: store.load,
    save: store.save,
  });
  return { rowsProcessed: Object.keys(record).length };
}
