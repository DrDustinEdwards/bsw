// Every address no route matches: a 404, drawn by the layout's ErrorBoundary (routes/layout.tsx).
export function loader(): never {
  throw new Response("Not found", { status: 404 });
}

export default function NotFound() {
  return null;
}
