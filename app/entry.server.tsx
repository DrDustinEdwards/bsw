// The whole page is rendered before it is sent: the site ships no React to the browser (no <Scripts />),
// so there is nothing to stream toward. /site.js (app/site.ts) is the page's only script.
import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { renderToReadableStream } from "react-dom/server";
import { nonceContext } from "../workers/security-headers";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: RouterContextProvider,
) {
  const nonce = loadContext.get(nonceContext);

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} nonce={nonce} />,
    {
      nonce,
      onError(error: unknown) {
        responseStatusCode = 500;
        console.error(error);
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
