import type { PictureProps } from "@dustinedwards/site-runtime/image";

// A `<picture>` from site-runtime's pictureProps (app/lib/media/images.ts). `display: contents`, so the img stays the
// box its parent lays out (a flex child, a sized logo), as it was before it had sources.
export function Picture({ sources, img }: PictureProps) {
  return (
    <picture className="contents">
      {sources.map((source) => (
        <source key={`${source.type} ${source.media ?? ""}`} {...source} />
      ))}
      {/* The ratio from the file's own size, named: Chrome flags a lazy image whose height is auto and whose ratio is only
          the attribute-derived `auto w / h` (LazyLoadImageIssue; web.dev/articles/cls). */}
      {/* oxlint-disable-next-line jsx-a11y/alt-text -- pictureProps always sets img.alt (empty for a decorative picture). */}
      <img
        {...img}
        style={{
          ...(img.width && img.height ? { aspectRatio: `${img.width} / ${img.height}` } : {}),
          ...img.style,
        }}
      />
    </picture>
  );
}
