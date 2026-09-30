import {
  createSolidDataset,
  getDatetime,
  getThing,
  getThingAll,
  removeThing,
  setThing,
  type SolidDataset,
  type ThingPersisted,
} from "@inrupt/solid-client";
import { inEnglish, shown, withEnglish, type LangText } from "@solid-memo/domain/langText";
import type { DeckRepository } from "@solid-memo/application/ports";
import {
  CARD_FORMAT_VERSION,
  DECK_FORMAT_VERSION,
  DEFAULT_DECK_DIRECTION,
  type Card,
  type CardContent,
  type Deck,
  type DeckDirection,
} from "@solid-memo/domain/deck";
import { cardToRecord } from "@solid-memo/domain/deckRecord";
import { catalogUrlOf, ensureTrailingSlash } from "@solid-memo/domain/instanceLayout";
import { documentUrlOf } from "@solid-memo/domain/subjectUrl";
import { CARD_V2 } from "@solid-memo/vocab/descriptors.generated";
import { deleteDataset, getSolidDatasetOrNull, saveDataset } from "./datasets";
import { DCTERMS } from "./vocab";
import {
  deckSubjects,
  toCard,
  toCatalog,
  toDecks,
  withCatalog,
  withDeck,
  withoutDeck,
} from "./mappers/deckMapper";
import { noWriteCheck, type WriteCheck } from "./writeCheck";
import { reviewSubjectUrl } from "./mappers/reviewStateMapper";
import { recordThing } from "./records";

export interface SolidDeckRepositoryDeps {
  fetch: typeof globalThis.fetch;
  now: () => Date;
  randomId: () => string;
  /** Checks what is about to be written; see writeCheck.ts. */
  checkWrite?: WriteCheck;
}

export function createSolidDeckRepository({
  fetch,
  now,
  randomId,
  checkWrite = noWriteCheck,
}: SolidDeckRepositoryDeps): DeckRepository {
  /** Save a document once the subjects the write touched are checked. */
  async function save(url: string, dataset: SolidDataset, subjects: readonly string[]): Promise<void> {
    await checkWrite(dataset, subjects);
    await saveDataset(url, dataset, fetch);
  }

  return {
    async listDecks(instanceUrl): Promise<Deck[]> {
      const catalogUrl = catalogUrlOf(instanceUrl);
      const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
      if (dataset === null) return [];
      return toDecks(dataset);
    },

    async readCatalog(instanceUrl) {
      const catalogUrl = catalogUrlOf(instanceUrl);
      const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
      return dataset === null ? null : toCatalog(dataset, catalogUrl);
    },

    async saveCatalog(instanceUrl, catalog) {
      const catalogUrl = catalogUrlOf(instanceUrl);
      const dataset =
        (await getSolidDatasetOrNull(catalogUrl, fetch)) ?? createSolidDataset();
      await save(catalogUrl, withCatalog(dataset, catalogUrl, catalog), [
        `${catalogUrl}#catalog`,
        catalog.publisher.webId,
      ]);
    },

    createDeck(instanceUrl, name): Promise<Deck> {
      return registerDeck(newDeck(instanceUrl, inEnglish(name)));
    },

    async importDeck(instanceUrl, content): Promise<Deck> {
      const deck = newDeck(instanceUrl, content.title, content);
      let cards = createSolidDataset();
      for (const card of content.cards) {
        cards = setThing(cards, cardThing(deck, card, null));
      }
      await save(
        deck.cardsDocumentUrl,
        cards,
        content.cards.map((card) => `${deck.cardsDocumentUrl}#${card.id}`),
      );
      return registerDeck(deck);
    },

    renameDeck(deck, name): Promise<Deck> {
      return saveDeck({ ...deck, title: withEnglish(deck.title, name) });
    },

    saveDeck,

    async removeDeck(deck): Promise<void> {
      await deleteDocumentIfPresent(deck.cardsDocumentUrl, fetch);
      await deleteDocumentIfPresent(deck.reviewsDocumentUrl, fetch);
      const catalogUrl = documentUrlOf(deck.url);
      const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
      if (dataset === null) return;
      await saveDataset(catalogUrl, withoutDeck(dataset, deck), fetch);
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
      const updated = setThing(dataset, cardThing(deck, card, null));
      await save(deck.cardsDocumentUrl, updated, [card.url]);
      return card;
    },

    async updateCard(deck, card, content): Promise<Card> {
      const dataset = await getSolidDatasetOrNull(
        deck.cardsDocumentUrl,
        fetch,
      );
      if (dataset === null) {
        throw new Error(
          `The cards document of <${shown(deck.title)}> no longer exists.`,
        );
      }
      const thing = getThing(dataset, card.url);
      if (thing === null) {
        throw new Error(`Card <${card.url}> no longer exists.`);
      }
      const updated: Card = {
        id: card.id,
        url: card.url,
        createdAt: card.createdAt,
        ...content,
        formatVersion: CARD_FORMAT_VERSION,
      };
      await save(
        deck.cardsDocumentUrl,
        setThing(dataset, cardThing(deck, updated, thing)),
        [updated.url],
      );
      return updated;
    },

    async saveCards(deck, cards): Promise<void> {
      const dataset = await getSolidDatasetOrNull(
        deck.cardsDocumentUrl,
        fetch,
      );
      if (dataset === null) return;
      const updated = cards.reduce((current, card) => {
        const thing = getThing(current, card.url);
        return thing === null
          ? current
          : setThing(current, cardThing(deck, card, thing));
      }, dataset);
      await save(deck.cardsDocumentUrl, updated, cards.map((card) => card.url));
    },

    async applyCardChanges(deck, { save: saved, remove }): Promise<void> {
      const dataset =
        (await getSolidDatasetOrNull(deck.cardsDocumentUrl, fetch)) ?? createSolidDataset();
      const urlOf = (id: string) => `${deck.cardsDocumentUrl}#${id}`;
      let updated = dataset;
      for (const card of saved) {
        const existing = getThing(updated, urlOf(card.id));
        const createdAt = existing === null ? undefined : getDatetime(existing, DCTERMS.created)?.toISOString();
        updated = setThing(
          updated,
          cardThing(deck, { ...card, ...(createdAt === undefined ? {} : { createdAt }) }, existing),
        );
      }
      for (const id of remove) updated = removeThing(updated, urlOf(id));
      await save(deck.cardsDocumentUrl, updated, saved.map((card) => urlOf(card.id)));
    },

    async removeCard(deck, card): Promise<void> {
      const dataset = await getSolidDatasetOrNull(
        deck.cardsDocumentUrl,
        fetch,
      );
      if (dataset !== null) {
        await saveDataset(deck.cardsDocumentUrl, removeThing(dataset, card.url), fetch);
      }
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
        await saveDataset(deck.reviewsDocumentUrl, updated, fetch);
      }
    },
  };

  /**
   * Rewrite a deck's catalog entry in place, in this app's format: the
   * entry's own predicates are replaced from the deck, so unknown
   * triples survive; its agents and distribution are written beside it.
   * Returns the deck as written.
   */
  async function saveDeck(deck: Deck): Promise<Deck> {
    const catalogUrl = documentUrlOf(deck.url);
    const dataset = await getSolidDatasetOrNull(catalogUrl, fetch);
    const thing = dataset === null ? null : getThing(dataset, deck.url);
    if (dataset === null || thing === null) {
      throw new Error(`The deck <${shown(deck.title)}> no longer exists.`);
    }
    const written: Deck = { ...deck, formatVersion: DECK_FORMAT_VERSION };
    await save(catalogUrl, withDeck(dataset, written), deckSubjects(written));
    return written;
  }

  /**
   * A fresh deck's identity and document locations, before any write.
   * An import carries over the library release's provenance — its
   * authors, licence, description, topics and keywords, and which
   * release it is — and the direction it is meant to be studied in. The
   * format version is always this app's own: the copy is written in the
   * format this app writes.
   */
  function newDeck(
    instanceUrl: string,
    title: LangText,
    source?: {
      url: string;
      authors: string[];
      license?: string;
      description?: LangText;
      direction: DeckDirection;
      themes: string[];
      keywords: string[];
    },
  ): Deck {
    const base = ensureTrailingSlash(instanceUrl);
    const id = `deck-${randomId()}`;
    return {
      id,
      url: `${catalogUrlOf(base)}#${id}`,
      title,
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
      ...(source === undefined || source.themes.length === 0 ? {} : { themes: source.themes }),
      ...(source === undefined || source.keywords.length === 0
        ? {}
        : { keywords: source.keywords }),
    };
  }

  /** Add a deck's catalog entry. */
  async function registerDeck(deck: Deck): Promise<Deck> {
    const catalogUrl = documentUrlOf(deck.url);
    const dataset =
      (await getSolidDatasetOrNull(catalogUrl, fetch)) ??
      createSolidDataset();
    await save(catalogUrl, withDeck(dataset, deck), deckSubjects(deck));
    return deck;
  }

  /**
   * The RDF subject of a card in the deck's cards document, written in
   * this app's format onto the existing subject when there is one: the
   * card's own predicates are replaced (empty text and a missing picture
   * remove theirs), anything else on the subject survives. A new card is
   * stamped with the time of writing.
   */
  function cardThing(
    deck: Deck,
    card: CardContent & { id: string; createdAt?: string },
    existing: ThingPersisted | null,
  ): ThingPersisted {
    return recordThing(
      `${deck.cardsDocumentUrl}#${card.id}`,
      CARD_V2,
      cardToRecord(card, card.createdAt ?? now().toISOString()),
      existing,
    );
  }
}

async function deleteDocumentIfPresent(
  url: string,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  const existing = await getSolidDatasetOrNull(url, fetch);
  if (existing !== null) {
    await deleteDataset(url, existing, fetch);
  }
}
