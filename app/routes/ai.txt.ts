// /ai.txt from Prelum's aiTxt, the family AI usage policy: answer engines may cite and link, training rights are
// reserved (as the TDMRep header in workers/security-headers.ts says) and licensed on request.
import { aiTxt } from "@drdustinedwards/site-helpers/robots";
import { SITE } from "../config/site";

export function loader() {
  return new Response(aiTxt({ origin: SITE.url, name: SITE.name, contact: SITE.email }), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
