import { describe, expect, it } from "vitest";
import type { Deck } from "./deck";
import {
  cardContentFromRecord,
  cardFromRecord,
  cardToRecord,
  deckAgents,
  deckDistribution,
  deckFromRecord,
  deckToRecord,
  libraryDeckFromRecord,
} from "./deckRecord";

const CATALOG = "https://pod.example/solid-memo/a/catalog.ttl";
const CARDS = "https://pod.example/solid-memo/a/decks/deck-1.ttl";
const REVIEWS = "https://pod.example/solid-memo/a/reviews/deck-1.ttl";
const FLAG = "https://flagcdn.com/se.svg";

const deck: Deck = {
  id: "deck-1",
  url: `${CATALOG}#deck-1`,
  name: "Capitals",
  cardsDocumentUrl: CARDS,
  reviewsDocumentUrl: REVIEWS,
  createdAt: "2026-09-21T10:00:00.000Z",
  modifiedAt: "2026-09-27T20:12:13.000Z",
  formatVersion: 2,
  direction: "bidirectional",
  authors: ["Anton Wiklund"],
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
  description: "From Wikipedia.",
  sourceUrl: "https://solid-memo.com/decks/capitals.ttl",
};

const SM = "https://solid-memo.com/vocab/v1#";
const TOPIC = "https://solid-memo.com/vocab/topics#geography";
const ANTON = `${CATALOG}#agent-anton-wiklund`;
const byAgent = (agent: string) => (agent === ANTON ? "Anton Wiklund" : agent);

describe("deck records", () => {
  it("round-trip a deck with every field, its creators as agents", () => {
    const full: Deck = {
      ...deck,
      formatVersion: 3,
      sourceUrl: "https://solid-memo.com/decks/capitals/1.ttl",
      themes: [TOPIC],
      keywords: ["capitals"],
    };
    const record = deckToRecord(full);
    expect(record).toEqual({
      title: "Capitals",
      description: deck.description,
      created: deck.createdAt,
      modified: deck.modifiedAt,
      creator: [ANTON],
      license: deck.license,
      studyDirection: `${SM}bidirectional`,
      theme: [TOPIC],
      keyword: ["capitals"],
      distribution: [`${deck.url}-cards`],
      cardsDocument: CARDS,
      reviewsDocument: REVIEWS,
      source: full.sourceUrl,
    });
    expect(deckFromRecord(deck.url, 3, record, byAgent)).toEqual(full);
  });

  it("give a deck without a description the default one, and leave out what it does not have", () => {
    const bare: Deck = {
      id: "deck-1",
      url: `${CATALOG}#deck-1`,
      name: "Own",
      cardsDocumentUrl: CARDS,
      reviewsDocumentUrl: REVIEWS,
      createdAt: "",
      formatVersion: 1,
      direction: "front-to-back",
      authors: [],
    };
    const record = deckToRecord(bare);
    expect(record).toEqual({
      title: "Own",
      description: "Flashcards: Own.",
      creator: [],
      studyDirection: `${SM}frontToBack`,
      theme: [],
      keyword: [],
      distribution: [`${bare.url}-cards`],
      cardsDocument: CARDS,
      reviewsDocument: REVIEWS,
    });
    expect(deckFromRecord(bare.url, 1, record, byAgent)).toEqual({
      ...bare,
      description: "Flashcards: Own.",
    });
  });

  it("name the agents beside a deck, one per author, and its cards document as its distribution", () => {
    const withTwo: Deck = { ...deck, authors: ["Anton Wiklund", "A friend <friend@example.com>", "Anton Wiklund"] };
    expect(deckAgents(withTwo)).toEqual([
      { url: ANTON, record: { name: "Anton Wiklund" } },
      {
        url: `${CATALOG}#agent-a-friend-friend-example-com`,
        record: { name: "A friend", mbox: "mailto:friend@example.com" },
      },
    ]);
    expect(deckDistribution(deck)).toEqual({
      url: `${deck.url}-cards`,
      record: {
        accessUrl: CARDS,
        mediaType: "https://www.iana.org/assignments/media-types/text/turtle",
      },
    });
  });
});

describe("card records", () => {
  it("round-trip text, pictures and the creation time", () => {
    const record = cardToRecord(
      { front: "Flag", back: "Sweden", frontImageUrl: FLAG, backImageUrl: FLAG },
      "2026-09-21T10:00:00.000Z",
    );
    expect(record).toEqual({
      front: "Flag",
      back: "Sweden",
      frontImage: FLAG,
      backImage: FLAG,
      created: "2026-09-21T10:00:00.000Z",
    });
    expect(cardFromRecord(`${CARDS}#se`, 2, record)).toEqual({
      id: "se",
      url: `${CARDS}#se`,
      front: "Flag",
      back: "Sweden",
      frontImageUrl: FLAG,
      backImageUrl: FLAG,
      createdAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 2,
    });
  });

  it("leave out empty text, missing pictures and an unknown creation time", () => {
    expect(cardToRecord({ front: "", back: "Sweden", frontImageUrl: FLAG }, "")).toEqual({
      back: "Sweden",
      frontImage: FLAG,
    });
    expect(cardFromRecord(`${CARDS}#se`, 1, { back: "Sweden", frontImage: FLAG })).toEqual({
      id: "se",
      url: `${CARDS}#se`,
      front: "",
      back: "Sweden",
      frontImageUrl: FLAG,
      createdAt: "",
      formatVersion: 1,
    });
  });

  it("round-trip a card of text only", () => {
    const record = cardToRecord({ front: "Sweden", back: "Stockholm" }, "");
    expect(record).toEqual({ front: "Sweden", back: "Stockholm" });
    expect(cardToRecord({ front: "Sweden", back: "", backImageUrl: FLAG }, "")).toEqual({ front: "Sweden", backImage: FLAG });
    expect(cardFromRecord(`${CARDS}#se`, 2, record)).toEqual({
      id: "se",
      url: `${CARDS}#se`,
      front: "Sweden",
      back: "Stockholm",
      createdAt: "",
      formatVersion: 2,
    });
  });

  it("have no content when a side has neither text nor a picture", () => {
    expect(cardContentFromRecord({ back: "Sweden" })).toBeNull();
    expect(cardContentFromRecord({ front: "Sweden" })).toBeNull();
    expect(cardFromRecord(`${CARDS}#se`, 2, { front: "x" })).toBeNull();
  });
});

describe("library deck records", () => {
  const RELEASE = "https://solid-memo.com/decks/capitals/1.ttl";
  const release = {
    title: "Capitals",
    description: "From Wikipedia.",
    creator: [ANTON],
    publisher: "https://solid-memo.com/decks/index.ttl#solid-memo",
    studyDirection: `${SM}frontToBack` as const,
    theme: ["http://publications.europa.eu/resource/authority/data-theme/EDUC", TOPIC],
    keyword: ["capitals"],
    language: [],
    version: "1",
    inSeries: "https://solid-memo.com/decks/index.ttl#capitals",
    isVersionOf: "https://solid-memo.com/decks/index.ttl#capitals",
    distribution: [`${RELEASE}#turtle`],
    wasDerivedFrom: [],
  };

  it("build a release's content around its cards", () => {
    const cards = [{ id: "se", front: "Sweden", back: "Stockholm", formatVersion: 1 }];
    expect(libraryDeckFromRecord(RELEASE, 3, release, cards, byAgent)).toEqual({
      url: RELEASE,
      name: "Capitals",
      formatVersion: 3,
      authors: ["Anton Wiklund"],
      description: "From Wikipedia.",
      direction: "front-to-back",
      version: "1",
      seriesUrl: "https://solid-memo.com/decks/index.ttl#capitals",
      themes: release.theme,
      keywords: ["capitals"],
      cards,
    });
  });

  it("carry the licence, version notes and modification time when stated", () => {
    expect(
      libraryDeckFromRecord(
        RELEASE,
        3,
        {
          ...release,
          license: "https://creativecommons.org/publicdomain/zero/1.0/",
          versionNotes: "Added Norway.",
          modified: "2026-09-27T20:12:13.000Z",
          studyDirection: `${SM}bidirectional`,
        },
        [],
        byAgent,
      ),
    ).toMatchObject({
      license: "https://creativecommons.org/publicdomain/zero/1.0/",
      versionNotes: "Added Norway.",
      modifiedAt: "2026-09-27T20:12:13.000Z",
      direction: "bidirectional",
    });
  });
});
