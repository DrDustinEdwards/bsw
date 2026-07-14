import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/*
  Client testimonials carousel. The quotes, names, honors, and institutions are
  the real attributions from the reference site (the anonymized version was
  replaced at the client's explicit request). Each card is tinted with one of
  the four brand accent colors: green, blue, orange, and silver/gray.
*/
const TESTIMONIALS = [
  {
    quote:
      "Excellent attention to detail. The turnaround time is remarkable for the level of scientific depth provided.",
    name: "Dr. Shinya Yamanaka",
    honor: "Nobel Laureate",
    org: "Kyoto University",
    accent: "#577e20",
  },
  {
    quote:
      "The editors at BioScience Writers are highly skilled and provide very thorough and helpful feedback. Invaluable for our research group.",
    name: "Dr. Jennifer L. West",
    honor: "Pierre Galletti Award",
    org: "Duke University",
    accent: "#0066a1",
  },
  {
    quote:
      "Invaluable service for researchers aiming for high-impact journals. Their editing is an essential part of our process.",
    name: "Dr. Hideyuki Okano",
    honor: "Medal with Purple Ribbon",
    org: "Keio University",
    accent: "#b75b15",
  },
  {
    quote:
      "Consistent quality and deep understanding of molecular biology. Their feedback is as valuable as a formal peer review.",
    name: "Dr. Paolo Sassone-Corsi",
    honor: "EMBO Gold Medalist",
    org: "UC Irvine",
    accent: "#475569",
  },
];

// Two cards per slide, matching the reference carousel.
const PER_SLIDE = 2;

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure
      className="relative mt-6 flex h-full flex-col rounded-2xl border p-8 pt-10"
      style={{
        borderColor: `${t.accent}33`,
        background: `linear-gradient(140deg, ${t.accent}18 0%, #ffffff 72%)`,
      }}
    >
      <span className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md shadow-slate-900/10">
        <Quote
          size={20}
          strokeWidth={2}
          style={{ color: t.accent }}
          aria-hidden="true"
        />
      </span>
      <blockquote className="text-[1.05rem] italic leading-relaxed text-ink/90">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6">
        <p className="font-semibold text-ink">{t.name}</p>
        <p className="text-sm text-muted">{t.honor}</p>
        <p className="text-sm text-muted">{t.org}</p>
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
    </div>
  );
}
