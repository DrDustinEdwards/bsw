import { goneResponse } from "@dustinedwards/site-runtime/url";
import type { Route } from "./+types/not-found";

// Pages taken down on purpose: each answers 410 Gone (site-runtime ./url goneResponse), so a crawler drops it sooner
// than a 404 and a reader is told it is not a typo. An entry is a path, a "/prefix*" or a RegExp (pathListed). None yet:
// add a path here when a page is removed, rather than deleting its route and leaving a 404.
const GONE: readonly (string | RegExp)[] = [];

// Every path no route matches. The root ErrorBoundary draws the thrown status as Capsomer's error page, in the site's
// header and footer.
export function loader({ request }: Route.LoaderArgs): never {
  throw goneResponse(request, GONE) ?? new Response("Not Found", { status: 404 });
}

export default function NotFound() {
  return null;
}
