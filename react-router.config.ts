import type { Config } from "@react-router/dev/config";

// subResourceIntegrity: an import map with every chunk's hash, should a page ever render <Scripts /> (today none ships
// React to the browser; /site.js and its islands are the scripts).
export default { ssr: true, subResourceIntegrity: true } satisfies Config;
