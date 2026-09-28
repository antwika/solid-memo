/**
 * The DCAT side of Solid Memo's data (see docs/data-model.md): the
 * terms of the EU vocabularies it uses, and what a deck states when the
 * user has not said.
 */

/** The EU data theme every library deck has: education, culture and sport. */
export const EDUCATION_THEME = "http://publications.europa.eu/resource/authority/data-theme/EDUC";

/** The EU data theme scheme, a theme taxonomy of every catalogue. */
export const DATA_THEME_SCHEME = "http://publications.europa.eu/resource/authority/data-theme";

export const TURTLE_MEDIA_TYPE = "https://www.iana.org/assignments/media-types/text/turtle";

/** A pod deck's distribution: its cards document, as a dcat:Distribution. */
export function distributionUrlOf(deckUrl: string): string {
  return `${deckUrl}-cards`;
}

/**
 * The description a deck gets when it has none: DCAT-AP asks one of
 * every dataset, and decks made before format 3 often had none.
 */
export function defaultDeckDescription(title: string): string {
  return `Flashcards: ${title}.`;
}
