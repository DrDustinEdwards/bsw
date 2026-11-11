import { Carousel } from "capsomer/react/carousel";
import { Quote } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "../data/content";

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
      className="relative flex h-full flex-col rounded-2xl border p-8 pt-10"
      style={{
        borderColor: `color-mix(in srgb, ${t.accent} 20%, transparent)`,
        background: `linear-gradient(140deg, color-mix(in srgb, ${t.accent} 9%, transparent) 0%, #ffffff 72%)`,
      }}
    >
      <span className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md shadow-slate-900/10">
        <Quote size={20} strokeWidth={2} style={{ color: t.accent }} aria-hidden="true" />
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
  // Capsomer's carousel, server-rendered on the first slide as a scroll-snap track; the carousel island
  // (app/islands/carousel.ts), started as it nears the viewport, wires its arrows, markers and status.
  return (
    <div
      className="testimonials"
      data-island="carousel"
      data-client="visible"
      data-client-root-margin="200px"
    >
      <Carousel
        label="Client testimonials"
        prevLabel="Previous testimonials"
        nextLabel="Next testimonials"
        markerLabel={(n) => `Go to testimonial slide ${n}`}
      >
        {slides.map((group, gi) => (
          <div key={gi} className="grid gap-6 px-3 pt-6 md:grid-cols-2">
            {group.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
