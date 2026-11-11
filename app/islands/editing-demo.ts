/*
  Interactive behavior for the Precision Editing demo, an island (devkit's
  startIslands, app/site.ts) the home page loads as the demo nears the
  viewport. The demo's document text is server-rendered in EditingDemo.tsx for
  crawlers; this adds only the behavior. It lives as long as the page, so it
  needs no cleanup.

  The view switcher is Capsomer's tabs (the pill: click, drag, arrows, Home and
  End); each change sets the layout's data-tab, which shows or folds the
  comments column, and clears the lit cards.
*/
import { enhance } from "capsomer/behavior/tabs";

export default function initEditingDemo(root: HTMLElement): void {
  const layout = root.querySelector<HTMLElement>("#psms-layout");
  if (!layout) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior: ScrollBehavior = reduce ? "auto" : "smooth";

  function clearAll() {
    root
      .querySelectorAll(".psms-card-lit,.psms-lit")
      .forEach((el) => el.classList.remove("psms-card-lit", "psms-lit"));
  }

  root.addEventListener("cap:tabs-change", (e) => {
    const panel = (e as CustomEvent<{ panel: HTMLElement | null }>).detail.panel;
    if (!panel) return;
    layout.dataset.tab = panel.id.replace("psms-panel-", "");
    clearAll();
  });
  enhance(root);

  function activateCard(card: HTMLElement) {
    const id = card.getAttribute("data-comment");
    const already = card.classList.contains("psms-card-lit");
    clearAll();
    if (already) return;
    card.classList.add("psms-card-lit");
    const panel = root.querySelector(".psms-tab-panel:not([hidden])") as HTMLElement | null;
    if (!panel) return;
    const targets = panel.querySelectorAll(
      '[data-highlight="' + id + '"]',
    ) as NodeListOf<HTMLElement>;
    if (!targets.length) return;
    targets.forEach((el) => el.classList.add("psms-lit"));
    const box = panel.querySelector(".psms-scroll-box") as HTMLElement | null;
    if (box && targets[0]) {
      box.scrollTo({
        top:
          targets[0].getBoundingClientRect().top -
          box.getBoundingClientRect().top +
          box.scrollTop -
          40,
        behavior: scrollBehavior,
      });
    }
    const col = root.querySelector("#psms-comments-scroll") as HTMLElement | null;
    if (col) {
      col.scrollTo({
        top:
          card.getBoundingClientRect().top - col.getBoundingClientRect().top + col.scrollTop - 60,
        behavior: scrollBehavior,
      });
    }
  }

  function onClick(e: Event) {
    const target = e.target as HTMLElement;
    const card = target.closest(".psms-card") as HTMLElement | null;
    if (card) {
      activateCard(card);
      return;
    }
    const hl = target.closest("[data-highlight]") as HTMLElement | null;
    if (hl) {
      const m = root.querySelector(
        '.psms-card[data-comment="' + hl.getAttribute("data-highlight") + '"]',
      ) as HTMLElement | null;
      if (m) activateCard(m);
    }
  }
  root.addEventListener("click", onClick);
}
