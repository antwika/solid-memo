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
  CARD_FORMAT_VERSION,
  DECK_FORMAT_VERSION,
} from "../../../domain/deck";
import type {
  LibraryCard,
  LibraryDeck,
  LibraryDeckContent,
  LibrarySource,
} from "../../../domain/library";
import { DCTERMS, RDF, SM } from "../vocab";
import { fragmentIdOf, toCardContent } from "./deckMapper";

/**
 * Map an index subject to a LibraryDeck; null when the subject is not a
 * listed deck. The subject is the deck document itself (the index lists
 * `<file.ttl> a sm:Deck`), so its URL is where the deck is fetched from.
 * The deck's sources are described by their own subjects in the same
 * index, which is why the index is passed along.
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
    ...(createdAt === undefined ? {} : { createdAt }),
    sources: getUrlAll(thing, DCTERMS.source).map((sourceUrl) =>
      toLibrarySource(sourceUrl, getThing(index, sourceUrl)),
    ),
  };
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
 * it would silently drop whatever the newer format added.
 */
export function toLibraryDeckContent(
  url: string,
  dataset: SolidDataset,
): LibraryDeckContent {
  const things = getThingAll(dataset);
  const deck = things.find((thing) =>
    getUrlAll(thing, RDF.type).includes(SM.Deck),
  );
  if (deck === undefined) {
    throw new Error(`<${url}> is not a Solid Memo deck.`);
  }
  // A missing version is the first format.
  const formatVersion = getInteger(deck, SM.formatVersion) ?? 1;
  if (formatVersion > DECK_FORMAT_VERSION) {
    throw new Error(
      `<${url}> is in deck format ${formatVersion}, newer than this app supports (${DECK_FORMAT_VERSION}).`,
    );
  }
  const license = getUrl(deck, DCTERMS.license);
  const description = getStringNoLocale(deck, DCTERMS.description);
  return {
    url,
    name: getStringNoLocale(deck, DCTERMS.title) ?? url,
    formatVersion,
    authors: getStringNoLocaleAll(deck, DCTERMS.creator),
    ...(license === null ? {} : { license }),
    ...(description === null ? {} : { description }),
    cards: things
      .map((thing) => toLibraryCard(url, thing))
      .filter((card): card is LibraryCard => card !== null),
  };
}

function toLibraryCard(url: string, thing: Thing): LibraryCard | null {
  if (!getUrlAll(thing, RDF.type).includes(SM.Card)) return null;
  const content = toCardContent(thing);
  if (content === null) return null;
  const formatVersion = getInteger(thing, SM.formatVersion) ?? 1;
  if (formatVersion > CARD_FORMAT_VERSION) {
    throw new Error(
      `<${asUrl(thing)}> in <${url}> is in card format ${formatVersion}, newer than this app supports (${CARD_FORMAT_VERSION}).`,
    );
  }
  return { id: fragmentIdOf(asUrl(thing)), ...content, formatVersion };
}
