// Pins the CSP script-src and connect-src entries in workers/app.ts.
// Run: node --test tests/csp.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../workers/app.ts", import.meta.url), "utf8");
const directive = (name) =>
  src.match(new RegExp(`"(${name} [^"]*)"`))?.[1];

test("script-src allows the Cloudflare Web Analytics beacon", () => {
  assert.equal(
    directive("script-src"),
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  );
});

test("connect-src stays 'self' (automatic injection reports to /cdn-cgi/rum)", () => {
  assert.equal(directive("connect-src"), "connect-src 'self'");
});
