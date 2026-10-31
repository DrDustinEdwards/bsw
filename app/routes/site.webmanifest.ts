// /site.webmanifest: Prelum's webManifest, pointing at the icons in public/.
import { webManifest } from "@drdustinedwards/site-helpers/icons";
import { SITE } from "../config/site";

export function loader() {
  const manifest = webManifest({ name: SITE.name, description: SITE.description, themeColor: "#0066a1", backgroundColor: "#0066a1", lang: "en" });
  return new Response(JSON.stringify(manifest), { headers: { "Content-Type": "application/manifest+json; charset=utf-8" } });
}
