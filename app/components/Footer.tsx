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
  const [year] = useState(() => new Date().getFullYear());
  return (
    <footer className="bg-[color:var(--color-footer)] text-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Link columns: Services, Company, Legal and Support */}
          {footerGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {group.label}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[0.95rem] text-slate-200 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Logo + social */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2.5">
              <Picture
                picture={sitePicture(
                  { src: "/brand/bsw-cube-mark-88.f455c15f.webp", width: 88, height: 88 },
                  "mark",
                  { alt: "", className: "size-11" },
                )}
              />
              <span className="font-display text-xl font-semibold text-white">{SITE.name}</span>
            </div>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-opacity hover:opacity-85 [--icon-size:18px]"
                  style={{ backgroundColor: s.color }}
                >
                  <Icon name={s.name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-14 text-center text-sm text-slate-400">
          &copy; {year} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
