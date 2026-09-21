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
} from "@inrupt/solid-client";
import type { DeckRepository } from "../../application/ports";
import type { Card, Deck } from "../../domain/deck";
import { getSolidDatasetOrNull } from "./datasets";
import { toCard, toDeck } from "./mappers/deckMapper";
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

    async createDeck(instanceUrl, name): Promise<Deck> {
      const base = ensureTrailingSlash(instanceUrl);
      const catalogUrl = catalogUrlOf(base);
      const id = `deck-${randomId()}`;
      const deck: Deck = {
        id,
        url: `${catalogUrl}#${id}`,
        name,
        cardsDocumentUrl: `${base}decks/${id}.ttl`,
        reviewsDocumentUrl: `${base}reviews/${id}.ttl`,
        createdAt: now().toISOString(),
      };
      const dataset =
        (await getSolidDatasetOrNull(catalogUrl, fetch)) ??
        createSolidDataset();
      const updated = setThing(
        dataset,
        buildThing(createThing({ url: deck.url }))
          .addIri(RDF.type, SM.Deck)
          .addStringNoLocale(DCTERMS.title, name)
          .addDatetime(DCTERMS.created, now())
          .addIri(SM.cardsDocument, deck.cardsDocumentUrl)
          .addIri(SM.reviewsDocument, deck.reviewsDocumentUrl)
          .build(),
      );
      await saveSolidDatasetAt(catalogUrl, updated, { fetch });
      return deck;
    },

    async renameDeck(deck, name): Promise<Deck> {
      const catalogUrl = documentUrlOf(deck.url);
      const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
      const thing = dataset === null ? null : getThing(dataset, deck.url);
      if (dataset === null || thing === null) {
        throw new Error(`The deck <${deck.name}> no longer exists.`);
      }
      // Edit the existing subject in place so unknown triples survive.
      const updated = setThing(
        dataset,
        buildThing(thing).setStringNoLocale(DCTERMS.title, name).build(),
      );
      await saveSolidDatasetAt(catalogUrl, updated, { fetch });
      return { ...deck, name };
    },

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

    async addCard(deck, front, back): Promise<Card> {
      const id = `card-${randomId()}`;
      const card: Card = {
        id,
        url: `${deck.cardsDocumentUrl}#${id}`,
        front,
        back,
        createdAt: now().toISOString(),
      };
      const dataset =
        (await getSolidDatasetOrNull(deck.cardsDocumentUrl, fetch)) ??
        createSolidDataset();
      const updated = setThing(
        dataset,
        buildThing(createThing({ url: card.url }))
          .addIri(RDF.type, SM.Card)
          .addStringNoLocale(SM.front, front)
          .addStringNoLocale(SM.back, back)
          .addDatetime(DCTERMS.created, now())
          .build(),
      );
      await saveSolidDatasetAt(deck.cardsDocumentUrl, updated, { fetch });
      return card;
    },

    async updateCard(deck, card, front, back): Promise<Card> {
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
      // Edit the existing subject in place so unknown triples survive.
      const updated = setThing(
        dataset,
        buildThing(thing)
          .setStringNoLocale(SM.front, front)
          .setStringNoLocale(SM.back, back)
          .build(),
      );
      await saveSolidDatasetAt(deck.cardsDocumentUrl, updated, { fetch });
      return { ...card, front, back };
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
      // The review state joins on the same fragment id; remove it too.
      const reviews = await getSolidDatasetOrNull(
        deck.reviewsDocumentUrl,
        fetch,
      );
      if (reviews !== null) {
        await saveSolidDatasetAt(
          deck.reviewsDocumentUrl,
          removeThing(reviews, `${deck.reviewsDocumentUrl}#${card.id}`),
          { fetch },
        );
      }
    },
  };
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
