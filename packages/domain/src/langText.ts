import type { LangText } from "@solid-memo/vocab/types.generated";

export type { LangText };

/**
 * Text in several languages, as deck format 4 states titles and
 * descriptions: a language tag (lower case) to the text in that language,
 * one of them English. The app shows the text in the reader's language
 * when there is one, and edits the text in the page's language (else the
 * English), keeping the other languages as they are.
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
 * The tag of the text to show a reader who prefers `languages` (most
 * preferred first, as navigator.languages lists them): the first of those
 * the text is in, else the English, else the first language's (by tag);
 * undefined when the text is in no language. The page marks text in
 * another language than its own by this tag.
 */
export function shownTag(text: LangText, languages: readonly string[] = []): string | undefined {
  for (const language of languages) {
    const tag = matchingTag(text, language);
    if (tag !== undefined) return tag;
  }
  return englishTag(text) ?? Object.keys(text).sort()[0];
}

/** The text to show a reader who prefers `languages`: the one `shownTag` picks; empty when there is none. */
export function shown(text: LangText, languages: readonly string[] = []): string {
  const tag = shownTag(text, languages);
  return tag === undefined ? "" : text[tag];
}

/**
 * The tag of the text the app edits: the English, else the first by tag
 * (the untagged text of a card side, "", comes first); undefined when the
 * text is in no language.
 */
export function editedTag(text: LangText): string | undefined {
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

/** Untagged text as English: how a format-3 deck's text reads in format 4. */
export function inEnglish(value: string): LangText {
  return { en: value };
}

/**
 * Text typed on a page in `locale`, the user's own (a deck's name or
 * description, a note, a label): what the app knows of its language is
 * that the user typed it on that page. The formats ask for English text,
 * so on another page the typed text stands in for it as well, until
 * someone writes a translation.
 */

/**
 * The tag of the text edited on a page in `locale`: that language's,
 * else the English, else the first by tag; undefined when the text is in
 * no language.
 */
export function typedTag(text: LangText, locale: string): string | undefined {
  return matchingTag(text, locale) ?? editedTag(text);
}

/** The text edited on a page in `locale`, as `typedTag` picks it; empty when there is none. */
export function typedText(text: LangText | undefined, locale: string): string {
  const tag = text === undefined ? undefined : typedTag(text, locale);
  return tag === undefined ? "" : text![tag];
}

/** New text typed on a page in `locale`: in that language, and as the English the formats ask for. */
export function typedIn(value: string, locale: string): LangText {
  return { en: value, [locale.toLowerCase()]: value };
}

/**
 * The text with what `typedTag` picks replaced by `value`, typed on a page
 * in `locale`, every other language kept; an English that only stood in
 * for the replaced text (the same words) is replaced too, as is a missing
 * one. Blank text is no text: clearing what the reader sees clears the
 * translations too.
 */
export function withTyped(text: LangText | undefined, value: string, locale: string): LangText {
  if (value.trim() === "") return {};
  if (text === undefined) return typedIn(value, locale);
  const tag = typedTag(text, locale) ?? locale.toLowerCase();
  const en = englishTag(text);
  const standIn = en === undefined || text[en] === text[tag];
  return { ...text, [tag]: value, ...(standIn ? { [en ?? "en"]: value } : {}) };
}

/**
 * Language-tagged text that needs no English (a picture's description)
 * with what `typedTag` picks replaced by `value`, typed on a page in
 * `locale`; new text is in that language. Blank text is no text, as for
 * `withTyped`.
 */
export function withTypedTagged(text: LangText | undefined, value: string, locale: string): LangText {
  if (value.trim() === "") return {};
  const tag = (text === undefined ? undefined : typedTag(text, locale)) ?? locale.toLowerCase();
  return { ...text, [tag]: value };
}

/**
 * Language-tagged text that needs no English (a picture's description) as
 * entered: every language's text trimmed and an empty one left out;
 * undefined when none is left, as when the edited text is cleared.
 */
export function tidiedTagged(text: LangText | undefined): LangText | undefined {
  if (text === undefined) return undefined;
  const kept = tidiedSideText(text);
  return Object.keys(kept).length === 0 ? undefined : kept;
}
