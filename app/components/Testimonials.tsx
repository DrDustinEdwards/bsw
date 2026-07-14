import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/*
  Client testimonials carousel. Layout, card styling, and navigation match the
  reference (soft tinted cards with a circular quote badge, side arrows, and dot
  pagination), but the content stays anonymized on purpose: the reference site
  attributes quotes to named individuals and Nobel laureates, which we do not
  reproduce. Attributions here are representative role descriptions only.
*/
const TESTIMONIALS = [
  {
    quote:
      "The grant review turned a solid application into a funded one. The reviewers' concerns we could not see were flagged and fixed before submission.",
    who: "Principal Investigator, R1 research university",
    tone: "green",
  },
  {
    quote:
      "My manuscript was accepted with minor revisions. The editing was rigorous, fast, and clearly done by someone who understood the science.",
    who: "Associate Professor, School of Medicine",
    tone: "peach",
  },
  {
    quote:
      "As a non-native English speaker I finally felt my writing matched the quality of my research. Worth every dollar.",
    who: "Postdoctoral Fellow, cancer research institute",
    tone: "peach",
  },
  {
    quote:
      "We now route every departmental grant through BioScience Writers. The consistency and turnaround are exactly what we needed.",
    who: "Department Chair, public university",
    tone: "green",
  },
];

// Two cards per slide, matching the reference carousel.
const PER_SLIDE = 2;

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  const green = t.tone === "green";
  return (
    <figure
      className={`relative mt-6 flex h-full flex-col rounded-2xl border p-8 pt-10 ${
        green
          ? "border-[#cfe0b2] bg-gradient-to-br from-[#eef6e2] to-[#fbfdf6]"
          : "border-[#f6d6be] bg-gradient-to-br from-[#fdeee2] to-[#fffaf6]"
      }`}
    >
      <span className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md shadow-slate-900/10">
        <Quote
          size={20}
          strokeWidth={2}
          style={{ color: green ? "#577e20" : "#b75b15" }}
          aria-hidden="true"
        />
      </span>
      <blockquote className="text-[1.05rem] italic leading-relaxed text-ink/90">
        {t.quote}
      </blockquote>
      <figcaption className="mt-5 text-sm font-semibold text-muted">
        {t.who}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const slides: (typeof TESTIMONIALS)[] = [];
  for (let i = 0; i < TESTIMONIALS.length; i += PER_SLIDE) {
    slides.push(TESTIMONIALS.slice(i, i + PER_SLIDE));
  }
  const [page, setPage] = useState(0);
  const go = (dir: number) =>
    setPage((p) => (p + dir + slides.length) % slides.length);

  return (
    <div>
      <div className="relative">
        {/* Prev / next arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonials"
          className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:text-brand sm:-translate-x-4 lg:-translate-x-12"
        >
          <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonials"
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-1 items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:text-brand sm:translate-x-4 lg:translate-x-12"
        >
          <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
        </button>

        {/* Slide track */}
        <div className="overflow-hidden px-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {slides.map((group, gi) => (
              <div
                key={gi}
                className="grid w-full shrink-0 gap-6 px-1 md:grid-cols-2"
              >
                {group.map((t, i) => (
                  <Card key={i} t={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot pagination */}
      <div className="mt-8 flex justify-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Go to testimonial slide ${i + 1}`}
            aria-current={page === i}
            className={`h-2.5 rounded-full transition-all ${
              page === i ? "w-6 bg-brand" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        Attributions are representative role descriptions, not named individuals.
      </p>
    </div>
  );
}
