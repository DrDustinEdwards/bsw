/*
  Title band for interior pages (the header/footer menu pages). Mirrors the
  section-heading treatment used on the home page: a large uppercase title on
  the dark brand band, with an optional subtitle.
*/
export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-[color:var(--color-band)]">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
        <h1 className="font-display text-4xl font-extrabold uppercase leading-tight tracking-[0.01em] text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
