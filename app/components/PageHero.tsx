/*
  Title band for interior pages (the header/footer menu pages). Mirrors the
  section-heading treatment used on the home page: a large uppercase title on
  the dark brand band, with an optional subtitle.
*/
export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="section-band">
      <div className="page-hero-inner">
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-lead">{subtitle}</p>}
      </div>
    </section>
  );
}
