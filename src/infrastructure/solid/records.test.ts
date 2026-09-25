import {
  buildThing,
  createThing,
  getDecimal,
  getInteger,
  getStringNoLocale,
  getStringNoLocaleAll,
  getUrl,
  getUrlAll,
} from "@inrupt/solid-client";
import { describe, expect, it } from "vitest";
import type { ShapeDescriptor } from "../shacl/shapeDescriptor";
import { CARD_V2, DECK_V2, PREFERENCES_V2, REVIEW_STATE_V2 } from "../shacl/shapes.generated";
import { applyRecord, readRecord, readVersioned, recordThing, storedVersionOf } from "./records";
import { DCTERMS, RDF, SM } from "./vocab";

const URL_ = "https://pod.example/x.ttl#it";
const EX = "https://example.com/ns#";

interface Thing {
  name: string;
  count?: number;
  ratio?: number;
  when?: string;
  flag?: boolean;
  link?: string;
  mode?: "a" | "b";
  tags: readonly string[];
  links: readonly string[];
}

const THING: ShapeDescriptor<Thing> = {
  shape: "card",
  version: 1,
  targetClass: `${EX}Thing`,
  shapeIri: `${EX}shape`,
  shapeDocument: "thing/v1.ttl",
  context: "any",
  fields: [
    { name: "name", predicate: `${EX}name`, kind: "string", cardinality: "one" },
    { name: "count", predicate: `${EX}count`, kind: "integer", cardinality: "optional" },
    { name: "ratio", predicate: `${EX}ratio`, kind: "decimal", cardinality: "optional" },
    { name: "when", predicate: `${EX}when`, kind: "dateTime", cardinality: "optional" },
    { name: "flag", predicate: `${EX}flag`, kind: "boolean", cardinality: "optional" },
    { name: "link", predicate: `${EX}link`, kind: "iri", cardinality: "optional" },
    { name: "mode", predicate: `${EX}mode`, kind: "enum", cardinality: "optional", values: ["a", "b"] },
    { name: "tags", predicate: `${EX}tag`, kind: "string", cardinality: "many" },
    { name: "links", predicate: `${EX}links`, kind: "iri", cardinality: "many" },
  ],
};

const FULL: Thing = {
  name: "Ann",
  count: 3,
  ratio: 2.5,
  when: "2026-09-21T10:00:00.000Z",
  flag: true,
  link: "https://example.com/a",
  mode: "b",
  tags: ["x", "y"],
  links: ["https://example.com/b", "https://example.com/c"],
};

describe("recordThing and readRecord", () => {
  it("round-trip every kind and cardinality, typing the subject and stamping the version", () => {
    const thing = recordThing(URL_, THING, FULL, null);
    expect(getUrlAll(thing, RDF.type)).toEqual([`${EX}Thing`]);
    expect(getInteger(thing, SM.formatVersion)).toBe(1);
    expect(getDecimal(thing, `${EX}ratio`)).toBe(2.5);
    expect(readRecord(thing, THING)).toEqual(FULL);
  });

  it("leave out absent optional fields and read them back as absent", () => {
    const thing = recordThing(URL_, THING, { name: "Ann", tags: [], links: [] }, null);
    expect(readRecord(thing, THING)).toEqual({ name: "Ann", tags: [], links: [] });
  });

  it("edit the existing subject in place: owned predicates replaced, others kept, type not repeated", () => {
    const existing = buildThing(createThing({ url: URL_ }))
      .addIri(RDF.type, `${EX}Thing`)
      .addStringNoLocale(`${EX}name`, "Old")
      .addStringNoLocale(`${EX}tag`, "old")
      .addInteger(`${EX}count`, 9)
      .addStringNoLocale(`${EX}foreign`, "kept")
      .addInteger(SM.formatVersion, 0)
      .build();
    const thing = recordThing(URL_, THING, { name: "New", tags: ["fresh"], links: [] }, existing);
    expect(getUrlAll(thing, RDF.type)).toEqual([`${EX}Thing`]);
    expect(getStringNoLocale(thing, `${EX}name`)).toBe("New");
    expect(getStringNoLocaleAll(thing, `${EX}tag`)).toEqual(["fresh"]);
    expect(getInteger(thing, `${EX}count`)).toBeNull();
    expect(getStringNoLocale(thing, `${EX}foreign`)).toBe("kept");
    expect(getInteger(thing, SM.formatVersion)).toBe(1);
  });
});

describe("readRecord", () => {
  it("is null when a required field is missing", () => {
    const thing = buildThing(createThing({ url: URL_ })).addInteger(`${EX}count`, 1).build();
    expect(readRecord(thing, THING)).toBeNull();
  });

  it("treats an enum value the shape does not list as absent", () => {
    const thing = buildThing(createThing({ url: URL_ }))
      .addStringNoLocale(`${EX}name`, "Ann")
      .addStringNoLocale(`${EX}mode`, "z")
      .build();
    expect(readRecord(thing, THING)).toEqual({ name: "Ann", tags: [], links: [] });
    const required: ShapeDescriptor<{ mode: "a" }> = {
      shape: "card",
      version: 1,
      targetClass: `${EX}Thing`,
      shapeIri: `${EX}shape`,
      shapeDocument: "thing/v1.ttl",
      context: "any",
      fields: [{ name: "mode", predicate: `${EX}mode`, kind: "enum", cardinality: "one", values: ["a"] }],
    };
    expect(readRecord(thing, required)).toBeNull();
  });

  it("ignores a literal where an IRI is expected", () => {
    const thing = buildThing(createThing({ url: URL_ }))
      .addStringNoLocale(`${EX}name`, "Ann")
      .addStringNoLocale(`${EX}link`, "https://example.com/a")
      .build();
    expect(readRecord(thing, THING)).toEqual({ name: "Ann", tags: [], links: [] });
  });
});

describe("applyRecord", () => {
  it("adds nothing for undefined fields but still clears their old values", () => {
    const builder = buildThing(createThing({ url: URL_ })).addInteger(`${EX}count`, 9);
    applyRecord(builder, THING, { name: "Ann", tags: [], links: [] });
    expect(getInteger(builder.build(), `${EX}count`)).toBeNull();
  });
});

describe("readVersioned", () => {
  const card = (version?: number, front = "Sweden") => {
    const b = buildThing(createThing({ url: URL_ }))
      .addIri(RDF.type, SM.Card)
      .addStringNoLocale(SM.front, front)
      .addStringNoLocale(SM.back, "Stockholm");
    if (version !== undefined) b.addInteger(SM.formatVersion, version);
    return b.build();
  };

  it("reads a subject with the shape of its stored version, absent meaning 1", () => {
    expect(readVersioned(card(), "card")).toEqual({
      storedVersion: 1,
      record: { version: 1, data: { front: "Sweden", back: "Stockholm" } },
    });
    expect(storedVersionOf(card())).toBe(1);
    expect(readVersioned(card(2), "card")).toEqual({
      storedVersion: 2,
      record: { version: 2, data: { front: "Sweden", back: "Stockholm" } },
    });
  });

  it("reads a newer version with the latest shape it knows, passing the stored version through", () => {
    expect(readVersioned(card(7), "card")).toEqual({
      storedVersion: 7,
      record: { version: 2, data: { front: "Sweden", back: "Stockholm" } },
    });
    expect(readVersioned(card(0), "card")?.record.version).toBe(1);
  });

  it("is null for the wrong class or a subject that does not fit", () => {
    expect(readVersioned(card(), "deck")).toBeNull();
    const noBack = buildThing(createThing({ url: URL_ }))
      .addIri(RDF.type, SM.Card)
      .addStringNoLocale(SM.front, "Sweden")
      .addInteger(SM.formatVersion, 1)
      .build();
    expect(readVersioned(noBack, "card")).toBeNull();
  });
});

describe("the real descriptors", () => {
  it("write and read a deck, a card, a review state and preferences", () => {
    const deck = recordThing(
      URL_,
      DECK_V2,
      {
        title: "Capitals",
        created: "2026-09-21T10:00:00.000Z",
        creator: ["Anton"],
        license: "https://creativecommons.org/publicdomain/zero/1.0/",
        direction: "bidirectional",
        cardsDocument: "https://pod.example/decks/d.ttl",
        reviewsDocument: "https://pod.example/reviews/d.ttl",
      },
      null,
    );
    expect(getUrl(deck, SM.cardsDocument)).toBe("https://pod.example/decks/d.ttl");
    expect(getStringNoLocale(deck, DCTERMS.title)).toBe("Capitals");
    expect(readVersioned(deck, "deck")?.record.data).toMatchObject({ direction: "bidirectional" });
    const card = recordThing(URL_, CARD_V2, { frontImage: "https://flagcdn.com/se.svg", back: "Sweden" }, null);
    expect(getUrl(card, SM.frontImage)).toBe("https://flagcdn.com/se.svg");
    const state = recordThing(
      URL_,
      REVIEW_STATE_V2,
      { easeFactor: 2.5, intervalDays: 1, repetitions: 1, due: "2026-09-22", firstReviewedAt: "2026-09-21T10:00:00.000Z", lastReviewedAt: "2026-09-21T10:00:00.000Z" },
      null,
    );
    expect(getInteger(state, SM.formatVersion)).toBe(2);
    const prefs = recordThing(
      URL_,
      PREFERENCES_V2,
      { newCardsPerDay: 20, maxReviewsPerDay: 200, dayBoundaryHour: 4, answerScale: "sm2", developerMode: false },
      null,
    );
    expect(readVersioned(prefs, "preferences")).toEqual({
      storedVersion: 2,
      record: { version: 2, data: { newCardsPerDay: 20, maxReviewsPerDay: 200, dayBoundaryHour: 4, answerScale: "sm2", developerMode: false } },
    });
  });
});
