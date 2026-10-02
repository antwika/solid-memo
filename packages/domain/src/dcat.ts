import { english, inEnglish, shown, type LangText } from "./langText";
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
 * every dataset, and decks made before format 3 often had none. This is
 * the English, all that formats before 4 state.
 */
export function defaultDeckDescription(title: string): string {
  return `Flashcards: ${title}.`;
}

/**
 * The default description in format 4: in English and Swedish, the
 * Swedish naming the deck by its Swedish title when it has one.
 */
export function defaultDeckDescriptionText(title: LangText): LangText {
  const name = english(title) ?? shown(title);
  return { en: defaultDeckDescription(name), sv: `Kortlek: ${title.sv ?? name}.` };
}

/**
 * A format-3 description in format 4: the default one, which the app
 * wrote, in English and Swedish; any other as its English.
 */
export function descriptionInFormat4(description: string, title: string): LangText {
  return description === defaultDeckDescription(title) ? defaultDeckDescriptionText({ en: title }) : inEnglish(description);
}
