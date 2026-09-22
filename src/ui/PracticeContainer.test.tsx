import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PracticeContainer } from "./PracticeContainer";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DEFAULT_PREFERENCES } from "../domain/preferences";
import type { StudyQueue } from "../domain/scheduling";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "Japanese study",
};

const deck: Deck = {
  id: "deck-1",
  url: `${instance.url}catalog.ttl#deck-1`,
  name: "Kanji N5",
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
};

function makeCard(id: string, front: string): Card {
  return {
    id,
    url: `${deck.cardsDocumentUrl}#${id}`,
    front,
    back: `${front}-back`,
    createdAt: "2026-09-21T10:00:00.000Z",
    formatVersion: 1,
  };
}

function renderContainer(
  useCases: UseCases,
  mode: "practice" | "study" = "practice",
  random: () => number = () => 0,
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onExit = vi.fn();
  const view = render(
    <QueryClientProvider client={queryClient}>
      <PracticeContainer
        useCases={useCases}
        instance={instance}
        deck={deck}
        mode={mode}
        onExit={onExit}
        random={random}
      />
    </QueryClientProvider>,
  );
  return { onExit, queryClient, unmount: view.unmount };
}

/** Reveal the current card and grade it. */
async function answer(grade: string) {
  const reveal = await screen.findByRole("button", { name: "Reveal" });
  await waitFor(() => expect(reveal).toBeEnabled());
  fireEvent.click(reveal);
  fireEvent.click(screen.getByRole("button", { name: grade }));
}

describe("PracticeContainer", () => {
  it("shows a preparing state, then the first due card", async () => {
    renderContainer(
      makeUseCasesFake({
        getStudyQueue: vi.fn(async () => ({
          due: [makeCard("card-a", "front-a")],
          newCards: [makeCard("card-b", "front-b")],
          studiedToday: 0,
        })),
      }),
    );
    expect(
      screen.getByText("Preparing your study session…"),
    ).toBeInTheDocument();
    expect(await screen.findByText("front-a")).toBeInTheDocument();
    expect(screen.getByText("Card 1 of 2")).toBeInTheDocument();
  });

  it("shows an error when the queue cannot be built", async () => {
    renderContainer(
      makeUseCasesFake({
        getStudyQueue: vi.fn(async () => {
          throw new Error("queue failed");
        }),
      }),
    );
    expect(await screen.findByText("queue failed")).toBeInTheDocument();
  });

  it("advances through the queue as answers are recorded", async () => {
    const useCases = makeUseCasesFake({
      getStudyQueue: vi.fn(async () => ({
        due: [makeCard("card-a", "front-a")],
        newCards: [makeCard("card-b", "front-b")],
        studiedToday: 0,
      })),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Reveal" }));
    fireEvent.click(screen.getByRole("button", { name: "5 — Easy" }));

    expect(await screen.findByText("front-b")).toBeInTheDocument();
    expect(useCases.recordReview).toHaveBeenCalledWith(
      instance.url,
      deck,
      expect.objectContaining({ id: "card-a" }),
      5,
      expect.any(Date),
    );

    const secondReveal = await screen.findByRole("button", {
      name: "Reveal",
    });
    await waitFor(() => expect(secondReveal).toBeEnabled());
    fireEvent.click(secondReveal);
    fireEvent.click(screen.getByRole("button", { name: "3 — Hard" }));

    expect(
      await screen.findByText("Session finished — all cards reviewed."),
    ).toBeInTheDocument();
  });

  it("stays on the card and shows the error when recording fails", async () => {
    const useCases = makeUseCasesFake({
      getStudyQueue: vi.fn(async () => ({
        due: [makeCard("card-a", "front-a")],
        newCards: [],
        studiedToday: 0,
      })),
      recordReview: vi.fn(async () => {
        throw new Error("review save failed");
      }),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Reveal" }));
    fireEvent.click(screen.getByRole("button", { name: "5 — Easy" }));

    expect(await screen.findByText("review save failed")).toBeInTheDocument();
    expect(screen.getByText("front-a")).toBeInTheDocument();
  });

  it("limits a study session to due cards", async () => {
    renderContainer(
      makeUseCasesFake({
        getStudyQueue: vi.fn(async () => ({
          due: [makeCard("card-a", "front-a")],
          newCards: [makeCard("card-b", "front-b")],
          studiedToday: 0,
        })),
      }),
      "study",
    );

    expect(await screen.findByText("front-a")).toBeInTheDocument();
    expect(screen.getByText("Card 1 of 1")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Study: Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("shows the empty state when nothing is due", async () => {
    renderContainer(
      makeUseCasesFake({
        getStudyQueue: vi.fn(
          async (): Promise<StudyQueue> => ({ due: [], newCards: [], studiedToday: 0 }),
        ),
      }),
    );
    expect(
      await screen.findByText("Nothing to study today — come back tomorrow!"),
    ).toBeInTheDocument();
  });

  it("puts a failed card back later in the session, not straight away", async () => {
    const useCases = makeUseCasesFake({
      getStudyQueue: vi.fn(async () => ({
        due: [
          makeCard("card-a", "front-a"),
          makeCard("card-b", "front-b"),
          makeCard("card-c", "front-c"),
        ],
        newCards: [],
        studiedToday: 0,
      })),
    });
    // random() = 0 requeues at the earliest allowed slot: after one card.
    renderContainer(useCases, "practice", () => 0);

    expect(await screen.findByText("front-a")).toBeInTheDocument();
    expect(screen.getByText("Card 1 of 3")).toBeInTheDocument();
    await answer("1 — Wrong");

    // b comes next, not a again; the session has grown by one.
    expect(await screen.findByText("front-b")).toBeInTheDocument();
    expect(screen.getByText("Card 2 of 4")).toBeInTheDocument();
    await answer("4 — Good");

    expect(await screen.findByText("front-a")).toBeInTheDocument();
    expect(screen.getByText("Card 3 of 4")).toBeInTheDocument();
    await answer("5 — Easy");

    expect(await screen.findByText("front-c")).toBeInTheDocument();
    await answer("4 — Good");
    expect(
      await screen.findByText("Session finished — all cards reviewed."),
    ).toBeInTheDocument();
    expect(useCases.recordReview).toHaveBeenCalledTimes(4);
  });

  it("repeats the only remaining card immediately until it passes", async () => {
    const useCases = makeUseCasesFake({
      getStudyQueue: vi.fn(async () => ({
        due: [makeCard("card-a", "front-a")],
        newCards: [],
        studiedToday: 0,
      })),
    });
    renderContainer(useCases);

    await answer("0 — Blackout");
    expect(await screen.findByText("Card 2 of 2")).toBeInTheDocument();
    expect(screen.getByText("front-a")).toBeInTheDocument();
    // The repeat starts hidden again.
    expect(screen.queryByText("front-a-back")).toBeNull();

    await answer("2 — Almost");
    expect(
      await screen.findByText("Session finished — all cards reviewed."),
    ).toBeInTheDocument();
    expect(useCases.recordReview).toHaveBeenCalledTimes(2);
  });

  it("does not repeat a card graded 2 or better", async () => {
    const useCases = makeUseCasesFake({
      getStudyQueue: vi.fn(async () => ({
        due: [makeCard("card-a", "front-a")],
        newCards: [],
        studiedToday: 0,
      })),
    });
    renderContainer(useCases);

    await answer("2 — Almost");
    expect(
      await screen.findByText("Session finished — all cards reviewed."),
    ).toBeInTheDocument();
  });

  it("shows the answer buttons the preferences ask for", async () => {
    const useCases = makeUseCasesFake({
      getStudyQueue: vi.fn(async () => ({
        due: [makeCard("card-a", "front-a"), makeCard("card-b", "front-b")],
        newCards: [],
        studiedToday: 0,
      })),
      getPreferences: vi.fn(async () => ({
        ...DEFAULT_PREFERENCES,
        answerScale: "minimal" as const,
      })),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Reveal" }));
    expect(screen.getByRole("button", { name: "Again" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "1 — Wrong" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Again" }));
    expect(await screen.findByText("front-b")).toBeInTheDocument();
    expect(useCases.recordReview).toHaveBeenCalledWith(
      instance.url,
      deck,
      expect.objectContaining({ id: "card-a" }),
      1,
      expect.any(Date),
    );
    // Again requeues: a comes back after b.
    expect(screen.getByText("Card 2 of 3")).toBeInTheDocument();
  });

  it("falls back to the default answer buttons when preferences are unreadable", async () => {
    const useCases = makeUseCasesFake({
      getPreferences: vi.fn(async () => {
        throw new Error("no prefs");
      }),
      getStudyQueue: vi.fn(async () => ({
        due: [makeCard("card-a", "front-a")],
        newCards: [],
        studiedToday: 0,
      })),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Reveal" }));
    expect(
      screen.getByRole("button", { name: "0 — Blackout" }),
    ).toBeInTheDocument();
  });

  it("exits when the session ends", async () => {
    const { onExit } = renderContainer(makeUseCasesFake());
    fireEvent.click(
      await screen.findByRole("button", { name: "End session" }),
    );
    await waitFor(() => {
      expect(onExit).toHaveBeenCalledOnce();
    });
  });

  it("drops the deck's cached queue when the session is left", async () => {
    const useCases = makeUseCasesFake({
      getStudyQueue: vi.fn(async () => ({
        due: [makeCard("card-a", "front-a")],
        newCards: [],
        studiedToday: 0,
      })),
    });
    const { queryClient, unmount } = renderContainer(useCases);
    const queueKey = ["studyQueue", deck.url];
    await screen.findByText("front-a");
    expect(queryClient.getQueryData(queueKey)).toBeDefined();

    // Any way out: no End session click, just navigating away.
    unmount();
    expect(queryClient.getQueryData(queueKey)).toBeUndefined();
  });
});
