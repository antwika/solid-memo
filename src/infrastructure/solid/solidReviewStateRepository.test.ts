import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getThing,
  mockSolidDatasetFrom,
  saveSolidDatasetAt,
  setThing,
  type SolidDataset,
} from "@inrupt/solid-client";
import { createSolidReviewStateRepository } from "./solidReviewStateRepository";
import { getSolidDatasetOrNull } from "./datasets";
import {
  toReviewState,
  toReviewStateThing,
} from "./mappers/reviewStateMapper";
import type { Deck } from "../../domain/deck";
import type { ReviewState } from "../../domain/review";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@inrupt/solid-client")>();
  return { ...actual, saveSolidDatasetAt: vi.fn() };
});
vi.mock("./datasets");

const INSTANCE = "https://pod.example/solid-memo/a/";

const deck: Deck = {
  id: "deck-1",
  url: `${INSTANCE}catalog.ttl#deck-1`,
  name: "Kanji N5",
  cardsDocumentUrl: `${INSTANCE}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${INSTANCE}reviews/deck-1.ttl`,
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
};

const state: ReviewState = {
  cardId: "card-1",
  direction: "front-to-back",
  easeFactor: 2.36,
  intervalDays: 6,
  repetitions: 2,
  due: "2026-09-27",
  firstReviewedAt: "2026-09-15T08:00:00.000Z",
  lastReviewedAt: "2026-09-21T08:12:00.000Z",
  formatVersion: 2,
};

function reviewsDataset() {
  return setThing(
    mockSolidDatasetFrom(deck.reviewsDocumentUrl),
    toReviewStateThing(deck.reviewsDocumentUrl, state),
  );
}

function makeRepository() {
  return createSolidReviewStateRepository({
    fetch: vi.fn() as unknown as typeof globalThis.fetch,
  });
}

beforeEach(() => {
  vi.mocked(getSolidDatasetOrNull).mockReset();
  vi.mocked(saveSolidDatasetAt).mockReset();
});

describe("listReviewStates", () => {
  it("returns an empty list when the document does not exist", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(makeRepository().listReviewStates(deck)).resolves.toEqual(
      [],
    );
  });

  it("maps stored review states", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(reviewsDataset());
    await expect(makeRepository().listReviewStates(deck)).resolves.toEqual([
      state,
    ]);
  });
});

describe("getReviewState", () => {
  it("returns null when the document does not exist", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(
      makeRepository().getReviewState(deck, { cardId: "card-1", direction: "front-to-back" }),
    ).resolves.toBeNull();
  });

  it("returns null when the card has no state", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(reviewsDataset());
    await expect(
      makeRepository().getReviewState(deck, { cardId: "card-unknown", direction: "front-to-back" }),
    ).resolves.toBeNull();
  });

  it("returns the card's state", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(reviewsDataset());
    await expect(
      makeRepository().getReviewState(deck, { cardId: "card-1", direction: "front-to-back" }),
    ).resolves.toEqual(state);
  });

  it("tells the card's two directions apart", async () => {
    const reverse: ReviewState = { ...state, direction: "back-to-front", due: "2026-10-01" };
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      setThing(reviewsDataset(), toReviewStateThing(deck.reviewsDocumentUrl, reverse)),
    );
    const repository = makeRepository();
    await expect(
      repository.getReviewState(deck, { cardId: "card-1", direction: "back-to-front" }),
    ).resolves.toEqual(reverse);
    await expect(
      repository.getReviewState(deck, { cardId: "card-1", direction: "front-to-back" }),
    ).resolves.toEqual(state);
  });
});

describe("saveReviewState", () => {
  it("creates the document on first save", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);

    await makeRepository().saveReviewState(deck, state);

    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(deck.reviewsDocumentUrl);
    const thing = getThing(
      saved as SolidDataset,
      `${deck.reviewsDocumentUrl}#card-1`,
    )!;
    expect(toReviewState(thing)).toEqual(state);
  });

  it("replaces the card's subject in an existing document", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(reviewsDataset());
    const updated: ReviewState = { ...state, repetitions: 3, due: "2026-10-10" };

    await makeRepository().saveReviewState(deck, updated);

    const [, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    const thing = getThing(
      saved as SolidDataset,
      `${deck.reviewsDocumentUrl}#card-1`,
    )!;
    expect(toReviewState(thing)).toEqual(updated);
  });
});

describe("applyReviewChanges", () => {
  const other: ReviewState = { ...state, cardId: "card-2" };

  function twoStates() {
    return setThing(
      reviewsDataset(),
      toReviewStateThing(deck.reviewsDocumentUrl, other),
    );
  }

  it("saves and removes states in a single write", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(twoStates());
    const restored: ReviewState = { ...state, due: "2026-09-21" };

    await makeRepository().applyReviewChanges(deck, {
      save: [restored],
      remove: [{ cardId: "card-2", direction: "front-to-back" }],
    });

    expect(saveSolidDatasetAt).toHaveBeenCalledOnce();
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(deck.reviewsDocumentUrl);
    const dataset = saved as SolidDataset;
    expect(
      toReviewState(getThing(dataset, `${deck.reviewsDocumentUrl}#card-1`)!),
    ).toEqual(restored);
    expect(getThing(dataset, `${deck.reviewsDocumentUrl}#card-2`)).toBeNull();
  });

  it("does nothing when the reviews document does not exist", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await makeRepository().applyReviewChanges(deck, {
      save: [state],
      remove: [{ cardId: "card-2", direction: "front-to-back" }],
    });
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});
