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

function thing(
  url: string,
  build: (t: ThingBuilder<ThingPersisted>) => ThingBuilder<ThingPersisted>,
) {
  return build(buildThing(createThing({ url }))).build();
}

describe("toLibraryDeck", () => {
  it("maps an index entry", () => {
    expect(
      toLibraryDeck(
        thing(DOC, (t) =>
          t
            .addIri(RDF.type, SM.Deck)
            .addStringNoLocale(DCTERMS.title, "Capitals")
            .addInteger(SM.cardCount, 243)
            .addStringNoLocale(DCTERMS.creator, "Anton Wiklund")
            .addStringNoLocale(DCTERMS.creator, "A friend")
            .addIri(DCTERMS.license, CC0),
        ),
      ),
    ).toEqual({
      url: DOC,
      name: "Capitals",
      cardCount: 243,
      authors: ["Anton Wiklund", "A friend"],
      license: CC0,
    });
  });

  it("falls back to the URL, zero cards, no authors and no licence", () => {
    expect(
      toLibraryDeck(thing(DOC, (t) => t.addIri(RDF.type, SM.Deck))),
    ).toEqual({ url: DOC, name: DOC, cardCount: 0, authors: [] });
  });

  it("ignores subjects that are not decks", () => {
    expect(
      toLibraryDeck(thing(`${INDEX}#x`, (t) => t.addIri(RDF.type, SM.Card))),
    ).toBeNull();
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
          .addIri(DCTERMS.license, CC0),
      ),
      thing(`${CANONICAL}#sweden`, (t) =>
        t
          .addIri(RDF.type, SM.Card)
          .addStringNoLocale(SM.front, "Sweden")
          .addStringNoLocale(SM.back, "Stockholm")
          .addInteger(SM.formatVersion, 1),
      ),
      // Not cards: wrong type, missing back.
      thing(`${CANONICAL}#note`, (t) => t.addStringNoLocale(SM.front, "x")),
      thing(`${CANONICAL}#half`, (t) =>
        t.addIri(RDF.type, SM.Card).addStringNoLocale(SM.front, "Norway"),
      ),
    );
    expect(toLibraryDeckContent(DOC, dataset)).toEqual({
      url: DOC,
      name: "Capitals",
      formatVersion: 1,
      authors: ["Anton Wiklund"],
      license: CC0,
      cards: [
        { id: "sweden", front: "Sweden", back: "Stockholm", formatVersion: 1 },
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
      `<${CANONICAL}#se> in <${DOC}> is in card format 3, newer than this app supports (1).`,
    );
  });

  it("rejects a document without a deck", () => {
    expect(() => toLibraryDeckContent(DOC, deckDocument())).toThrow(
      `<${DOC}> is not a Solid Memo deck.`,
    );
  });
});
