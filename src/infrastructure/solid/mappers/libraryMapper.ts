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
import { directionOfConcept } from "../../../domain/concepts";
import { agentUrlOf } from "../../../domain/agentRecord";
import { cardContentFromRecord, libraryDeckFromRecord } from "../../../domain/deckRecord";
import type {
  LibraryCard,
  LibraryDeck,
  LibraryRelease,
  LibrarySource,
} from "../../../domain/library";
import { LATEST_VERSION } from "../../../domain/shapes/generated";
import { migrate } from "../../../domain/shapes/migrations";
import { fragmentIdOf } from "../../../domain/subjectUrl";
import { readVersioned, storedVersionOf } from "../records";
import { agentNamesOf } from "./deckMapper";
import { ADMS, DCAT, DCTERMS, RDF, SM } from "../vocab";

/**
 * Every deck the library's index lists (see docs/deck-library.md): the
 * catalogue's datasets are the decks' series, each described by its
 * current release, which the index carries in full but for its cards.
 * A series or release that does not fit its shape is left out. The
 * index is a document of relative IRIs, so every URL here is where it
 * can be fetched from.
 */
export function toLibraryDecks(index: SolidDataset): LibraryDeck[] {
  const catalog = getThingAll(index).find((thing) =>
    getUrlAll(thing, RDF.type).includes(DCAT.Catalog),
  );
  if (catalog === undefined) return [];
  const names = agentNamesOf(index);
  return getUrlAll(catalog, DCAT.dataset)
    .map((seriesUrl) => toLibraryDeck(index, seriesUrl, names))
    .filter((deck): deck is LibraryDeck => deck !== null);
}

function toLibraryDeck(
  index: SolidDataset,
  seriesUrl: string,
  names: ReadonlyMap<string, string>,
): LibraryDeck | null {
  const seriesThing = getThing(index, seriesUrl);
  const series = seriesThing === null ? null : readVersioned(seriesThing, "libraryDeckSeries");
  if (series === null) return null;
  const { hasCurrentVersion, hasVersion } = migrate("libraryDeckSeries", series.record, { subject: seriesUrl });
  const currentThing = getThing(index, hasCurrentVersion);
  const current = currentThing === null ? null : readVersioned(currentThing, "libraryDeck");
  if (current === null) return null;
  const release = migrate("libraryDeck", current.record, { subject: hasCurrentVersion });
  const createdAt = release.created;
  const modifiedAt = release.modified;
  return {
    url: hasCurrentVersion,
    seriesUrl,
    version: release.version,
    ...(release.versionNotes === undefined ? {} : { versionNotes: release.versionNotes }),
    releases: hasVersion
      .map((url) => toLibraryRelease(index, url))
      .sort((a, b) => Number(a.version) - Number(b.version)),
    name: release.title,
    cardCount: getInteger(currentThing!, SM.cardCount) ?? 0,
    authors: release.creator.map((agent) => names.get(agent) ?? agent),
    ...(release.license === undefined ? {} : { license: release.license }),
    description: release.description,
    direction: directionOfConcept(release.studyDirection)!,
    ...(createdAt === undefined ? {} : { createdAt }),
    ...(modifiedAt === undefined ? {} : { modifiedAt }),
    themes: [...release.theme],
    keywords: [...release.keyword],
    sources: release.wasDerivedFrom.map((sourceUrl) =>
      toLibrarySource(sourceUrl, getThing(index, sourceUrl)),
    ),
  };
}

/** A release by URL, with what the index says about it (maybe nothing). */
function toLibraryRelease(index: SolidDataset, url: string): LibraryRelease {
  const thing = getThing(index, url);
  if (thing === null) return { url, version: "?" };
  const issued = getDatetime(thing, DCTERMS.issued);
  const notes = getStringNoLocale(thing, ADMS.versionNotes);
  return {
    url,
    version: getStringNoLocale(thing, DCAT.version) ?? "?",
    ...(issued === null ? {} : { issued: issued.toISOString() }),
    ...(notes === null ? {} : { notes }),
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
  const subject = asUrl(deck!);
  const names = agentNamesOf(dataset);
  if (read.record.version !== 3) {
    for (const author of read.record.data.creator) names.set(agentUrlOf(subject, author), author);
  }
  return libraryDeckFromRecord(
    url,
    read.storedVersion,
    migrate("libraryDeck", read.record, { subject }),
    cards,
    (agent) => names.get(agent) ?? agent,
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
  const content = cardContentFromRecord(migrate("card", read.record, { subject: asUrl(thing) }));
  if (content === null) return null;
  return { id: fragmentIdOf(asUrl(thing)), ...content, formatVersion };
}
