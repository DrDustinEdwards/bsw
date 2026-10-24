import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "../data/content";
import { DOT_OFF, DOT_ON } from "./carousel";

/*
  Client testimonials carousel. Quotes, names, honors, and institutions come
  from app/data/content. Each card is tinted with one of the four brand accent
  colors: green, blue, orange, and slate.
*/

// Two cards per slide, matching the reference carousel.
const PER_SLIDE = 2;

function Card({ t }: { t: Testimonial }) {
  return (
    <figure
      className="relative mt-6 flex h-full flex-col rounded-2xl border p-8 pt-10"
      style={{
        borderColor: `color-mix(in srgb, ${t.accent} 20%, transparent)`,
        background: `linear-gradient(140deg, color-mix(in srgb, ${t.accent} 9%, transparent) 0%, #ffffff 72%)`,
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
  // Server-rendered on the first slide; app/site.ts (enhanceCarousel) moves the track and the dots.
  return (
    <div data-carousel>
      <div className="relative">
        {/* Prev / next arrows */}
        <button
          type="button"
          data-dir="-1"
          aria-label="Previous testimonials"
          className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:text-brand sm:-translate-x-4 lg:-translate-x-12"
        >
          <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          data-dir="1"
          aria-label="Next testimonials"
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-1 items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:text-brand sm:translate-x-4 lg:translate-x-12"
        >
          <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
        </button>

        {/* Slide track */}
        <div className="overflow-hidden px-2">
          <div
            className="flex transition-transform duration-300 ease-out"
            data-track
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

      {/* Dot pagination. Buttons carry a 24px min hit target (WCAG 2.5.8)
          around the smaller visual bar. */}
      <div className="mt-6 flex justify-center">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-dot={i}
            aria-label={`Go to testimonial slide ${i + 1}`}
            aria-current={i === 0}
            className="group flex h-6 w-6 items-center justify-center"
          >
            <span
              className={`block h-2.5 rounded-full transition-all ${
                i === 0 ? DOT_ON : DOT_OFF
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
