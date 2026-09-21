import { describe, expect, it } from "vitest";
import { toReviewState, toReviewStateThing } from "./reviewStateMapper";
import type { ReviewState } from "../../../domain/review";

const REVIEWS_DOC = "https://pod.example/solid-memo/a/reviews/deck-1.ttl";

const state: ReviewState = {
  cardId: "card-1",
  easeFactor: 2.36,
  intervalDays: 6,
  repetitions: 2,
  due: "2026-09-27",
  firstReviewedAt: "2026-09-15T08:00:00.000Z",
  lastReviewedAt: "2026-09-21T08:12:00.000Z",
};

describe("review state mapping", () => {
  it("round-trips a review state through a Thing", () => {
    const thing = toReviewStateThing(REVIEWS_DOC, state);
    expect(toReviewState(thing)).toEqual(state);
  });

  it("rejects subjects that are not sm:ReviewState", () => {
    const thing = toReviewStateThing(REVIEWS_DOC, state);
    const wrongType = {
      ...thing,
      predicates: {
        ...thing.predicates,
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
          namedNodes: ["https://solid-memo.com/vocab/v1#Card"],
        },
      },
    };
    expect(toReviewState(wrongType)).toBeNull();
  });

  it.each([
    "easeFactor",
    "intervalDays",
    "repetitions",
    "due",
    "firstReviewedAt",
    "lastReviewedAt",
  ])("rejects a subject missing sm:%s", (field) => {
    const thing = toReviewStateThing(REVIEWS_DOC, state);
    const withoutField = {
      ...thing,
      predicates: Object.fromEntries(
        Object.entries(thing.predicates).filter(
          ([predicate]) =>
            predicate !== `https://solid-memo.com/vocab/v1#${field}`,
        ),
      ),
    };
    expect(toReviewState(withoutField)).toBeNull();
  });
});
