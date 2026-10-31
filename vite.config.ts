import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { siteScript } from "@dustinedwards/devkit/vite/site-script";
import { defineConfig, type Plugin } from "vite";
import { PAGES, shareCardPath } from "./app/config/pages.ts";
import { shareCard } from "./scripts/share-cards.ts";

// public/_headers is written before the build by site-runtime-headers from the registry entry (npm run headers).

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
    shareCards(),
  ],
  // The Worker bundle; Vite leaves SSR output unminified by default.
  environments: { ssr: { build: { minify: true } } },
  resolve: {
    tsconfigPaths: true,
  },
});
