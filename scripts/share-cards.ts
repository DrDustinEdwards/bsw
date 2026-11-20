// Each page's share card (1200 x 630 PNG), drawn at build time from app/config/pages.ts with site-runtime's card layout and
// Takumi's native build (the Worker's renderer is WebAssembly and would add megabytes); vite.config.ts writes each to /og/<path>.png.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import {
  cardLayout,
  renderShareCard,
  type ShareCardDraw,
} from "@dustinedwards/site-runtime/share-card";
import { render } from "takumi-js";
import type { Page } from "../app/config/pages.ts";

const require = createRequire(import.meta.url);
const draw: ShareCardDraw = (html, { width, height, fonts }) =>
  render(html, { width, height, fonts: fonts as never });
const font = (weight: 400 | 600) => ({
  name: "Open Sans",
  data: readFileSync(
    require.resolve(`@fontsource/open-sans/files/open-sans-latin-${weight}-normal.woff`),
  ),
  weight,
  style: "normal",
});

const INK = "#2b3846";
const BLUE = "#006db7";
const GREEN = "#8dc63f";
const ORANGE = "#f58220";

const CUBE = `<svg xmlns="http://www.w3.org/2000/svg" width="76" height="85" viewBox="0 0 100 112"><g stroke="#fff" stroke-width="4" stroke-linejoin="round"><path d="M50 4 96 30 50 56 4 30Z" fill="${GREEN}"/><path d="M4 30 50 56v52L4 82Z" fill="${BLUE}"/><path d="M96 30 50 56v52l46-26Z" fill="${ORANGE}"/></g></svg>`;

export async function pageCard(page: Page): Promise<Uint8Array> {
  const html = cardLayout({
    brand: "BioScience Writers",
    title: page.title,
    description: page.description,
    footer: "Est. 2001",
    mark: CUBE,
    colors: {
      ground: `linear-gradient(135deg, ${INK} 0%, #354351 55%, #2f516c 100%)`,
      ink: "#ffffff",
      muted: "#d5dde5",
      band: INK,
      bandInk: "#ffffff",
      accent: GREEN,
    },
    fontFamily: "Open Sans",
  });
  const card = await renderShareCard(draw, html, { fonts: [font(400), font(600)] });
  if (!card) throw new Error(`share card for ${page.path} failed to draw`);
  return new Uint8Array(await card.arrayBuffer());
}
