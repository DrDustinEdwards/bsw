// Everything the page does in the browser, without a framework, bundled into /site.js by vite.config.ts.
// Each part finds its server-rendered markup by a data- attribute and does nothing on a page without it.
// The FAQ needs no script: it is native <details> (Faq.tsx).
import { DOT_OFF, DOT_ON } from "./components/carousel";
import { initEditingDemo } from "./components/editingDemoBehavior";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function swap(el: Element, off: string, on: string, state: boolean) {
  el.classList.remove(...(state ? off : on).split(" "));
  el.classList.add(...(state ? on : off).split(" "));
}

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

/*
  Hero hexagons. Source spec: clip-path hexagon, height = size * 1.15, four colors cycling
  (blue, green, orange, white), 24 on desktop and 12 on a phone, randomized once per page view:
  size 45-89px, top 0-90%, left 0-95%, duration 25-44s, delay -(0-29)s. The drift keyframes live in
  app.css (@keyframes hex-drift), which also halts them under prefers-reduced-motion. The animation
  pauses while the hero is offscreen.
*/
const HEX_CLIP = "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)";
// Fairly solid fills from the mark palette tokens (app.css), so the hexagons stay in sync with the logo.
const HEX_COLORS = [
  "color-mix(in srgb, var(--color-hex-blue) 78%, transparent)",
  "color-mix(in srgb, var(--color-hex-green) 78%, transparent)",
  "color-mix(in srgb, var(--color-hex-orange) 78%, transparent)",
  "rgba(255,255,255,0.85)",
];

function enhanceHexField() {
  const field = document.querySelector<HTMLElement>("[data-hexfield]");
  if (!field) return;
  const count = window.matchMedia("(max-width: 767px)").matches ? 12 : 24;
  const hexes: HTMLElement[] = [];
  for (let i = 0; i < count; i++) {
    const size = 45 + Math.random() * (89 - 45);
    const hex = document.createElement("span");
    hex.className = "hex absolute";
    Object.assign(hex.style, {
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 95}%`,
      width: `${size}px`,
      height: `${size * 1.15}px`,
      background: HEX_COLORS[i % HEX_COLORS.length],
      clipPath: HEX_CLIP,
      animation: `hex-drift ${25 + Math.random() * (44 - 25)}s ease-in-out ${-(Math.random() * 29)}s infinite`,
    });
    hexes.push(hex);
  }
  for (const hex of hexes) field.appendChild(hex);
  new IntersectionObserver(([entry]) => {
    for (const hex of hexes) hex.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
  }).observe(field);
}

// Testimonials: arrows and dots move the track a slide at a time, wrapping at either end.
function enhanceCarousel() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-carousel]")) {
    const track = root.querySelector<HTMLElement>("[data-track]")!;
    const dots = [...root.querySelectorAll<HTMLElement>("[data-dot]")];
    let page = 0;
    const go = (to: number) => {
      page = (to + dots.length) % dots.length;
      track.style.transform = `translateX(-${page * 100}%)`;
      dots.forEach((dot, i) => {
        dot.setAttribute("aria-current", String(i === page));
        swap(dot.firstElementChild!, DOT_OFF, DOT_ON, i === page);
      });
    };
    for (const arrow of root.querySelectorAll<HTMLElement>("[data-dir]")) {
      arrow.addEventListener("click", () => go(page + Number(arrow.dataset.dir)));
    }
    dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));
  }
}

/*
  Process timeline: the fill line grows from 0 to (container height - circle size) once the timeline
  scrolls into view, through the 6s height transition in app.css, and is recomputed on resize. Under
  prefers-reduced-motion it is drawn at full height with no animation.
*/
function enhanceTimeline() {
  const container = document.querySelector<HTMLElement>("[data-timeline]");
  const fill = container?.querySelector<HTMLElement>(".timeline-line-fill");
  if (!container || !fill) return;
  const circleSize = () => (window.matchMedia("(max-width: 768px)").matches ? 48 : 64);
  const grow = () => {
    fill.style.height = `${container.offsetHeight - circleSize()}px`;
  };
  if (reduceMotion) {
    fill.style.transition = "none";
    grow();
    return;
  }
  let resizeTimer: ReturnType<typeof setTimeout>;
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    grow();
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(grow, 150);
    });
  });
  io.observe(container);
}

enhanceHeader();
enhanceReveal();
enhanceHexField();
enhanceCarousel();
enhanceTimeline();
const demo = document.querySelector<HTMLElement>("[data-editing-demo]");
if (demo) initEditingDemo(demo);
