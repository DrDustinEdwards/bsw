/*
  Scroll reveal wrapper. Fades and lifts its children into view the first time
  they intersect the viewport; app/site.ts (enhanceReveal) adds is-visible.
  The hidden start state applies only when scripting is on, and
  prefers-reduced-motion forces the visible state (both in app.css).
*/
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
