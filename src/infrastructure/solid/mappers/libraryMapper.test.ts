import { describe, expect, it } from "vitest";
import {
  buildThing,
  createThing,
  mockSolidDatasetFrom,
  setThing,
  type SolidDataset,
  type ThingBuilder,
  type ThingPersisted,
} from "@inrupt/solid-client";
import { toLibraryDeck, toLibraryDeckContent } from "./libraryMapper";
import { DCTERMS, RDF, SM } from "../vocab";

const INDEX = "https://solid-memo.com/decks/index.ttl";
const DOC = "https://solid-memo.com/decks/capitals.ttl";
// Declared with @base, a deck's own subject need not be its fetch URL.
const CANONICAL = "https://solid-memo.com/decks/capitals";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const FLAG = "https://flagcdn.com/af.svg";

function thing(
  url: string,
  build: (t: ThingBuilder<ThingPersisted>) => ThingBuilder<ThingPersisted>,
) {
  return build(buildThing(createThing({ url }))).build();
}

const BY_SA = "https://creativecommons.org/licenses/by-sa/4.0/";
const WIKIPEDIA = "https://en.wikipedia.org/wiki/List_of_national_capitals";
const WIKIDATA = "https://www.wikidata.org/wiki/Property:P36";

describe("toLibraryDeck", () => {
  /** An index holding the given subjects. */
  function index(...things: ReturnType<typeof thing>[]): SolidDataset {
    return things.reduce(
      (dataset, t) => setThing(dataset, t),
      mockSolidDatasetFrom(INDEX) as SolidDataset,
    );
  }

  it("maps an index entry", () => {
    const deck = thing(DOC, (t) =>
      t
        .addIri(RDF.type, SM.Deck)
        .addStringNoLocale(DCTERMS.title, "Capitals")
        .addInteger(SM.cardCount, 243)
        .addStringNoLocale(DCTERMS.creator, "Anton Wiklund")
        .addStringNoLocale(DCTERMS.creator, "A friend")
        .addIri(DCTERMS.license, CC0)
        .addStringNoLocale(DCTERMS.description, "From Wikipedia.")
        .addDatetime(DCTERMS.created, new Date("2026-09-22T09:49:00.236Z")),
    );
    expect(toLibraryDeck(deck, index(deck))).toEqual({
      url: DOC,
      name: "Capitals",
      cardCount: 243,
      authors: ["Anton Wiklund", "A friend"],
      license: CC0,
      description: "From Wikipedia.",
      createdAt: "2026-09-22T09:49:00.236Z",
      sources: [],
    });
  });

  it("reads each source with what the index says about it, if anything", () => {
    const IUPAC = "https://iupac.org/what-we-do/periodic-table-of-elements/";
    const deck = thing(DOC, (t) =>
      t
        .addIri(RDF.type, SM.Deck)
        .addIri(DCTERMS.source, WIKIPEDIA)
        .addIri(DCTERMS.source, IUPAC)
        .addIri(DCTERMS.source, WIKIDATA),
    );
    const wikipedia = thing(WIKIPEDIA, (t) =>
      t
        .addStringNoLocale(DCTERMS.title, "List of national capitals")
        .addStringNoLocale(DCTERMS.creator, "Wikipedia contributors")
        .addIri(DCTERMS.license, BY_SA),
    );
    // Described by its author alone: no title, no licence stated.
    const iupac = thing(IUPAC, (t) =>
      t.addStringNoLocale(DCTERMS.creator, "IUPAC"),
    );
    expect(
      toLibraryDeck(deck, index(deck, wikipedia, iupac))?.sources,
    ).toEqual([
      {
        url: WIKIPEDIA,
        title: "List of national capitals",
        authors: ["Wikipedia contributors"],
        license: BY_SA,
      },
      { url: IUPAC, authors: ["IUPAC"] },
      // Listed but not described: the URL is all there is.
      { url: WIKIDATA, authors: [] },
    ]);
  });

  it("falls back to the URL, zero cards, no authors and no licence", () => {
    const deck = thing(DOC, (t) => t.addIri(RDF.type, SM.Deck));
    expect(toLibraryDeck(deck, index(deck))).toEqual({
      url: DOC,
      name: DOC,
      cardCount: 0,
      authors: [],
      sources: [],
    });
  });

  it("ignores subjects that are not decks", () => {
    const card = thing(`${INDEX}#x`, (t) => t.addIri(RDF.type, SM.Card));
    expect(toLibraryDeck(card, index(card))).toBeNull();
  });
});

describe("toLibraryDeckContent", () => {
  function deckDocument(
    ...things: ReturnType<typeof thing>[]
  ): SolidDataset {
    return things.reduce(
      (dataset, t) => setThing(dataset, t),
      mockSolidDatasetFrom(DOC) as SolidDataset,
    );
  }

  it("maps the deck and its well-formed cards, keeping the fragment ids", () => {
    const dataset = deckDocument(
      thing(CANONICAL, (t) =>
        t
          .addIri(RDF.type, SM.Deck)
          .addStringNoLocale(DCTERMS.title, "Capitals")
          .addInteger(SM.formatVersion, 1)
          .addStringNoLocale(DCTERMS.creator, "Anton Wiklund")
          .addIri(DCTERMS.license, CC0)
          .addStringNoLocale(DCTERMS.description, "From Wikipedia."),
      ),
      thing(`${CANONICAL}#sweden`, (t) =>
        t
          .addIri(RDF.type, SM.Card)
          .addStringNoLocale(SM.front, "Sweden")
          .addStringNoLocale(SM.back, "Stockholm")
          .addInteger(SM.formatVersion, 1),
      ),
      // A picture-only front (card format 2).
      thing(`${CANONICAL}#afghanistan`, (t) =>
        t
          .addIri(RDF.type, SM.Card)
          .addIri(SM.frontImage, FLAG)
          .addStringNoLocale(SM.back, "Afghanistan")
          .addInteger(SM.formatVersion, 2),
      ),
      // Not cards: wrong type, missing back, a picture that is a literal.
      thing(`${CANONICAL}#note`, (t) => t.addStringNoLocale(SM.front, "x")),
      thing(`${CANONICAL}#half`, (t) =>
        t.addIri(RDF.type, SM.Card).addStringNoLocale(SM.front, "Norway"),
      ),
      thing(`${CANONICAL}#literal`, (t) =>
        t
          .addIri(RDF.type, SM.Card)
          .addStringNoLocale(SM.frontImage, FLAG)
          .addStringNoLocale(SM.back, "Afghanistan"),
      ),
    );
    expect(toLibraryDeckContent(DOC, dataset)).toEqual({
      url: DOC,
      name: "Capitals",
      formatVersion: 1,
      authors: ["Anton Wiklund"],
      license: CC0,
      description: "From Wikipedia.",
      cards: [
        { id: "sweden", front: "Sweden", back: "Stockholm", formatVersion: 1 },
        {
          id: "afghanistan",
          front: "",
          back: "Afghanistan",
          frontImageUrl: FLAG,
          formatVersion: 2,
        },
      ],
    });
  });

  it("treats a deck and cards without a version as the first format", () => {
    const dataset = deckDocument(
      thing(CANONICAL, (t) => t.addIri(RDF.type, SM.Deck)),
      thing(`${CANONICAL}#se`, (t) =>
        t
          .addIri(RDF.type, SM.Card)
          .addStringNoLocale(SM.front, "Sweden")
          .addStringNoLocale(SM.back, "Stockholm"),
      ),
    );
    const content = toLibraryDeckContent(DOC, dataset);
    // An untitled deck is named after its URL; no authors, no licence.
    expect(content).toEqual({
      url: DOC,
      name: DOC,
      formatVersion: 1,
      authors: [],
      cards: [{ id: "se", front: "Sweden", back: "Stockholm", formatVersion: 1 }],
    });
  });

  it("refuses a deck in a newer format than it writes", () => {
    const dataset = deckDocument(
      thing(CANONICAL, (t) =>
        t.addIri(RDF.type, SM.Deck).addInteger(SM.formatVersion, 2),
      ),
    );
    expect(() => toLibraryDeckContent(DOC, dataset)).toThrow(
      `<${DOC}> is in deck format 2, newer than this app supports (1).`,
    );
  });

  it("refuses a card in a newer format than it writes", () => {
    const dataset = deckDocument(
      thing(CANONICAL, (t) => t.addIri(RDF.type, SM.Deck)),
      thing(`${CANONICAL}#se`, (t) =>
        t
          .addIri(RDF.type, SM.Card)
          .addStringNoLocale(SM.front, "Sweden")
          .addStringNoLocale(SM.back, "Stockholm")
          .addInteger(SM.formatVersion, 3),
      ),
    );
    expect(() => toLibraryDeckContent(DOC, dataset)).toThrow(
      `<${CANONICAL}#se> in <${DOC}> is in card format 3, newer than this app supports (2).`,
    );
  });

  it("rejects a document without a deck", () => {
    expect(() => toLibraryDeckContent(DOC, deckDocument())).toThrow(
      `<${DOC}> is not a Solid Memo deck.`,
    );
  });
});
