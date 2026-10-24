// Every security header bsw sends, in one place; workers/app.ts applies it to every response.
import { buildSecurityHeaders } from "@dustinedwards/site-runtime/headers";
import { buildContentSecurityPolicy } from "@dustinedwards/site-runtime/csp";
import { createContext } from "react-router";

export const CSP_REPORT_PATH = "/csp-report";
export const CSP_REPORT_GROUP = "csp-endpoint";

// The house set (OWASP defaults); the CSP is per request, below.
export const SECURITY_HEADERS = buildSecurityHeaders();

/*
  First-party except Google Fonts and the analytics beacon. Pages are rendered
  per request and never shared-cached, so React Router's inline scripts carry
  this request's nonce, which app/entry.server.tsx reads from nonceContext.
  Style attributes, which a nonce cannot cover, get style-src-attr.
*/
export const nonceContext = createContext<string>();

export function contentSecurityPolicy(nonce: string) {
  return buildContentSecurityPolicy({
    nonce,
    sources: {
      img: ["data:"],
      style: ["https://fonts.googleapis.com"],
      font: ["https://fonts.gstatic.com"],
    },
    styleAttributesInline: true,
    cloudflareWebAnalytics: true,
    extraDirectives: ["manifest-src 'self'", "upgrade-insecure-requests"],
    reportUri: CSP_REPORT_PATH,
    reportTo: CSP_REPORT_GROUP,
  });
}
