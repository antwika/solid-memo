import {
  buildThing,
  createSolidDataset,
  createThing,
  deleteSolidDataset,
  getThing,
  getThingAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
  type ThingPersisted,
} from "@inrupt/solid-client";
import type { DeckRepository } from "../../application/ports";
import {
  CARD_FORMAT_VERSION,
  DECK_FORMAT_VERSION,
  DEFAULT_DECK_DIRECTION,
  type Card,
  type CardContent,
  type Deck,
  type DeckDirection,
} from "../../domain/deck";
import { getSolidDatasetOrNull } from "./datasets";
import { toCard, toDeck } from "./mappers/deckMapper";
import { reviewSubjectUrl } from "./mappers/reviewStateMapper";
import { ensureTrailingSlash } from "./urls";
import { DCTERMS, RDF, SM } from "./vocab";

export interface SolidDeckRepositoryDeps {
  fetch: typeof globalThis.fetch;
  now: () => Date;
  randomId: () => string;
}

export function createSolidDeckRepository({
  fetch,
  now,
  randomId,
}: SolidDeckRepositoryDeps): DeckRepository {
  return {
    async listDecks(instanceUrl): Promise<Deck[]> {
      const catalogUrl = catalogUrlOf(instanceUrl);
      const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
      if (dataset === null) return [];
      return getThingAll(dataset)
        .map(toDeck)
        .filter((deck): deck is Deck => deck !== null);
    },

    createDeck(instanceUrl, name): Promise<Deck> {
      return registerDeck(newDeck(instanceUrl, name));
    },

    async importDeck(instanceUrl, content): Promise<Deck> {
      // Cards first: a deck listed in the catalog whose cards document
      // failed to save would look like an empty import; an unlisted cards
      // document is merely an orphan file.
      const deck = newDeck(instanceUrl, content.name, content);
      let cards = createSolidDataset();
      for (const card of content.cards) {
        cards = setThing(cards, cardThing(deck, card));
      }
      await saveSolidDatasetAt(deck.cardsDocumentUrl, cards, { fetch });
      return registerDeck(deck);
    },

    renameDeck(deck, name): Promise<Deck> {
      return saveDeck({ ...deck, name });
    },

    saveDeck,

    async removeDeck(deck): Promise<void> {
      await deleteDocumentIfPresent(deck.cardsDocumentUrl, fetch);
      await deleteDocumentIfPresent(deck.reviewsDocumentUrl, fetch);
      const catalogUrl = documentUrlOf(deck.url);
      const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
      if (dataset === null) return;
      await saveSolidDatasetAt(catalogUrl, removeThing(dataset, deck.url), {
        fetch,
      });
    },

    async listCards(deck): Promise<Card[]> {
      const dataset = await getSolidDatasetOrNull(
        deck.cardsDocumentUrl,
        fetch,
      );
      if (dataset === null) return [];
      return getThingAll(dataset)
        .map(toCard)
        .filter((card): card is Card => card !== null);
    },

    async addCard(deck, content): Promise<Card> {
      const id = `card-${randomId()}`;
      const card: Card = {
        id,
        url: `${deck.cardsDocumentUrl}#${id}`,
        ...content,
        createdAt: now().toISOString(),
        formatVersion: CARD_FORMAT_VERSION,
      };
      const dataset =
        (await getSolidDatasetOrNull(deck.cardsDocumentUrl, fetch)) ??
        createSolidDataset();
      const updated = setThing(dataset, cardThing(deck, card));
      await saveSolidDatasetAt(deck.cardsDocumentUrl, updated, { fetch });
      return card;
    },

    async updateCard(deck, card, content): Promise<Card> {
      const dataset = await getSolidDatasetOrNull(
        deck.cardsDocumentUrl,
        fetch,
      );
      if (dataset === null) {
        throw new Error(
          `The cards document of <${deck.name}> no longer exists.`,
        );
      }
      const thing = getThing(dataset, card.url);
      if (thing === null) {
        throw new Error(`Card <${card.url}> no longer exists.`);
      }
      // An edited card is written in this app's format, whatever it was.
      const updated: Card = {
        id: card.id,
        url: card.url,
        createdAt: card.createdAt,
        ...content,
        formatVersion: CARD_FORMAT_VERSION,
      };
      await saveSolidDatasetAt(
        deck.cardsDocumentUrl,
        setThing(dataset, applyCard(thing, updated)),
        { fetch },
      );
      return updated;
    },

    async saveCards(deck, cards): Promise<void> {
      const dataset = await getSolidDatasetOrNull(
        deck.cardsDocumentUrl,
        fetch,
      );
      // No document: nothing the cards could have come from is left.
      if (dataset === null) return;
      const updated = cards.reduce((current, card) => {
        const thing = getThing(current, card.url);
        return thing === null ? current : setThing(current, applyCard(thing, card));
      }, dataset);
      await saveSolidDatasetAt(deck.cardsDocumentUrl, updated, { fetch });
    },

    async removeCard(deck, card): Promise<void> {
      const dataset = await getSolidDatasetOrNull(
        deck.cardsDocumentUrl,
        fetch,
      );
      if (dataset !== null) {
        await saveSolidDatasetAt(
          deck.cardsDocumentUrl,
          removeThing(dataset, card.url),
          { fetch },
        );
      }
      // The review state joins on the same fragment id; remove it too, in
      // both directions.
      const reviews = await getSolidDatasetOrNull(
        deck.reviewsDocumentUrl,
        fetch,
      );
      if (reviews !== null) {
        let updated = reviews;
        for (const direction of ["front-to-back", "back-to-front"] as const) {
          updated = removeThing(
            updated,
            reviewSubjectUrl(deck.reviewsDocumentUrl, {
              cardId: card.id,
              direction,
            }),
          );
        }
        await saveSolidDatasetAt(deck.reviewsDocumentUrl, updated, { fetch });
      }
    },
  };

  /**
   * Rewrite a deck's catalog entry in place — name, direction and, as
   * with every write, this app's format version — so unknown triples
   * survive. Returns the deck as written.
   */
  async function saveDeck(deck: Deck): Promise<Deck> {
    const catalogUrl = documentUrlOf(deck.url);
    const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
    const thing = dataset === null ? null : getThing(dataset, deck.url);
    if (dataset === null || thing === null) {
      throw new Error(`The deck <${deck.name}> no longer exists.`);
    }
    const written: Deck = { ...deck, formatVersion: DECK_FORMAT_VERSION };
    const updated = setThing(
      dataset,
      buildThing(thing)
        .setStringNoLocale(DCTERMS.title, written.name)
        .setStringNoLocale(SM.direction, written.direction)
        .setInteger(SM.formatVersion, written.formatVersion)
        .build(),
    );
    await saveSolidDatasetAt(catalogUrl, updated, { fetch });
    return written;
  }

  /**
   * A fresh deck's identity and document locations, before any write.
   * An import carries over the library deck's provenance — its authors,
   * licence, description and where it came from — and the direction it
   * is meant to be studied in. The format version is always this app's
   * own: the copy is written in the format this app writes.
   */
  function newDeck(
    instanceUrl: string,
    name: string,
    source?: {
      url: string;
      authors: string[];
      license?: string;
      description?: string;
      direction: DeckDirection;
    },
  ): Deck {
    const base = ensureTrailingSlash(instanceUrl);
    const id = `deck-${randomId()}`;
    return {
      id,
      url: `${catalogUrlOf(base)}#${id}`,
      name,
      cardsDocumentUrl: `${base}decks/${id}.ttl`,
      reviewsDocumentUrl: `${base}reviews/${id}.ttl`,
      createdAt: now().toISOString(),
      formatVersion: DECK_FORMAT_VERSION,
      direction: source?.direction ?? DEFAULT_DECK_DIRECTION,
      authors: source?.authors ?? [],
      ...(source?.license === undefined ? {} : { license: source.license }),
      ...(source?.description === undefined
        ? {}
        : { description: source.description }),
      ...(source === undefined ? {} : { sourceUrl: source.url }),
    };
  }

  /** Add a deck's catalog entry. */
  async function registerDeck(deck: Deck): Promise<Deck> {
    const catalogUrl = documentUrlOf(deck.url);
    const dataset =
      (await getSolidDatasetOrNull(catalogUrl, fetch)) ??
      createSolidDataset();
    const entry = buildThing(createThing({ url: deck.url }))
      .addIri(RDF.type, SM.Deck)
      .addStringNoLocale(DCTERMS.title, deck.name)
      .addDatetime(DCTERMS.created, now())
      .addInteger(SM.formatVersion, deck.formatVersion)
      .addStringNoLocale(SM.direction, deck.direction)
      .addIri(SM.cardsDocument, deck.cardsDocumentUrl)
      .addIri(SM.reviewsDocument, deck.reviewsDocumentUrl);
    for (const author of deck.authors) {
      entry.addStringNoLocale(DCTERMS.creator, author);
    }
    if (deck.license !== undefined) {
      entry.addIri(DCTERMS.license, deck.license);
    }
    if (deck.description !== undefined) {
      entry.addStringNoLocale(DCTERMS.description, deck.description);
    }
    if (deck.sourceUrl !== undefined) {
      entry.addIri(DCTERMS.source, deck.sourceUrl);
    }
    const updated = setThing(dataset, entry.build());
    await saveSolidDatasetAt(catalogUrl, updated, { fetch });
    return deck;
  }

  /**
   * The RDF subject of a new card, in the deck's cards document, written
   * in this app's format.
   */
  function cardThing(deck: Deck, card: CardContent & { id: string }) {
    const thing = buildThing(
      createThing({ url: `${deck.cardsDocumentUrl}#${card.id}` }),
    )
      .addIri(RDF.type, SM.Card)
      .addDatetime(DCTERMS.created, now())
      .build();
    return applyCard(thing, { ...card, formatVersion: CARD_FORMAT_VERSION });
  }
}

/**
 * Write a card's content and format version onto its existing subject,
 * replacing only the triples this app owns: empty text and a missing
 * picture remove theirs, anything else on the subject survives. Pictures
 * are IRIs — never string literals — so a reader finds them with getUrl.
 */
function applyCard(
  thing: ThingPersisted,
  card: CardContent & { formatVersion: number },
): ThingPersisted {
  const builder = buildThing(thing)
    .removeAll(SM.front)
    .removeAll(SM.back)
    .removeAll(SM.frontImage)
    .removeAll(SM.backImage)
    .setInteger(SM.formatVersion, card.formatVersion);
  if (card.front !== "") builder.addStringNoLocale(SM.front, card.front);
  if (card.back !== "") builder.addStringNoLocale(SM.back, card.back);
  if (card.frontImageUrl !== undefined) {
    builder.addIri(SM.frontImage, card.frontImageUrl);
  }
  if (card.backImageUrl !== undefined) {
    builder.addIri(SM.backImage, card.backImageUrl);
  }
  return builder.build();
}

function catalogUrlOf(instanceUrl: string): string {
  return `${ensureTrailingSlash(instanceUrl)}catalog.ttl`;
}

/** Document URL of a subject URL (strips the fragment). */
function documentUrlOf(subjectUrl: string): string {
  return subjectUrl.split("#")[0];
}

async function deleteDocumentIfPresent(
  url: string,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  const existing = await getSolidDatasetOrNull(url, fetch);
  if (existing !== null) {
    await deleteSolidDataset(url, { fetch });
  }
}
