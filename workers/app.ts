import { applyHeaderSet } from "@dustinedwards/site-runtime/headers";
import { createRequestHandler } from "react-router";
import { SECURITY_HEADERS } from "./security-headers";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request) {
    const response = await requestHandler(request);
    // Attach security headers without disturbing the (possibly streaming) body.
    const headers = new Headers(response.headers);
    applyHeaderSet(headers, SECURITY_HEADERS);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
