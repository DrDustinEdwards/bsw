// robots.txt from Prelum's robotsDocument, the family bot policy: search engines and AI search agents crawl free,
// training crawlers are allowed so Cloudflare Pay Per Crawl can charge or block them, and the denied bots get Disallow: /.
// Until launch every response also carries X-Robots-Tag: noindex (workers/app.ts), which this does not change.
import { robotsDocument } from "@drdustinedwards/site-helpers/robots";
import { SITE } from "../config/site";

export function loader() {
  return new Response(robotsDocument({ origin: SITE.url, notes: [`LLM guide: ${SITE.url}/llms.txt`] }), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
