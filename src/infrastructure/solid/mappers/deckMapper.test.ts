import { describe, expect, it } from "vitest";
import {
  buildThing,
  createThing,
  type ThingBuilder,
  type ThingPersisted,
} from "@inrupt/solid-client";
import { fragmentIdOf, toCard, toDeck } from "./deckMapper";
import { DCTERMS, RDF, SM } from "../vocab";

const CATALOG = "https://pod.example/solid-memo/a/catalog.ttl";
const CARDS_DOC = "https://pod.example/solid-memo/a/decks/deck-1.ttl";
const REVIEWS_DOC = "https://pod.example/solid-memo/a/reviews/deck-1.ttl";

describe("fragmentIdOf", () => {
  it("returns the fragment of a subject URL", () => {
    expect(fragmentIdOf(`${CATALOG}#deck-1`)).toBe("deck-1");
  });
});

describe("toDeck", () => {
  function deckThing(
    build: (t: ThingBuilder<ThingPersisted>) => ThingBuilder<ThingPersisted>,
  ) {
    return build(buildThing(createThing({ url: `${CATALOG}#deck-1` }))).build();
  }

  it("maps a well-formed deck subject", () => {
    const thing = deckThing((t) =>
      t
        .addIri(RDF.type, SM.Deck)
        .addStringNoLocale(DCTERMS.title, "Kanji N5")
        .addDatetime(DCTERMS.created, new Date("2026-09-21T10:00:00.000Z"))
        .addIri(SM.cardsDocument, CARDS_DOC)
        .addIri(SM.reviewsDocument, REVIEWS_DOC),
    );
    expect(toDeck(thing)).toEqual({
      id: "deck-1",
      url: `${CATALOG}#deck-1`,
      name: "Kanji N5",
      cardsDocumentUrl: CARDS_DOC,
      reviewsDocumentUrl: REVIEWS_DOC,
      createdAt: "2026-09-21T10:00:00.000Z",
    });
  });

  it("falls back to the fragment id when the title is missing", () => {
    const thing = deckThing((t) =>
      t
        .addIri(RDF.type, SM.Deck)
        .addIri(SM.cardsDocument, CARDS_DOC)
        .addIri(SM.reviewsDocument, REVIEWS_DOC),
    );
    const deck = toDeck(thing)!;
    expect(deck.name).toBe("deck-1");
    expect(deck.createdAt).toBe("");
  });

  it("rejects subjects that are not sm:Deck", () => {
    expect(toDeck(deckThing((t) => t.addIri(RDF.type, SM.Card)))).toBeNull();
  });

  it("rejects decks without document links", () => {
    expect(
      toDeck(
        deckThing((t) =>
          t.addIri(RDF.type, SM.Deck).addIri(SM.cardsDocument, CARDS_DOC),
        ),
      ),
    ).toBeNull();
    expect(
      toDeck(
        deckThing((t) =>
          t.addIri(RDF.type, SM.Deck).addIri(SM.reviewsDocument, REVIEWS_DOC),
        ),
      ),
    ).toBeNull();
  });
});

describe("toCard", () => {
  function cardThing(
    build: (t: ThingBuilder<ThingPersisted>) => ThingBuilder<ThingPersisted>,
  ) {
    return build(
      buildThing(createThing({ url: `${CARDS_DOC}#card-1` })),
    ).build();
  }

  it("maps a well-formed card subject", () => {
    const thing = cardThing((t) =>
      t
        .addIri(RDF.type, SM.Card)
        .addStringNoLocale(SM.front, "水")
        .addStringNoLocale(SM.back, "water (mizu)")
        .addDatetime(DCTERMS.created, new Date("2026-09-21T10:00:00.000Z")),
    );
    expect(toCard(thing)).toEqual({
      id: "card-1",
      url: `${CARDS_DOC}#card-1`,
      front: "水",
      back: "water (mizu)",
      createdAt: "2026-09-21T10:00:00.000Z",
    });
  });

  it("tolerates a missing created date", () => {
    const thing = cardThing((t) =>
      t
        .addIri(RDF.type, SM.Card)
        .addStringNoLocale(SM.front, "f")
        .addStringNoLocale(SM.back, "b"),
    );
    expect(toCard(thing)!.createdAt).toBe("");
  });

  it("rejects subjects that are not sm:Card", () => {
    expect(toCard(cardThing((t) => t.addIri(RDF.type, SM.Deck)))).toBeNull();
  });

  it("rejects cards missing front or back", () => {
    expect(
      toCard(
        cardThing((t) =>
          t.addIri(RDF.type, SM.Card).addStringNoLocale(SM.front, "f"),
        ),
      ),
    ).toBeNull();
    expect(
      toCard(
        cardThing((t) =>
          t.addIri(RDF.type, SM.Card).addStringNoLocale(SM.back, "b"),
        ),
      ),
    ).toBeNull();
  });
});
