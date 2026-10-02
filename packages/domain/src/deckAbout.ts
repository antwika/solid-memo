import { AppError } from "./appError";
import { TOPICS } from "@solid-memo/vocab/concepts.generated";
import type { Deck } from "./deck";
import { withEnglish } from "./langText";

/**
 * What a deck says about itself beyond its name (see docs/data-model.md):
 * a description, which every deck has (DCAT-AP asks one of every
 * dataset), the topics of Solid Memo's topics scheme it is about, and
 * free-text keywords.
 */
export interface DeckAbout {
  /** The English description: what the app edits. */
  description: string;
  /** IRIs of concepts of the topics scheme. */
  topics: string[];
  keywords: string[];
}

const TOPIC_IRIS: readonly string[] = TOPICS.concepts.map((concept) => concept.iri);

/** The topics a deck names among its themes. */
export function topicsOfDeck(deck: Deck): string[] {
  return (deck.themes ?? []).filter((theme) => TOPIC_IRIS.includes(theme));
}

/** Keywords as typed: comma-separated, trimmed, each once. */
export function parseKeywords(text: string): string[] {
  return [...new Set(text.split(",").map((keyword) => keyword.trim()).filter((k) => k !== ""))];
}

/**
 * The deck with what it says about itself replaced: the English
 * description trimmed (the other languages kept), the topics replacing the ones it named (other themes, such as
 * the EU education theme of a library deck, are kept), the keywords.
 * Refuses an empty description.
 */
export function withAbout(deck: Deck, about: DeckAbout): Deck {
  const description = about.description.trim();
  if (description === "") throw new AppError("deckNeedsDescription");
  const themes = [
    ...(deck.themes ?? []).filter((theme) => !TOPIC_IRIS.includes(theme)),
    ...about.topics,
  ];
  const { themes: _themes, keywords: _keywords, ...rest } = deck;
  return {
    ...rest,
    description: withEnglish(deck.description, description),
    ...(themes.length === 0 ? {} : { themes }),
    ...(about.keywords.length === 0 ? {} : { keywords: about.keywords }),
  };
}
