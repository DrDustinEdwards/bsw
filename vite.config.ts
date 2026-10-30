import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { siteScript } from "@dustinedwards/devkit/vite/site-script";
import { headersFile } from "@dustinedwards/site-runtime/headers";
import { defineConfig, type Plugin } from "vite";
import { PRE_LAUNCH_HEADERS, SECURITY_HEADERS } from "./workers/security-headers.ts";

/** Hashed files (Vite's /assets/, devkit siteScript's /islands/) never change; /site.js is not hashed. */
const IMMUTABLE = { "Cache-Control": "public, max-age=31536000, immutable" };

/**
 * Static files are served without the Worker, so the built client gets a `_headers` file holding the Worker's own set
 * (site-runtime headersFile; the page policy stays the Worker's) and the cache rules.
 */
function staticHeaders(): Plugin {
  return {
    name: "bsw-static-headers",
    apply: "build",
    generateBundle() {
      if (this.environment.name !== "client") return;
      const source = headersFile({ ...SECURITY_HEADERS, ...PRE_LAUNCH_HEADERS }, { paths: { "/assets/*": IMMUTABLE, "/islands/*": IMMUTABLE } });
      this.emitFile({ type: "asset", fileName: "_headers", source });
    },
  };
}

export default defineConfig({
  plugins: [
    siteScript(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    staticHeaders(),
  ],
  // The Worker bundle; Vite leaves SSR output unminified by default.
  environments: { ssr: { build: { minify: true } } },
  resolve: {
    tsconfigPaths: true,
  },
});
