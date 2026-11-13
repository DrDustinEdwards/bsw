import { Links, Meta, Outlet } from "react-router";

import { iconLinks } from "@drdustinedwards/site-helpers/icons";
import { cloudflareBeaconAttributes } from "@dustinedwards/site-runtime/csp";
import { ErrorPage, errorTitle } from "capsomer/react/error-page";
import { Icon } from "capsomer/react/icons";

import type { Route } from "./+types/root";
// Open Sans from the site's own origin (Fontsource, the files Google Fonts serves, bundled under /assets/): no
// stylesheet from fonts.googleapis.com blocking the first paint, and no second origin to connect to.
import "@fontsource-variable/open-sans/wght.css";
import "@fontsource-variable/open-sans/wght-italic.css";
import "./app.css";
import { PRELOADS } from "./preloads";
import { SITE } from "./config/site";

const WEB_ANALYTICS_TOKEN = "82f973a0cfb6496f92a3919629cbfbd2";

// An unmatched address matches only the root, so the error path's title is set here (WCAG 2.4.2).
export function meta({ error }: Route.MetaArgs): Route.MetaDescriptors {
  return error ? [{ title: errorTitle(error, SITE.name) }] : [];
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
        <script src="/site.js" defer />
        {/* Cloudflare Web Analytics, manual setup (the site is on workers.dev, which the edge does not inject into). The token is the public site tag. */}
        <script {...cloudflareBeaconAttributes(WEB_ANALYTICS_TOKEN)} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// The error page is Capsomer's, on BioScience Writers' own look, since the site keeps its client's brand rather than
// Capsomer's (.shared.json "waive"): `hero` is the title band of an interior page (Capsomer's prose-page head, its
// HTML contract, since the error page brings its own body), then the sentence and the ways out follow in the page's
// column. The stack shows only in development.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <ErrorPage
      error={error}
      home="/"
      dev={import.meta.env.DEV}
      hero={({ title }) => (
        <header className="cap-prose-page-head">
          <h1 className="cap-prose-page-title">{title}</h1>
        </header>
      )}
      homeIcon={<Icon name="arrow-right" className="btn-arrow" />}
    />
  );
}
