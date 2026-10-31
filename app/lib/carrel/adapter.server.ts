// The site's side of Carrel's contract (@dustinedwards/site-api): the media library, and no content. bsw's copy is code
// (app/data, app/routes), and its claims are Dustin's to change in the repository (CLAUDE.md, hard rule 1), so Carrel
// lists no item here and every content write is refused: a write naming a version is a version conflict, as the contract
// asks for an item the site does not hold, and a new item is refused in words.
import { previewDocument, RefusedError, VersionConflictError, type ContentAdapter, type SiteAdapter } from "@dustinedwards/site-api";
import { escapeHtml } from "@dustinedwards/site-runtime/html";
import { SITE } from "~/config/site";
import { carrelMediaAdapter } from "./media-adapter.server";

const NO_CONTENT = "BioScience Writers' pages are written in its repository, not in Carrel.";

/** A write to an item: none exists, so a named version is stale and a create is refused. */
function refuseWrite(_id: string, input: { expectedVersion?: string | null }): never {
  if (input.expectedVersion) throw new VersionConflictError(null, "No such item.");
  throw new RefusedError(NO_CONTENT);
}

const content: ContentAdapter = {
  list: async () => ({ items: [], nextCursor: null, total: 0 }),
  get: async () => null,
  saveDraft: refuseWrite,
  publish: refuseWrite,
  schedule: refuseWrite,
  unpublish: refuseWrite,
  revisions: async () => null,
  revisionSource: async () => null,
};

export function createCarrelAdapter(env: Env, origin: string): SiteAdapter {
  return {
    site: { id: "bsw", name: SITE.name, origin },
    content,
    // No item has a page to preview, so a source is shown as written, under the contract's noindex page.
    preview: {
      render: async ({ source }) =>
        previewDocument({ title: "Preview", body: `<main><p>${escapeHtml(NO_CONTENT)}</p><pre>${escapeHtml(source)}</pre></main>`, origin }),
    },
    // The library Carrel uploads to (media-adapter.server.ts), served at /media/<key>.
    media: carrelMediaAdapter(env),
  };
}
