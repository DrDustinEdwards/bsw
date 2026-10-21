import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
  ],
  // The Worker bundle; Vite leaves SSR output unminified by default.
  environments: { ssr: { build: { minify: true } } },
  resolve: {
    tsconfigPaths: true,
  },
});
