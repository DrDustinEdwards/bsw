import { Menu } from "lucide-react";
import { SiteHeader } from "capsomer/react/site-header";
import { slugify } from "@drdustinedwards/site-helpers/slug";
import { primaryNav } from "../data/nav";
import { Wordmark } from "./Logo";

// Capsomer's site header, written by the server for app/site.ts to wire (hydrate={false}: no React reaches the
// browser). Its look is bsw's, set by the --header-* tokens in app.css; the site has one theme, so no theme button.
export function Header() {
  return (
    <SiteHeader
      hydrate={false}
      theme={false}
      translucent
      links="center"
      collapse="lg"
      sheetIcons="auto"
      menuIcon={<Menu aria-hidden="true" />}
      skipTo="#main"
      logo={{
        href: "/",
        label: "BioScience Writers",
        name: "BioScience Writers home",
        wordmark: <Wordmark />,
      }}
      sections={primaryNav.map((group) => ({
        id: slugify(group.label), // its panel's id
        label: group.label,
        groups: [{ links: group.links }],
      }))}
      extras={[
        {
          id: "quote",
          label: "Get a Quote",
          kind: "button",
          href: "/pricing",
          className: "btn btn-blue btn-sm",
        },
      ]}
    />
  );
}
