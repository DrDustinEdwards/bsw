// The whole page is rendered before it is sent: the site ships no React to the browser (no <Scripts />),
// so there is nothing to stream toward. /site.js (app/site.ts) is the page's one script tag; it loads the islands
// (app/islands/) a page names.
import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { renderToReadableStream } from "react-dom/server";
import { logEvent, requestFields } from "@dustinedwards/site-runtime/log";
import { getNonce } from "@dustinedwards/site-runtime/context";

// React Router prints every route error, so each scanner 404 wrote a stack trace; a route 404 is counted, not logged.
export { handleServerError as handleError } from "@dustinedwards/site-runtime/log";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: RouterContextProvider,
) {
  const nonce = getNonce(loadContext);

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} nonce={nonce} />,
    {
      nonce,
      onError(error: unknown) {
        responseStatusCode = 500;
        logEvent("render_failed", { ...requestFields(request), error }, { level: "error" });
      },
    },
  );
  await body.allReady;

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
