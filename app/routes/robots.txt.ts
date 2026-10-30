// robots.txt from Prelum's robotsResponse, the family bot policy: search engines and AI search agents crawl free,
// training crawlers are allowed so Cloudflare Pay Per Crawl can charge or block them, and the denied bots get Disallow: /.
// A request on any other origin (a Worker Preview) tells every crawler Disallow: /. Until launch every response also
// carries X-Robots-Tag: noindex (workers/app.ts), which this does not change.
import { robotsResponse } from "@drdustinedwards/site-helpers/robots";
import { SITE } from "../config/site";

export function loader({ request }: { request: Request }) {
  return robotsResponse({ origin: SITE.url, request });
}
