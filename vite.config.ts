import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { siteScript } from "@dustinedwards/devkit/vite/site-script";
import { writeFileSync } from "node:fs";
import { headersFile } from "@dustinedwards/site-runtime/headers";
import { SHARE_CARD_HEADERS } from "@dustinedwards/site-runtime/share-card";
import { defineConfig, type Plugin } from "vite";
import { PRE_LAUNCH_HEADERS, SECURITY_HEADERS } from "./workers/security-headers.ts";
import { PAGES, shareCardPath } from "./app/config/pages.ts";
import { shareCard } from "./scripts/share-cards.ts";

/**
 * Hashed files (Vite's /assets/, devkit siteScript's /islands/, and the photographs, whose names carry their content
 * hash, such as bsw-logo-web.2a9980c8.webp) never change; /site.js is not hashed.
 */
const IMMUTABLE = { "Cache-Control": "public, max-age=31536000, immutable" };

/**
 * Static files are served without the Worker, so every build rewrites public/_headers (committed, so the family check
 * reads its cache rules) from the Worker's own set with site-runtime headersFile; the page policy stays the Worker's.
 */
function staticHeaders(): Plugin {
  return {
    name: "bsw-static-headers",
    apply: "build",
    buildStart() {
      if (this.environment.name !== "client") return;
      const file = headersFile(
        { ...SECURITY_HEADERS, ...PRE_LAUNCH_HEADERS },
        { comment: "Written by vite.config.ts on every build from workers/security-headers.ts; do not edit.", charset: true, paths: {
          "/assets/*": IMMUTABLE,
          "/islands/*": IMMUTABLE,
          "/brand/*": IMMUTABLE,
          "/team/*": IMMUTABLE,
          "/services/*": IMMUTABLE,
          // Share cards are fetched by other sites' crawlers and previews (CORP cross-origin).
          "/og-image.png": SHARE_CARD_HEADERS,
          "/og/*": SHARE_CARD_HEADERS,
        },
      },
      );
      writeFileSync("public/_headers", file);
    },
  };
}

/** Each page's share card but the home page's (scripts/share-cards.ts), written into the client build at /og/<path>.png. */
function shareCards(): Plugin {
  return {
    name: "bsw-share-cards",
    apply: "build",
    async generateBundle() {
      if (this.environment.name !== "client") return;
      for (const page of PAGES.filter((p) => p.path !== "/")) {
        this.emitFile({ type: "asset", fileName: shareCardPath(page.path).slice(1), source: await shareCard(page) });
      }
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
    shareCards(),
  ],
  // The Worker bundle; Vite leaves SSR output unminified by default.
  environments: { ssr: { build: { minify: true } } },
  resolve: {
    tsconfigPaths: true,
  },
});
