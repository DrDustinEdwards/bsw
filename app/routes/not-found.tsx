// Every address no route matches: a 404, drawn by the layout's ErrorBoundary (routes/layout.tsx).
export function loader(): never {
  throw new Response("Not found", { status: 404 });
}

// The loader always throws, so this component never renders; reusing one the Worker already holds keeps its size.
export { default } from "./home";
