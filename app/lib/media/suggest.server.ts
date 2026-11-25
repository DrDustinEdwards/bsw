// Tags and alt text a model suggests for a library picture (site-api's mediaSuggester, ANTHROPIC_API_KEY). Nothing here writes: a person accepts a suggestion in Carrel.
// Only editor-uploaded pictures, only when an editor asks.
import { mediaSuggester } from "@dustinedwards/site-api";

/** What the model suggests for one stored picture. Throws when the site has no ANTHROPIC_API_KEY. */
export const suggestFor = mediaSuggester({
  app: "bsw",
  describe: "on a scientific editing company's website",
});
