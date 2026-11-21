import { publicPageHeaders } from "@dustinedwards/site-runtime/edge-cache";
import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Every page under this layout is the same for every reader (no sign-in, no cookie, no form), so each is stored at
// the edge: a day fresh, a week stale (site-runtime ./edge-cache). A route with no headers of its own inherits these.
// Nothing purges, since bsw has no writes; a deploy starts the cache cold. A 404 or error is never stored
// (workers/app.ts, settleCacheHeaders).
export const headers = () => publicPageHeaders();

export default function SiteLayout() {
  return (
    <div className="site-frame">
      <Header />
      <main id="main" tabIndex={-1} className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
