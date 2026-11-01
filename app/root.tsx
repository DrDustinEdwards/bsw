import {
  Links,
  Meta,
  Outlet,
} from "react-router";

import { iconLinks } from "@drdustinedwards/site-helpers/icons";
import { errorTitle, errorWords } from "capsomer/react/error-page";

import type { Route } from "./+types/root";
// Open Sans from the site's own origin (Fontsource, the files Google Fonts serves, bundled under /assets/): no
// stylesheet from fonts.googleapis.com blocking the first paint, and no second origin to connect to.
import "@fontsource-variable/open-sans/wght.css";
import "@fontsource-variable/open-sans/wght-italic.css";
import "./app.css";
import { PRELOADS } from "./preloads";
import { PrimaryButton } from "./components/ui";
import { PageHero } from "./components/PageHero";
import { SITE } from "./config/site";

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

// The error page in Capsomer's plain words (errorWords: 404, 410, a refusal, a server error), on BioScience Writers'
// own look, since the site keeps its client's brand rather than Capsomer's (.shared.json "waive"): laid out as an
// interior page is (PageHero's title band, then the content column every menu page uses). cap-error-page is the
// marker the live check reads for the shared error page. The stack shows only in development.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { status, title, text } = errorWords(error);
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;
  return (
    <main id="main" tabIndex={-1} className="cap-error-page" data-status={status}>
      {/* React hoists this into <head>: error pages are never indexed. */}
      <meta name="robots" content="noindex" />
      <PageHero title={title} />
      <section>
        <div className="page-prose mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
          <p>{import.meta.env.DEV && error instanceof Error ? error.message : text}</p>
          <p className="mt-8">
            {status >= 500 ? (
              // An empty href is this address: a reload that works with no script.
              <PrimaryButton href="" arrow={false} className="mr-3">
                Try again
              </PrimaryButton>
            ) : null}
            <PrimaryButton href="/">Go to the home page</PrimaryButton>
          </p>
          {stack && (
            <pre className="mt-8 w-full overflow-x-auto p-4 text-left text-sm">
              <code>{stack}</code>
            </pre>
          )}
        </div>
      </section>
    </main>
  );
}

