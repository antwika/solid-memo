import { agentToRecord, agentUrlOf } from "./agentRecord";
import { directionOfConcept, conceptOfDirection } from "./concepts";
import { defaultDeckDescription, distributionUrlOf, TURTLE_MEDIA_TYPE } from "./dcat";
import type { Card, CardContent, Deck } from "./deck";
import type { LibraryCard, LibraryDeckContent } from "./library";
import type { AgentV1, CardV3, DeckV4, DistributionV1, LibraryDeckV4 } from "@solid-memo/vocab/types.generated";
import { inEnglish, shown } from "./langText";
import { fragmentIdOf } from "./subjectUrl";

/**
 * Decks and cards between their latest shape records and the domain
 * models (see docs/shapes.md). Reading takes the version the pod stored,
 * which the model keeps for the migration plan; writing always produces
 * the latest record. A deck's creators are agent nodes in the record and
 * "Name <email>" strings in the model: `authorOf` names an agent.
 */

export type AuthorOf = (agentUrl: string) => string;

export function deckFromRecord(
  url: string,
  storedVersion: number,
  data: DeckV4,
  authorOf: AuthorOf,
): Deck {
  return {
    id: fragmentIdOf(url),
    url,
    title: data.title,
    cardsDocumentUrl: data.cardsDocument,
    reviewsDocumentUrl: data.reviewsDocument,
    createdAt: data.created ?? "",
    ...(data.modified === undefined ? {} : { modifiedAt: data.modified }),
    formatVersion: storedVersion,
    direction: directionOfConcept(data.studyDirection)!,
    authors: data.creator.map(authorOf),
    ...(data.license === undefined ? {} : { license: data.license }),
    description: data.description,
    ...(data.source === undefined ? {} : { sourceUrl: data.source }),
    ...(data.theme.length === 0 ? {} : { themes: [...data.theme] }),
    ...(data.keyword.length === 0 ? {} : { keywords: [...data.keyword] }),
    ...(data.newCardsPerDay === undefined ? {} : { newCardsPerDay: data.newCardsPerDay }),
    ...(data.maxReviewsPerDay === undefined ? {} : { maxReviewsPerDay: data.maxReviewsPerDay }),
  };
}

/** The deck as its latest record; a deck that states no description gets the default one. */
export function deckToRecord(deck: Deck): DeckV4 {
  return {
    title: deck.title,
    description: deck.description ?? inEnglish(defaultDeckDescription(shown(deck.title))),
    ...(deck.createdAt === "" ? {} : { created: deck.createdAt }),
    ...(deck.modifiedAt === undefined ? {} : { modified: deck.modifiedAt }),
    creator: deck.authors.map((author) => agentUrlOf(deck.url, author)),
    ...(deck.license === undefined ? {} : { license: deck.license }),
    studyDirection: conceptOfDirection(deck.direction),
    theme: deck.themes ?? [],
    keyword: deck.keywords ?? [],
    distribution: [distributionUrlOf(deck.url)],
    cardsDocument: deck.cardsDocumentUrl,
    reviewsDocument: deck.reviewsDocumentUrl,
    ...(deck.sourceUrl === undefined ? {} : { source: deck.sourceUrl }),
    ...(deck.newCardsPerDay === undefined ? {} : { newCardsPerDay: deck.newCardsPerDay }),
    ...(deck.maxReviewsPerDay === undefined ? {} : { maxReviewsPerDay: deck.maxReviewsPerDay }),
  };
}

/** The agent nodes a deck's record names as its creators, one per author. */
export function deckAgents(deck: Deck): { url: string; record: AgentV1 }[] {
  const agents = new Map<string, AgentV1>();
  for (const author of deck.authors) {
    agents.set(agentUrlOf(deck.url, author), agentToRecord(author));
  }
  return [...agents].map(([url, record]) => ({ url, record }));
}

/** The deck's distribution: its cards document, in Turtle. */
export function deckDistribution(deck: Deck): { url: string; record: DistributionV1 } {
  return {
    url: distributionUrlOf(deck.url),
    record: { accessUrl: deck.cardsDocumentUrl, mediaType: TURTLE_MEDIA_TYPE },
  };
}

/**
 * The content of a card record; null when a side has neither text nor a
 * picture — the one rule of the card shape a record cannot carry.
 */
export function cardContentFromRecord(data: CardV3): CardContent | null {
  const front = data.front ?? "";
  const back = data.back ?? "";
  if (front === "" && data.frontImage === undefined) return null;
  if (back === "" && data.backImage === undefined) return null;
  return {
    front,
    back,
    ...(data.frontImage === undefined ? {} : { frontImageUrl: data.frontImage }),
    ...(data.backImage === undefined ? {} : { backImageUrl: data.backImage }),
  };
}

export function cardFromRecord(url: string, storedVersion: number, data: CardV3): Card | null {
  const content = cardContentFromRecord(data);
  if (content === null) return null;
  return {
    id: fragmentIdOf(url),
    url,
    ...content,
    createdAt: data.created ?? "",
    formatVersion: storedVersion,
    ...retiredOf(data),
  };
}

/** A card of a library release; null as for cardContentFromRecord. */
export function libraryCardFromRecord(url: string, storedVersion: number, data: CardV3): LibraryCard | null {
  const content = cardContentFromRecord(data);
  if (content === null) return null;
  return { id: fragmentIdOf(url), ...content, formatVersion: storedVersion, ...retiredOf(data) };
}

function retiredOf(data: CardV3): { retired?: true } {
  return data.deprecated === true ? { retired: true } : {};
}

/** Empty text and a missing picture leave their fields out, as does a card in use its retirement. */
export function cardToRecord(card: CardContent & { retired?: true }, createdAt: string): CardV3 {
  return {
    ...(card.front === "" ? {} : { front: card.front }),
    ...(card.back === "" ? {} : { back: card.back }),
    ...(card.frontImageUrl === undefined ? {} : { frontImage: card.frontImageUrl }),
    ...(card.backImageUrl === undefined ? {} : { backImage: card.backImageUrl }),
    ...(createdAt === "" ? {} : { created: createdAt }),
    ...(card.retired === true ? { deprecated: true } : {}),
  };
}

export function libraryDeckFromRecord(
  url: string,
  storedVersion: number,
  data: LibraryDeckV4,
  cards: LibraryCard[],
  authorOf: AuthorOf,
): LibraryDeckContent {
  return {
    url,
    title: data.title,
    formatVersion: storedVersion,
    authors: data.creator.map(authorOf),
    ...(data.license === undefined ? {} : { license: data.license }),
    description: data.description,
    direction: directionOfConcept(data.studyDirection)!,
    version: data.version,
    seriesUrl: data.inSeries,
    ...(data.versionNotes === undefined ? {} : { versionNotes: data.versionNotes }),
    ...(data.modified === undefined ? {} : { modifiedAt: data.modified }),
    themes: [...data.theme],
    keywords: [...data.keyword],
    cards,
  };
}
