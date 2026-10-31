import type { PictureProps } from "@dustinedwards/site-runtime/image";

// A `<picture>` from site-runtime's pictureProps (app/lib/media/images.ts). `display: contents`, so the img stays the
// box its parent lays out (a flex child, a sized logo), as it was before it had sources.
export function Picture({ sources, img }: PictureProps) {
  return (
    <picture className="contents">
      {sources.map((source) => (
        <source key={`${source.type} ${source.media ?? ""}`} {...source} />
      ))}
      <img {...img} />
    </picture>
  );
}
