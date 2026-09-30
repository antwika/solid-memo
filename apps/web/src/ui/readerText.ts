import { shown, type LangText } from "@solid-memo/domain/langText";

/**
 * Deck text as the app shows it: in the reader's language (the browser's
 * preferred languages, in order) when the deck states it in one, else in
 * English.
 */
export function readerText(text: LangText): string {
  return shown(text, navigator.languages);
}
