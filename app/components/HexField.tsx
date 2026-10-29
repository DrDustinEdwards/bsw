// Hero signature: drifting hexagons, drawn into this empty field by the hex-field island
// (app/islands/hex-field.ts), so the random layout never has to match between server and browser.
// It is above the fold, so it starts at once.
export function HexField() {
  return (
    <div
      data-island="hex-field"
      data-client="load"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
