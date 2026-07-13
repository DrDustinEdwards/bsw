import { useEffect, useState } from "react";
import { primaryNav } from "../data/nav";
import { Wordmark } from "./Logo";

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/90 backdrop-blur"
          : "border-transparent bg-white/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="/" className="shrink-0" aria-label="BioScience Writers home">
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <button
                type="button"
                aria-expanded={openGroup === group.label}
                onClick={() =>
                  setOpenGroup((g) => (g === group.label ? null : group.label))
                }
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
              >
                {group.label}
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${
                    openGroup === group.label ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 4.5 6 8l3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`absolute left-0 top-full w-64 pt-2 transition-all duration-150 ${
                  openGroup === group.label
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-slate-50 hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/pricing/"
            className="hidden rounded-[var(--radius-btn)] bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-hover sm:inline-block"
          >
            Get a Quote
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-6xl px-5 py-4">
            {primaryNav.map((group) => (
              <div key={group.label} className="border-b border-slate-100 py-3 last:border-0">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand">
                  {group.label}
                </p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block py-2 text-[0.95rem] text-ink"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="/pricing/"
              className="mt-4 block rounded-[var(--radius-btn)] bg-brand px-4 py-3 text-center text-sm font-bold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
