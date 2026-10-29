// What every page does in the browser, without a framework, bundled into /site.js by vite.config.ts.
// Each part finds its server-rendered markup by a data- attribute and does nothing on a page without it.
// The FAQ needs no script: it is native <details> (Faq.tsx).
//
// What only some pages use is an island (app/islands/, devkit's siteScript bundles each to /islands/<name>.js):
// the home page's hex field, testimonials carousel, timeline and editing demo. startIslands loads one only
// where an element names it with data-island, so the other pages never download them.
import { startIslands } from "@dustinedwards/devkit/islands";
import { swap } from "./swap";

// The sticky bar's border once the page scrolls, the desktop dropdowns and the phone drawer.
function enhanceHeader() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;
  const onScroll = () =>
    swap(header, "border-transparent bg-white/70", "border-slate-200 bg-white/90", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const groups = [...header.querySelectorAll<HTMLElement>("[data-nav-group]")];
  const setOpen = (group: HTMLElement, open: boolean) => {
    const button = group.querySelector("button")!;
    button.setAttribute("aria-expanded", String(open));
    button.querySelector("svg")?.classList.toggle("rotate-180", open);
    const panel = document.getElementById(button.getAttribute("aria-controls")!)!;
    swap(panel, "invisible -translate-y-1 opacity-0", "visible translate-y-0 opacity-100", open);
  };
  for (const group of groups) {
    const button = group.querySelector("button")!;
    const others = (open: boolean) => groups.forEach((g) => setOpen(g, g === group && open));
    group.addEventListener("mouseenter", () => others(true));
    group.addEventListener("mouseleave", () => setOpen(group, false));
    button.addEventListener("click", () => others(button.getAttribute("aria-expanded") !== "true"));
    group.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setOpen(group, false);
        button.focus();
      }
    });
  }

  const toggle = header.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const drawer = document.getElementById("mobile-nav");
  if (!toggle || !drawer) return;
  toggle.addEventListener("click", () => {
    const open = drawer.hidden;
    drawer.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.querySelector('[data-icon="open"]')?.classList.toggle("hidden", open);
    toggle.querySelector('[data-icon="close"]')?.classList.toggle("hidden", !open);
    // Lock the page behind the open drawer.
    document.body.style.overflow = open ? "hidden" : "";
  });
}

// Sections fade and drop into place the first time they scroll into view.
function enhanceReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of document.querySelectorAll(".reveal")) io.observe(el);
}

enhanceHeader();
enhanceReveal();
startIslands();
