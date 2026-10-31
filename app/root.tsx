import { Links, Meta, Outlet } from "react-router";
import { ErrorPage, errorTitle } from "capsomer/react/error-page";

import { iconLinks } from "@drdustinedwards/site-helpers/icons";

import type { Route } from "./+types/root";
// Open Sans from the site's own origin (Fontsource, the files Google Fonts serves, bundled under /assets/): no
// stylesheet from fonts.googleapis.com blocking the first paint, and no second origin to connect to.
import "@fontsource-variable/open-sans/wght.css";
import "@fontsource-variable/open-sans/wght-italic.css";
import "./app.css";
import { PRELOADS } from "./preloads";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SITE } from "./config/site";
// The error page's own stylesheet, linked only when an error is drawn (ErrorBoundary below).
import errorPageCss from "./error-page.css?url";

export const links: Route.LinksFunction = () => [
  // The wordmark preload, also sent as the Early Hints `Link` header (preloads.ts).
  ...PRELOADS.links,
  ...iconLinks(),
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3f4e5c" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* The page's one script tag: app/site.ts, bundled by vite.config.ts, which loads the page's islands. No React reaches the browser. */}
        <script src="/site.js" defer />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// The error path's title: "Page not found | BioScience Writers". A route's own meta is skipped when the page errors.
export function meta({ error }: Route.MetaArgs) {
  return error ? [{ title: errorTitle(error, SITE.name) }] : [];
}

// Capsomer's error page (404, 410 and 500 in plain words, noindex, the stack only in development) in the site's header
// and footer, so the skip link and landmarks stay. React hoists its stylesheet into the head.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <link rel="stylesheet" href={errorPageCss} precedence="default" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <ErrorPage error={error} home="/" className="flex-1" dev={import.meta.env.DEV} siteHeader={<Header />} siteFooter={<Footer />} />
    </div>
  );
}
