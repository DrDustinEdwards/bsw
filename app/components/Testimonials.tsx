import { Carousel } from "capsomer/react/carousel";
import { Icon, iconQuote } from "capsomer/react/icons";
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
      className="quote-card"
      style={{
        borderColor: `color-mix(in srgb, ${t.accent} 20%, transparent)`,
        background: `linear-gradient(140deg, color-mix(in srgb, ${t.accent} 9%, transparent) 0%, #ffffff 72%)`,
      }}
    >
      <span className="quote-card-mark" style={{ color: t.accent }}>
        <Icon d={iconQuote} />
      </span>
      <blockquote className="quote-card-text">{t.quote}</blockquote>
      <figcaption className="quote-card-cite">
        <p className="quote-card-name">{t.name}</p>
        <p className="quote-card-meta">{t.honor}</p>
        <p className="quote-card-meta">{t.org}</p>
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
          <div key={gi} className="quote-slide">
            {group.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
