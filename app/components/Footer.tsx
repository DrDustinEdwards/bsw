import { SITE } from "../config/site";
import { footerGroups } from "../data/nav";
import { sitePicture } from "../lib/media/images";
import { Picture } from "./Picture";

// Real BioScience Writers social profiles, with brand-colored square tiles to
// match the reference footer. Brand glyph paths (Lucide has no brand icons).
const social = [
  {
    label: "Facebook",
    href: SITE.social.facebook,
    color: "var(--color-social-facebook)",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.5-1.5h1.6V3.6C17.8 3.55 16.9 3.5 15.8 3.5c-2.3 0-3.9 1.4-3.9 4v2.4H9.2V13h2.7v8z",
  },
  {
    label: "X",
    href: SITE.social.x,
    color: "var(--color-social-x)",
    path: "M17.9 3.5h2.9l-6.35 7.26L22 20.5h-5.9l-4.6-6-5.3 6H3.3l6.8-7.77L2.7 3.5h6.05l4.16 5.5zm-1 15.24h1.6L8.2 5.16H6.5z",
  },
  {
    label: "LinkedIn",
    href: SITE.social.linkedin,
    color: "var(--color-social-linkedin)",
    path: "M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.5h3.3V21H3.5zm5.6 0h3.16v1.7h.05c.44-.83 1.5-1.7 3.1-1.7 3.32 0 3.93 2.18 3.93 5v6.5h-3.3v-5.76c0-1.37-.02-3.14-1.9-3.14-1.92 0-2.2 1.5-2.2 3.04V21H9.1z",
  },
];

export function Footer() {
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
              <Picture {...sitePicture({ src: "/brand/bsw-cube-mark-88.f455c15f.webp", width: 88, height: 88 }, "mark", { alt: "", className: "h-11 w-auto" })} />
              <span className="font-display text-xl font-semibold text-white">
                {SITE.name}
              </span>
            </div>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-opacity hover:opacity-85"
                  style={{ backgroundColor: s.color }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-14 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
