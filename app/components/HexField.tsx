// Hero signature: drifting hexagons, drawn into this empty field by app/site.ts (enhanceHexField),
// so the random layout never has to match between server and browser.
export function HexField() {
  return (
    <div
      data-hexfield
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
