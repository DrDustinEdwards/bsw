import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
} from "react-router";

import type { Route } from "./+types/root";
// Open Sans from the site's own origin (Fontsource, the files Google Fonts serves, bundled under /assets/): no
// stylesheet from fonts.googleapis.com blocking the first paint, and no second origin to connect to.
import "@fontsource-variable/open-sans/wght.css";
import "@fontsource-variable/open-sans/wght-italic.css";
import "./app.css";
import { PRELOADS } from "./preloads";

export const links: Route.LinksFunction = () => [
  // The wordmark preload, also sent as the Early Hints `Link` header (preloads.ts).
  ...PRELOADS.links,
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "apple-touch-icon", href: "/brand/apple-touch-icon-180.e581bbfc.png", sizes: "180x180" },
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      {/* React hoists this into <head>: error pages are never indexed. */}
      <meta name="robots" content="noindex" />
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
