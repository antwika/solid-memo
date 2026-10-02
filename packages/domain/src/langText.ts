import type { LangText } from "@solid-memo/vocab/types.generated";

export type { LangText };

/**
 * Text in several languages, as deck format 4 states titles and
 * descriptions: a language tag (lower case) to the text in that language,
 * one of them English. The app shows the text in the reader's language
 * when there is one, and edits the English text, keeping the other
 * languages as they are.
 */

/** The tag of the English text: "en", or a regional English ("en-gb"). */
function englishTag(text: LangText): string | undefined {
  return matchingTag(text, "en");
}

/**
 * The tag in the text for a wanted language: the tag itself, else the
 * same language without a region ("sv-SE" finds "sv"), else a regional
 * one ("en" finds "en-gb").
 */
function matchingTag(text: LangText, wanted: string): string | undefined {
  const tag = wanted.toLowerCase();
  if (tag in text) return tag;
  const language = tag.split("-")[0];
  if (language in text) return language;
  return Object.keys(text).sort().find((t) => t.startsWith(`${language}-`));
}

/** The English text; undefined when there is none. */
export function english(text: LangText): string | undefined {
  const tag = englishTag(text);
  return tag === undefined ? undefined : text[tag];
}

/**
 * The text to show a reader who prefers `languages` (most preferred
 * first, as navigator.languages lists them): the first of those the text
 * is in, else the English, else the first language's (by tag).
 */
export function shown(text: LangText, languages: readonly string[] = []): string {
  for (const language of languages) {
    const tag = matchingTag(text, language);
    if (tag !== undefined) return text[tag];
  }
  return english(text) ?? text[Object.keys(text).sort()[0]] ?? "";
}

/**
 * The tag of the text the app edits: the English, else the first by tag
 * (the untagged text of a card side, "", comes first); undefined when the
 * text is in no language.
 */
function editedTag(text: LangText): string | undefined {
  return englishTag(text) ?? Object.keys(text).sort()[0];
}

/** The text the app edits: the English, else the text shown; empty when there is none. */
export function editedText(text: LangText | undefined): string {
  return text === undefined ? "" : (english(text) ?? shown(text));
}

/**
 * A card side's text as entered: every language's text trimmed and an
 * empty one left out; no text at all when the edited one is cleared, for
 * clearing what the app shows clears the side's text.
 */
export function tidiedSideText(text: LangText): LangText {
  const tag = editedTag(text);
  const kept = Object.fromEntries(
    Object.entries(text)
      .map(([tag, value]) => [tag, value.trim()])
      .filter(([, value]) => value !== ""),
  );
  return tag === undefined || tag in kept ? kept : {};
}

/**
 * A card side's text with the edited text replaced by `value`, every
 * other language kept. A side with no text yet gets untagged text (""):
 * the app does not know what language a user types in.
 */
export function withEditedText(text: LangText, value: string): LangText {
  return { ...text, [editedTag(text) ?? ""]: value };
}

/**
 * Text as entered: every language's text trimmed and an empty one left
 * out; undefined when no English is left, for a text needs its English
 * (clearing the English clears the text).
 */
export function tidied(text: LangText | undefined): LangText | undefined {
  if (text === undefined) return undefined;
  const kept = Object.fromEntries(
    Object.entries(text)
      .map(([tag, value]) => [tag, value.trim()])
      .filter(([, value]) => value !== ""),
  );
  return englishTag(kept) === undefined ? undefined : kept;
}

/** Whether two texts say the same in the same languages. */
export function sameText(a: LangText | undefined, b: LangText | undefined): boolean {
  if (a === undefined || b === undefined) return a === b;
  const tags = Object.keys(a);
  return tags.length === Object.keys(b).length && tags.every((tag) => a[tag] === b[tag]);
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
