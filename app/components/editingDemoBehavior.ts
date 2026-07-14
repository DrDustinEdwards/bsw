/*
  Interactive behavior for the Precision Editing demo, split into its own module
  so it can be dynamically imported after first paint (code-split out of the
  home route chunk). The demo's document text is server-rendered in
  EditingDemo.tsx for crawlers; only this drag/keyboard/link behavior is
  deferred. Returns a cleanup function.

  Accessibility: the glass pill switcher is exposed as an ARIA tablist. The
  three views are tabs with roving tabindex, arrow-key / Home / End navigation,
  and aria-selected, in addition to the pointer drag interaction.
*/
export function initEditingDemo(root: HTMLDivElement): () => void {
  const TABS = 3;
  const TAB_NAMES = ["original", "simple", "all"];
  let current = 1;

  const layout = root.querySelector("#psms-layout") as HTMLElement;
  const track = root.querySelector("#psms-track") as HTMLElement;
  const pill = root.querySelector("#psms-pill") as HTMLElement;
  const labels = Array.from(
    track?.querySelectorAll(".psms-track-label") ?? [],
  ) as HTMLElement[];
  if (!layout || !track || !pill || labels.length !== TABS) return () => {};

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior: ScrollBehavior = reduce ? "auto" : "smooth";

  // ARIA wiring for the switcher.
  track.setAttribute("role", "tablist");
  track.setAttribute("aria-label", "Markup view");
  labels.forEach((l, i) => {
    l.setAttribute("role", "tab");
    l.setAttribute("aria-selected", i === current ? "true" : "false");
    l.setAttribute("tabindex", i === current ? "0" : "-1");
    l.style.pointerEvents = "auto";
    l.style.cursor = "pointer";
  });

  function setActive(idx: number) {
    labels.forEach((l, i) => {
      const on = i === idx;
      l.classList.toggle("psms-active", on);
      l.setAttribute("aria-selected", on ? "true" : "false");
      l.setAttribute("tabindex", on ? "0" : "-1");
    });
  }

  function clearAll() {
    root
      .querySelectorAll(".psms-card-lit,.psms-lit")
      .forEach((el) => el.classList.remove("psms-card-lit", "psms-lit"));
  }

  function switchTab(name: string) {
    root.querySelectorAll(".psms-tab-panel").forEach((p) => {
      p.classList.toggle("psms-active", p.id === "psms-panel-" + name);
    });
    layout.setAttribute("data-tab", name);
    current = TAB_NAMES.indexOf(name);
    clearAll();
  }

  function pillXForIdx(i: number) {
    return (
      labels[i].getBoundingClientRect().left -
      track.getBoundingClientRect().left -
      6
    );
  }

  function pillTo(idx: number, animate: boolean) {
    pill.classList.toggle("psms-snapping", !!animate && !reduce);
    pill.style.width = labels[idx].getBoundingClientRect().width + "px";
    pill.style.transform = "translateX(" + pillXForIdx(idx) + "px)";
    pill.classList.remove("psms-color-1", "psms-color-2");
    if (idx === 1) pill.classList.add("psms-color-1");
    if (idx === 2) pill.classList.add("psms-color-2");
    setActive(idx);
  }

  const onPillTransitionEnd = () => pill.classList.remove("psms-snapping");
  pill.addEventListener("transitionend", onPillTransitionEnd);

  function goTo(idx: number, animate: boolean) {
    idx = Math.max(0, Math.min(TABS - 1, idx));
    pillTo(idx, animate !== false);
    switchTab(TAB_NAMES[idx]);
  }

  function nearestIdx(x: number) {
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i < TABS; i++) {
      const d = Math.abs(x - pillXForIdx(i));
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    return best;
  }

  // Keyboard: arrow keys / Home / End move and select, focus follows.
  function onKeyDown(e: KeyboardEvent) {
    let next = current;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = current + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS - 1;
    else return;
    e.preventDefault();
    next = Math.max(0, Math.min(TABS - 1, next));
    if (next !== current) goTo(next, true);
    labels[next].focus();
  }
  track.addEventListener("keydown", onKeyDown);

  let dragStartX = 0;
  let dragCurX = 0;
  let dragging = false;
  let startIdx = 0;
  let pillBaseX = 0;
  let pillBaseW = 0;
  const getX = (e: any) => (e.touches ? e.touches[0].clientX : e.clientX);

  function onMove(e: any) {
    if (e.cancelable) e.preventDefault();
    dragCurX = getX(e);
    const delta = dragCurX - dragStartX;
    if (Math.abs(delta) > 4) dragging = true;
    if (!dragging) return;
    const minX = pillXForIdx(0);
    const maxX = pillXForIdx(TABS - 1);
    const rawX = Math.max(minX, Math.min(maxX, pillBaseX + delta));
    const ni = nearestIdx(rawX);
    pill.style.transform = "translateX(" + rawX + "px)";
    pill.style.width = pillBaseW + "px";
    pill.classList.remove("psms-color-1", "psms-color-2");
    if (ni === 1) pill.classList.add("psms-color-1");
    if (ni === 2) pill.classList.add("psms-color-2");
    setActive(ni);
  }

  function onEnd() {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onEnd);
    window.removeEventListener("touchend", onEnd);
    if (!dragging) {
      const cx = dragStartX;
      let best = startIdx;
      let bd = Infinity;
      labels.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.abs(cx - (r.left + r.width / 2));
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      goTo(best, true);
      return;
    }
    const rawX = Math.max(
      pillXForIdx(0),
      Math.min(pillXForIdx(TABS - 1), pillBaseX + (dragCurX - dragStartX)),
    );
    dragging = false;
    goTo(nearestIdx(rawX), true);
  }

  function onStart(e: any) {
    dragStartX = dragCurX = getX(e);
    dragging = false;
    startIdx = current;
    pillBaseX = pillXForIdx(startIdx);
    pillBaseW = labels[startIdx].getBoundingClientRect().width;
    pill.classList.remove("psms-snapping");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
  }

  track.addEventListener("mousedown", onStart);
  track.addEventListener("touchstart", onStart, { passive: true });

  function activateCard(card: HTMLElement) {
    const id = card.getAttribute("data-comment");
    const already = card.classList.contains("psms-card-lit");
    clearAll();
    if (already) return;
    card.classList.add("psms-card-lit");
    const panel = root.querySelector(
      ".psms-tab-panel.psms-active",
    ) as HTMLElement | null;
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
    const col = root.querySelector(
      "#psms-comments-scroll",
    ) as HTMLElement | null;
    if (col) {
      col.scrollTo({
        top:
          card.getBoundingClientRect().top -
          col.getBoundingClientRect().top +
          col.scrollTop -
          60,
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

  const onResize = () => pillTo(current, false);
  window.addEventListener("resize", onResize);

  let raf2 = 0;
  const raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(() => {
      pillTo(1, false);
      switchTab("simple");
    });
  });

  return () => {
    pill.removeEventListener("transitionend", onPillTransitionEnd);
    track.removeEventListener("keydown", onKeyDown);
    track.removeEventListener("mousedown", onStart);
    track.removeEventListener("touchstart", onStart);
    root.removeEventListener("click", onClick);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onEnd);
    window.removeEventListener("touchend", onEnd);
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
  };
}
