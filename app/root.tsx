import { Links, Meta, Outlet } from "react-router";
import { SITE_SCRIPT } from "virtual:islands";

import { iconLinks } from "@drdustinedwards/site-helpers/icons";
import { cloudflareBeaconAttributes } from "@dustinedwards/site-runtime/csp";

import type { Route } from "./+types/root";
// Open Sans from the site's own origin (Fontsource, the files Google Fonts serves, bundled under /assets/): no
// stylesheet from fonts.googleapis.com blocking the first paint, and no second origin to connect to.
import "@fontsource-variable/open-sans/wght.css";
import "@fontsource-variable/open-sans/wght-italic.css";
import "./app.css";
import { SiteError, siteErrorMeta } from "./components/site-error";
import { PRELOADS } from "./preloads";

const WEB_ANALYTICS_TOKEN = "82f973a0cfb6496f92a3919629cbfbd2";

// The error path's title for an error the root itself shows (WCAG 2.4.2).
export function meta({ error }: Route.MetaArgs): Route.MetaDescriptors {
  return siteErrorMeta(error);
}

export const links: Route.LinksFunction = () => [
  // The font preload, also sent as the Early Hints `Link` header (preloads.ts).
  ...PRELOADS.links,
  ...iconLinks(),
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // One theme: data-theme="light" keeps Capsomer's tokens (the header, its sheet, the tabs) light under a dark system.
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="text-scale" content="scale" />
        <meta name="theme-color" content="#3f4e5c" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* The page's one script tag: app/site.ts, bundled by vite.config.ts, which loads the page's islands. No React reaches the browser. */}
        <script {...SITE_SCRIPT} defer />
        {/* Cloudflare Web Analytics, manual setup (the site is on workers.dev, which the edge does not inject into). The token is the public site tag. */}
        <script {...cloudflareBeaconAttributes(WEB_ANALYTICS_TOKEN)} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// An error the root itself shows; the public pages' own are drawn inside their layout (routes/layout.tsx).
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <SiteError error={error} />;
}
