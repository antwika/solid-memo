import type { LangText } from "@solid-memo/vocab/types.generated";

export type { LangText };

/**
 * Text in several languages, as deck format 4 states titles and
 * descriptions: a language tag (lower case) to the text in that language,
 * one of them English. Solid Memo is English first: it shows and edits the
 * English text, and keeps the other languages as they are.
 */

/** The tag of the English text: "en", or a regional English ("en-gb"). */
function englishTag(text: LangText): string | undefined {
  if ("en" in text) return "en";
  return Object.keys(text).sort().find((tag) => tag.startsWith("en-"));
}

/** The English text; undefined when there is none. */
export function english(text: LangText): string | undefined {
  const tag = englishTag(text);
  return tag === undefined ? undefined : text[tag];
}

/** The text to show: the English one, else the first language's (by tag). */
export function shown(text: LangText): string {
  return english(text) ?? text[Object.keys(text).sort()[0]] ?? "";
}

/** The whole text when it is in more than English, else undefined: what a model keeps. */
export function beyondEnglish(text: LangText): LangText | undefined {
  const tag = englishTag(text);
  return Object.keys(text).some((t) => t !== tag) ? text : undefined;
}

/** Untagged text as English: what the app writes for text a user typed. */
export function inEnglish(value: string): LangText {
  return { en: value };
}

/**
 * The text with its English replaced by `value` (under the tag it had),
 * every other language kept: an edit in the app changes the English text
 * only, and the translations stay.
 */
export function withEnglish(text: LangText | undefined, value: string): LangText {
  const tag = (text === undefined ? undefined : englishTag(text)) ?? "en";
  return { ...text, [tag]: value };
}
