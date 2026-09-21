import { describe, expect, it } from "vitest";
import { buildThing, createThing } from "@inrupt/solid-client";
import { toPreferences } from "./preferencesMapper";
import { RDF, SM } from "../vocab";

const SUBJECT = "https://pod.example/solid-memo/a/preferences.ttl#it";

describe("toPreferences", () => {
  it("maps all stored fields", () => {
    const thing = buildThing(createThing({ url: SUBJECT }))
      .addIri(RDF.type, SM.Preferences)
      .addInteger(SM.newCardsPerDay, 10)
      .addInteger(SM.maxReviewsPerDay, 50)
      .addInteger(SM.dayBoundaryHour, 2)
      .build();
    expect(toPreferences(thing)).toEqual({
      newCardsPerDay: 10,
      maxReviewsPerDay: 50,
      dayBoundaryHour: 2,
    });
  });

  it("returns pure defaults for an empty subject", () => {
    const thing = buildThing(createThing({ url: SUBJECT }))
      .addIri(RDF.type, SM.Preferences)
      .build();
    expect(toPreferences(thing)).toEqual({
      newCardsPerDay: 20,
      maxReviewsPerDay: 200,
      dayBoundaryHour: 4,
    });
  });

  it("falls back to defaults for missing fields", () => {
    const thing = buildThing(createThing({ url: SUBJECT }))
      .addIri(RDF.type, SM.Preferences)
      .addInteger(SM.newCardsPerDay, 10)
      .build();
    expect(toPreferences(thing)).toEqual({
      newCardsPerDay: 10,
      maxReviewsPerDay: 200,
      dayBoundaryHour: 4,
    });
  });
});
