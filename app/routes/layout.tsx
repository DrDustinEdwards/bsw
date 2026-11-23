import { publicPageHeaders } from "@dustinedwards/site-runtime/edge-cache";
import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SiteError, siteErrorMeta } from "../components/site-error";
import type { Route } from "./+types/layout";

// Every page under this layout is the same for every reader (no sign-in, no cookie, no form), so each is stored at
// the edge: a day fresh, a week stale (site-runtime ./edge-cache). A route with no headers of its own inherits these.
// Nothing purges, since bsw has no writes; a deploy starts the cache cold. A 404 or error is never stored
// (site-runtime ./edge-cache).
export const headers = () => publicPageHeaders();

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame">
      <Header />
      <main id="main" tabIndex={-1} className="site-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function SiteLayout() {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
}

// The error path's title (WCAG 2.4.2).
export function meta({ error }: Route.MetaArgs): Route.MetaDescriptors {
  return siteErrorMeta(error);
}

// A missing page draws Capsomer's error page inside the header and footer, so the page keeps its landmarks.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <Frame>
      <SiteError error={error} as="div" />
    </Frame>
  );
}
