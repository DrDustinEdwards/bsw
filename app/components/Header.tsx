import { SiteHeader } from "capsomer/react/site-header";
import { primaryNav } from "../data/nav";
import { Wordmark } from "./Logo";

// A stable id for a nav group, for its panel's id.
function groupId(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// Capsomer's site header, written by the server for app/site.ts to wire (hydrate={false}: no React reaches the
// browser). Its look is bsw's, set by the --header-* tokens in app.css; the site has one theme, so no theme button.
export function Header() {
  return (
    <SiteHeader
      hydrate={false}
      theme={false}
      translucent
      links="center"
      skipTo="#main"
      logo={{
        href: "/",
        label: "BioScience Writers",
        wordmark: <Wordmark />,
      }}
      sections={primaryNav.map((group) => ({
        id: groupId(group.label),
        label: group.label,
        groups: [{ links: group.links }],
      }))}
      extras={[{ id: "quote", label: "Get a Quote", kind: "button", href: "/pricing" }]}
    />
  );
}
