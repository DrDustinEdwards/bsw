import { copyright } from "capsomer/behavior/family-footer";
import { useState } from "react";
import { SITE } from "../config/site";
import { footerGroups } from "../data/nav";
import { sitePicture } from "../lib/media/images";
import { Icon } from "capsomer/react/icons";
import { Picture } from "capsomer/react/picture";

// Real BioScience Writers social profiles, on brand-colored square tiles to match the reference footer. The marks
// are Capsomer's icons.
const social = [
  {
    name: "facebook",
    label: "Facebook",
    href: SITE.social.facebook,
    color: "var(--color-social-facebook)",
  },
  { name: "x", label: "X", href: SITE.social.x, color: "var(--color-social-x)" },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: SITE.social.linkedin,
    color: "var(--color-social-linkedin)",
  },
] as const;

export function Footer() {
  // Read once, in a lazy initializer, so the render itself stays pure (react/purity).
  const [line] = useState(() => copyright(SITE.legalName));
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          {/* Link columns: Services, Company, Legal and Support */}
          {footerGroups.map((group) => (
            <div key={group.label}>
              <h3 className="site-footer-heading">{group.label}</h3>
              <ul className="site-footer-links">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="site-footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Logo + social */}
          <div className="site-footer-brand">
            <div className="site-footer-mark-row">
              <Picture
                picture={sitePicture(
                  { src: "/brand/bsw-cube-mark-88.f455c15f.webp", width: 88, height: 88 },
                  "mark",
                  { alt: "", className: "site-footer-mark" },
                )}
              />
              <span className="site-footer-name">{SITE.name}</span>
            </div>
            <div className="site-footer-social">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="site-footer-social-link"
                  style={{ backgroundColor: s.color }}
                >
                  <Icon name={s.name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="site-footer-legal">{line}. All rights reserved.</p>
      </div>
    </footer>
  );
}
