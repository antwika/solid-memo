import {
  asUrl,
  getDatetime,
  getInteger,
  getStringNoLocale,
  getStringNoLocaleAll,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  type SolidDataset,
  type Thing,
} from "@inrupt/solid-client";
import {
  DEFAULT_DECK_DIRECTION,
  isDeckDirection,
  type DeckDirection,
} from "../../../domain/deck";
import { cardContentFromRecord, libraryDeckFromRecord } from "../../../domain/deckRecord";
import type { LibraryCard, LibraryDeck, LibrarySource } from "../../../domain/library";
import { LATEST_VERSION } from "../../../domain/shapes/generated";
import { migrate } from "../../../domain/shapes/migrations";
import { fragmentIdOf } from "../../../domain/subjectUrl";
import { readVersioned, storedVersionOf } from "../records";
import { DCTERMS, RDF, SM } from "../vocab";

/**
 * Map an index subject to a LibraryDeck; null when the subject is not a
 * listed deck. The subject is the deck document itself (the index lists
 * `<file.ttl> a sm:Deck`), so its URL is where the deck is fetched from.
 * The deck's sources are described by their own subjects in the same
 * index, which is why the index is passed along. The index is a listing,
 * not a shape: it is read field by field, leniently.
 */
export function toLibraryDeck(
  thing: Thing,
  index: SolidDataset,
): LibraryDeck | null {
  if (!getUrlAll(thing, RDF.type).includes(SM.Deck)) return null;
  const url = asUrl(thing);
  const license = getUrl(thing, DCTERMS.license);
  const description = getStringNoLocale(thing, DCTERMS.description);
  const createdAt = getDatetime(thing, DCTERMS.created)?.toISOString();
  return {
    url,
    name: getStringNoLocale(thing, DCTERMS.title) ?? url,
    cardCount: getInteger(thing, SM.cardCount) ?? 0,
    authors: getStringNoLocaleAll(thing, DCTERMS.creator),
    ...(license === null ? {} : { license }),
    ...(description === null ? {} : { description }),
    direction: toDeckDirection(getStringNoLocale(thing, SM.direction)),
    ...(createdAt === undefined ? {} : { createdAt }),
    sources: getUrlAll(thing, DCTERMS.source).map((sourceUrl) =>
      toLibrarySource(sourceUrl, getThing(index, sourceUrl)),
    ),
  };
}

/** A listed direction; absent or unknown means front→back. */
function toDeckDirection(value: string | null): DeckDirection {
  return value !== null && isDeckDirection(value) ? value : DEFAULT_DECK_DIRECTION;
}

/** A source by URL, plus whatever the index says about it (maybe nothing). */
function toLibrarySource(url: string, thing: Thing | null): LibrarySource {
  if (thing === null) return { url, authors: [] };
  const title = getStringNoLocale(thing, DCTERMS.title);
  const license = getUrl(thing, DCTERMS.license);
  return {
    url,
    ...(title === null ? {} : { title }),
    authors: getStringNoLocaleAll(thing, DCTERMS.creator),
    ...(license === null ? {} : { license }),
  };
}

/**
 * Map a fetched deck document to its content. The deck is found by
 * type, not by URL: a document's own subject may be its canonical URL
 * (declared with @base) rather than the URL it was fetched from. A deck
 * or card in a newer format than this app writes is refused: importing
 * it would silently drop whatever the newer format added. Older formats
 * are brought up to the current one in memory.
 */
export function toLibraryDeckContent(
  url: string,
  dataset: SolidDataset,
): LibraryDeckContentOf {
  const things = getThingAll(dataset);
  const deck = things.find((thing) =>
    getUrlAll(thing, RDF.type).includes(SM.Deck),
  );
  const formatVersion = deck === undefined ? 1 : storedVersionOf(deck);
  if (formatVersion > LATEST_VERSION.libraryDeck) {
    throw new Error(
      `<${url}> is in deck format ${formatVersion}, newer than this app supports (${LATEST_VERSION.libraryDeck}).`,
    );
  }
  const read = deck === undefined ? null : readVersioned(deck, "libraryDeck");
  if (read === null) {
    throw new Error(`<${url}> is not a Solid Memo deck.`);
  }
  const cards = things
    .map((thing) => toLibraryCard(url, thing))
    .filter((card): card is LibraryCard => card !== null);
  return libraryDeckFromRecord(
    url,
    read.storedVersion,
    migrate("libraryDeck", read.record),
    cards,
  );
}

type LibraryDeckContentOf = ReturnType<typeof libraryDeckFromRecord>;

function toLibraryCard(url: string, thing: Thing): LibraryCard | null {
  if (!getUrlAll(thing, RDF.type).includes(SM.Card)) return null;
  const formatVersion = storedVersionOf(thing);
  if (formatVersion > LATEST_VERSION.card) {
    throw new Error(
      `<${asUrl(thing)}> in <${url}> is in card format ${formatVersion}, newer than this app supports (${LATEST_VERSION.card}).`,
    );
  }
  const read = readVersioned(thing, "card");
  if (read === null) return null;
  const content = cardContentFromRecord(migrate("card", read.record));
  if (content === null) return null;
  return { id: fragmentIdOf(asUrl(thing)), ...content, formatVersion };
}
