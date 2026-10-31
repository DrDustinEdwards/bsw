import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "../data/nav";
import { Wordmark } from "./Logo";
import { PrimaryButton } from "./ui";

// A stable id for a nav group's panel, for aria-controls.
function groupId(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// Server-rendered closed; app/site.ts (enhanceHeader) opens the dropdowns and the phone drawer,
// and switches the bar's border once the page scrolls.
export function Header() {
  return (
    <header
      data-header
      className="sticky top-0 z-50 border-b border-transparent bg-white/70 backdrop-blur transition-colors duration-300"
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
              data-nav-group
            >
              <button
                type="button"
                aria-expanded="false"
                aria-controls={`nav-${groupId(group.label)}`}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
              >
                {group.label}
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className="transition-transform"
                  aria-hidden="true"
                />
              </button>
              <div
                id={`nav-${groupId(group.label)}`}
                className="invisible absolute left-0 top-full w-64 -translate-y-1 pt-2 opacity-0 transition-all duration-150"
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
          <PrimaryButton
            href="/pricing"
            arrow={false}
            className="btn-sm hidden sm:inline-flex"
          >
            Get a Quote
          </PrimaryButton>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-nav"
            data-menu-toggle
          >
            <Menu size={24} strokeWidth={2} aria-hidden="true" data-icon="open" />
            <X size={24} strokeWidth={2} aria-hidden="true" data-icon="close" className="hidden" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-nav" hidden className="border-t border-slate-200 bg-white lg:hidden">
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
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <PrimaryButton
              href="/pricing"
              arrow={false}
              className="mt-4 w-full"
            >
              Get a Quote
            </PrimaryButton>
          </nav>
      </div>
    </header>
  );
}
