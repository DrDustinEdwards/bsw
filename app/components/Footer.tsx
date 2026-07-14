import { footerGroups } from "../data/nav";

const social = [
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.5-1.5h1.6V3.6C17.8 3.55 16.9 3.5 15.8 3.5c-2.3 0-3.9 1.4-3.9 4v2.4H9.2V13h2.7v8z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.9 3.5h2.9l-6.35 7.26L22 20.5h-5.9l-4.6-6-5.3 6H3.3l6.8-7.77L2.7 3.5h6.05l4.16 5.5zm-1 15.24h1.6L8.2 5.16H6.5z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.5h3.3V21H3.5zm5.6 0h3.16v1.7h.05c.44-.83 1.5-1.7 3.1-1.7 3.32 0 3.93 2.18 3.93 5v6.5h-3.3v-5.76c0-1.37-.02-3.14-1.9-3.14-1.92 0-2.2 1.5-2.2 3.04V21H9.1z",
  },
];

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-footer)] text-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/brand/bsw-cube-mark.png"
                alt=""
                className="h-9 w-auto"
              />
              <span className="font-display text-lg font-semibold text-white">
                BioScience Writers
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Strategic grant review and manuscript editing by PhD and MD
              experts. Helping researchers secure funding and publish since
              2001.
            </p>
            <div className="mt-5 flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition-colors hover:bg-brand hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                {group.label}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>Copyright BioScience Writers LLC. All rights reserved.</p>
          <p>Terminal-degree editors. 100% satisfaction guarantee.</p>
        </div>
      </div>
    </footer>
  );
}
