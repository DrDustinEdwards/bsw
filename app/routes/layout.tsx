import { publicPageHeaders } from "@dustinedwards/site-runtime/edge-cache";
import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/*
  Pathless layout shared by every route. Renders the sticky header, the single
  <main> landmark, and the footer once, so route modules only return their own
  page sections. This is the single source of the page shell.
*/
// Every page under this layout is the same for every reader (no sign-in, no cookie, no form), so each is stored at
// the edge: a day fresh, a week stale (site-runtime ./edge-cache). A route with no headers of its own inherits these.
// Nothing purges, since bsw has no writes; a deploy starts the cache cold. A 404 or error is never stored
// (workers/app.ts, settleCacheHeaders).
export const headers = () => publicPageHeaders();

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
