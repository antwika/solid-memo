import { agentToRecord, agentUrlOf } from "./agentRecord";
import { directionOfConcept, conceptOfDirection } from "./concepts";
import { defaultDeckDescription, distributionUrlOf, TURTLE_MEDIA_TYPE } from "./dcat";
import type { Card, CardContent, Deck } from "./deck";
import type { LibraryCard, LibraryDeckContent } from "./library";
import type { AgentV1, CardV2, DeckV3, DistributionV1, LibraryDeckV3 } from "@solid-memo/vocab/types.generated";
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
  data: DeckV3,
  authorOf: AuthorOf,
): Deck {
  return {
    id: fragmentIdOf(url),
    url,
    name: data.title,
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

export function deckToRecord(deck: Deck): DeckV3 {
  return {
    title: deck.name,
    description: deck.description ?? defaultDeckDescription(deck.name),
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
export function cardContentFromRecord(data: CardV2): CardContent | null {
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

export function cardFromRecord(url: string, storedVersion: number, data: CardV2): Card | null {
  const content = cardContentFromRecord(data);
  if (content === null) return null;
  return {
    id: fragmentIdOf(url),
    url,
    ...content,
    createdAt: data.created ?? "",
    formatVersion: storedVersion,
  };
}

/** Empty text and a missing picture leave their fields out. */
export function cardToRecord(content: CardContent, createdAt: string): CardV2 {
  return {
    ...(content.front === "" ? {} : { front: content.front }),
    ...(content.back === "" ? {} : { back: content.back }),
    ...(content.frontImageUrl === undefined ? {} : { frontImage: content.frontImageUrl }),
    ...(content.backImageUrl === undefined ? {} : { backImage: content.backImageUrl }),
    ...(createdAt === "" ? {} : { created: createdAt }),
  };
}

export function libraryDeckFromRecord(
  url: string,
  storedVersion: number,
  data: LibraryDeckV3,
  cards: LibraryCard[],
  authorOf: AuthorOf,
): LibraryDeckContent {
  return {
    url,
    name: data.title,
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
