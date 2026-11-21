import { ErrorPage, errorTitle } from "capsomer/react/error-page";
import { ProsePageHead } from "capsomer/react/prose-page";

import { SITE } from "../config/site";

// The error page is Capsomer's, on BioScience Writers' own look, since the site keeps its client's brand rather than
// Capsomer's (.shared.json "waive"): `hero` is the title band of an interior page (Capsomer's prose-page head, since
// the error page brings its own body), then the sentence and the ways out follow in the page's
// column. The stack shows only in development. Inside the layout's main it is a div, so the page keeps one main.
export function SiteError({ error, as }: { error: unknown; as?: "main" | "div" }) {
  return (
    <ErrorPage
      error={error}
      home="/"
      as={as}
      dev={import.meta.env.DEV}
      hero={({ title }) => <ProsePageHead title={title} />}
    />
  );
}

/** The title on the error path (WCAG 2.4.2). */
export function siteErrorMeta(error: unknown) {
  return error ? [{ title: errorTitle(error, SITE.name) }] : [];
}
