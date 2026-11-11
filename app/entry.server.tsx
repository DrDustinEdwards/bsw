// site-runtime's React Router server entry, the same on every site. The site ships no React to the browser (no
// <Scripts />): /site.js (app/site.ts) is the page's one script tag, and it loads the islands (app/islands/) a page names.
export { default, handleError, streamTimeout } from "@dustinedwards/site-runtime/react-entry";
