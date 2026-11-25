// The site's side of Carrel's contract (@dustinedwards/site-api): the media library and no content. The copy is code, so no item is listed and a content write is refused.
import {
  previewDocument,
  RefusedError,
  VersionConflictError,
  type ContentAdapter,
  type SiteAdapter,
} from "@dustinedwards/site-api";
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
        previewDocument({
          title: "Preview",
          body: `<main><p>${escapeHtml(NO_CONTENT)}</p><pre>${escapeHtml(source)}</pre></main>`,
          origin,
        }),
    },
    // The library Carrel uploads to (media-adapter.server.ts), served at /media/<key>.
    media: carrelMediaAdapter(env),
  };
}
