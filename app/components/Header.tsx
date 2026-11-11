import { SiteHeader } from "capsomer/react/site-header";
import { primaryNav } from "../data/nav";
import { Wordmark } from "./Logo";

// Capsomer's site header, server-rendered: the sticky bar (clear at the top of the page, its band once stuck, by a
// scroll-state query), the dropdowns, the phone sheet and the skip link. app/site.ts wires them with `enhance`; no
// React reaches the browser. Each group is a dropdown of its links.
export function Header() {
  return (
    <SiteHeader
      hydrate={false}
      logo={{ href: "/", label: "BioScience Writers", wordmark: <Wordmark /> }}
      sections={primaryNav.map((group) => ({
        id: group.label.toLowerCase(),
        label: group.label,
        groups: [{ links: group.links }],
      }))}
      extras={[{ id: "quote", label: "Get a Quote", kind: "button", href: "/pricing" }]}
      theme={false}
      rest="clear"
      translucent
      skipTo="#main"
      sheetTitle="Menu"
    />
  );
}
