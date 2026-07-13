import { useState } from "react";

/*
  "Precision Editing Demonstrated": the signature interactive element.
  Three views over a Staphylococcus aureus grant excerpt:
    - Original: the author's draft
    - Simple Markup: the clean edited result, changed spans tinted by category
    - All Markup: insertions (green) and deletions (red strike) shown inline
  The four annotation chips (Scientific / Editorial / Impact / Rhetorical) are
  clickable and highlight the passage each one addresses. Colors are exact,
  from bsw/design-system.md.
*/

type AnnoKey = "sci" | "edit" | "impact" | "rhet";

const ANNOTATIONS: {
  key: AnnoKey;
  label: string;
  color: string;
  note: string;
}[] = [
  {
    key: "sci",
    label: "Scientific",
    color: "var(--color-anno-sci)",
    note: "Corrects the taxonomy and subject-verb agreement. S. aureus is a single Gram-positive bacterium, and preliminary data take a plural verb.",
  },
  {
    key: "edit",
    label: "Editorial",
    color: "var(--color-anno-edit)",
    note: "Replaces vague phrasing with a precise, method-forward description a study section can evaluate.",
  },
  {
    key: "impact",
    label: "Impact",
    color: "var(--color-anno-impact)",
    note: "Reframes a generic significance claim as a quantified, translational outcome.",
  },
  {
    key: "rhet",
    label: "Rhetorical",
    color: "var(--color-anno-rhet)",
    note: "Sharpens tone and specificity to convey urgency without overstatement.",
  },
];

type Token =
  | { kind: "same"; text: string }
  | { kind: "change"; del: string; ins: string; anno: AnnoKey };

const TOKENS: Token[] = [
  { kind: "same", text: "Staphylococcus aureus is " },
  {
    kind: "change",
    del: "a bacteria that causes",
    ins: "a Gram-positive bacterium that causes",
    anno: "sci",
  },
  { kind: "same", text: " " },
  {
    kind: "change",
    del: "many infections in hospitals",
    ins: "life-threatening nosocomial infections",
    anno: "rhet",
  },
  { kind: "same", text: ". Our preliminary data " },
  { kind: "change", del: "shows", ins: "demonstrate", anno: "sci" },
  {
    kind: "same",
    text: " that the biofilm is resistant to conventional antibiotics. We will ",
  },
  {
    kind: "change",
    del: "do experiments to look at",
    ins: "employ transcriptomic profiling to define",
    anno: "edit",
  },
  { kind: "same", text: " the genes involved. " },
  {
    kind: "change",
    del: "This work is very important and could help a lot of patients.",
    ins: "These findings will inform host-directed therapies for the roughly 120,000 patients affected by invasive S. aureus infection each year in the United States.",
    anno: "impact",
  },
];

type View = "original" | "simple" | "all";

const VIEWS: { key: View; label: string }[] = [
  { key: "original", label: "Original" },
  { key: "simple", label: "Simple Markup" },
  { key: "all", label: "All Markup" },
];

function colorFor(anno: AnnoKey) {
  return ANNOTATIONS.find((a) => a.key === anno)!.color;
}

export function EditingDemo() {
  const [view, setView] = useState<View>("all");
  const [active, setActive] = useState<AnnoKey | null>(null);

  const activeNote = active ? ANNOTATIONS.find((a) => a.key === active) : null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* View tabs */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-[var(--radius-btn)] border border-slate-200 bg-white p-1">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setView(v.key)}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
                view === v.key
                  ? "bg-ink text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document panel on warm paper */}
      <div className="rounded-2xl border border-[#e7ddc9] bg-[#fbf7ee] p-6 shadow-sm sm:p-9">
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#a99a7a]">
          Specific Aims, Aim 2 excerpt
        </p>
        <p className="font-display text-[1.15rem] leading-[1.9] text-ink">
          {TOKENS.map((token, i) => {
            if (token.kind === "same") return <span key={i}>{token.text}</span>;

            const isActive = active === token.anno;
            const c = colorFor(token.anno);
            const highlight = isActive
              ? {
                  background: `color-mix(in srgb, ${c} 16%, transparent)`,
                  boxShadow: `inset 0 -2px 0 0 ${c}`,
                  borderRadius: "3px",
                }
              : undefined;

            if (view === "original") {
              return (
                <span key={i} style={highlight}>
                  {token.del}
                </span>
              );
            }
            if (view === "simple") {
              return (
                <span
                  key={i}
                  style={{
                    color: c,
                    fontWeight: 600,
                    ...highlight,
                  }}
                >
                  {token.ins}
                </span>
              );
            }
            // all markup
            return (
              <span key={i} style={highlight}>
                <del className="text-red-600/80 decoration-red-500/70">
                  {token.del}
                </del>{" "}
                <ins
                  className="no-underline"
                  style={{ color: "#2f7d32", fontWeight: 600 }}
                >
                  {token.ins}
                </ins>
              </span>
            );
          })}
        </p>
      </div>

      {/* Annotation chips */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-ink">
          Click a category to see what each edit fixes:
        </p>
        <div className="flex flex-wrap gap-2.5">
          {ANNOTATIONS.map((a) => {
            const on = active === a.key;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setActive(on ? null : a.key)}
                aria-pressed={on}
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  color: on ? "#fff" : a.color,
                  background: on ? a.color : "transparent",
                  borderColor: a.color,
                }}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[0.7rem] font-bold"
                  style={{
                    background: on ? "rgba(255,255,255,0.25)" : `color-mix(in srgb, ${a.color} 16%, transparent)`,
                    color: on ? "#fff" : a.color,
                  }}
                >
                  {a.label[0]}
                </span>
                {a.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-4 min-h-[3.5rem] rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-muted transition-colors"
          style={activeNote ? { borderColor: activeNote.color } : undefined}
        >
          {activeNote ? (
            <span>
              <span
                className="font-semibold"
                style={{ color: activeNote.color }}
              >
                {activeNote.label}.
              </span>{" "}
              {activeNote.note}
            </span>
          ) : (
            <span className="text-slate-400">
              Every change is categorized so authors learn the reasoning, not
              just the correction.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
