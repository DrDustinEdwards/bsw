// Each page's own share card (1200 x 630 PNG), drawn at build time from its title and description in app/config/pages.ts,
// in the site card's look (public/og-image.png): the cube mark and name, the page's title, its description, the
// four-color rule. Satori lays it out and resvg draws it, here in the build, so the Worker carries neither. vite.config.ts
// writes each to /og/<path>.png (app/config/site.ts shareCardPath); the home page keeps the site card.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori from "satori";
import type { Page } from "../app/config/pages.ts";

const require = createRequire(import.meta.url);
const font = (weight: number) => readFileSync(require.resolve(`@fontsource/open-sans/files/open-sans-latin-${weight}-normal.woff`));

/** The site card's colors (app/app.css: --color-band, the hex palette). */
const INK = "#2b3846";
const BLUE = "#006db7";
const GREEN = "#8dc63f";
const ORANGE = "#f58220";

/** The cube mark as the site card draws it: three faces of a cube, green on top. */
const CUBE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 112"><g stroke="#fff" stroke-width="4" stroke-linejoin="round"><path d="M50 4 96 30 50 56 4 30Z" fill="${GREEN}"/><path d="M4 30 50 56v52L4 82Z" fill="${BLUE}"/><path d="M96 30 50 56v52l46-26Z" fill="${ORANGE}"/></g></svg>`,
)}`;

type Node = { type: string; props: Record<string, unknown> & { children?: Node | Node[] | string } };
const el = (type: string, style: Record<string, unknown>, children?: Node | Node[] | string): Node => ({ type, props: { style, children } });

function card(page: Page): Node {
  // A long title steps down so it still fits two lines.
  const titleSize = page.title.length > 30 ? 64 : 84;
  return el("div", { width: 1200, height: 630, display: "flex", flexDirection: "column", fontFamily: "Open Sans", color: "#fff", backgroundImage: `linear-gradient(135deg, ${INK} 0%, #354351 55%, #2f516c 100%)` }, [
    el("div", { display: "flex", flexDirection: "column", flexGrow: 1, padding: "72px 96px 0" }, [
      el("div", { display: "flex", alignItems: "center", gap: 22 }, [
        { type: "img", props: { src: CUBE, width: 76, height: 85 } },
        el("div", { fontSize: 36, fontWeight: 700 }, "BioScience Writers"),
        el("div", { marginLeft: "auto", fontSize: 22, fontWeight: 400, letterSpacing: 3, color: GREEN }, "EST. 2001"),
      ]),
      el("div", { marginTop: 56, fontSize: titleSize, fontWeight: 800, lineHeight: 1.1 }, page.title),
      el("div", { marginTop: 32, maxWidth: 900, fontSize: 30, lineHeight: 1.45, color: "#d5dde5" }, page.description),
    ]),
    el("div", { height: 14, backgroundImage: `linear-gradient(90deg, #0771b1, ${GREEN}, ${ORANGE}, #ec2124)` }),
  ]);
}

let ready: Promise<void> | undefined;

/** One page's card as PNG bytes. */
export async function shareCard(page: Page): Promise<Uint8Array> {
  ready ??= initWasm(readFileSync(require.resolve("@resvg/resvg-wasm/index_bg.wasm")));
  await ready;
  const fonts = [400, 700, 800].map((weight) => ({ name: "Open Sans", data: font(weight), weight: weight as 400 | 700 | 800, style: "normal" as const }));
  const svg = await satori(card(page) as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
