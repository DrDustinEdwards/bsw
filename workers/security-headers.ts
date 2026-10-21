// Every security header bsw sends, in one place; workers/app.ts applies it to every response.
import { buildSecurityHeaders } from "@dustinedwards/site-runtime/headers";

/*
  Content Security Policy. The site is first-party except Google Fonts and the
  analytics beacon.
  'unsafe-inline' is required for scripts (React Router injects an inline
  hydration script) and for styles (React inline style attributes plus the
  Google Fonts stylesheet). The Cloudflare Web Analytics beacon, injected at
  the edge from static.cloudflareinsights.com, is allowed in script-src; it
  reports to the site's own /cdn-cgi/rum, so connect-src stays 'self'.
  Everything else is locked to 'self'.
*/
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data:",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

// The house set (OWASP defaults) plus this site's CSP, which stays hand-written:
// the shared builder refuses 'unsafe-inline' in script-src.
export const SECURITY_HEADERS = {
  ...buildSecurityHeaders(),
  "Content-Security-Policy": CSP,
};
