// /ai.txt: Prelum's aiTxt policy, served whole by aiTxtResponse. It is the family AI usage policy: answer engines may
// cite and link, training rights are reserved (as the TDMRep header in workers/security-headers.ts says) and licensed
// on request.
import { aiTxtResponse } from "@drdustinedwards/site-helpers/robots";
import { SITE } from "../config/site";

export function loader({ request }: { request: Request }) {
  return aiTxtResponse({ origin: SITE.url, request, name: SITE.name, contact: SITE.email });
}
