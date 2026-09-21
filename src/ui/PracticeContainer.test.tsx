import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PracticeContainer } from "./PracticeContainer";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
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
};

function makeCard(id: string, front: string): Card {
  return {
    id,
    url: `${deck.cardsDocumentUrl}#${id}`,
    front,
    back: `${front}-back`,
    createdAt: "2026-09-21T10:00:00.000Z",
  };
}

function renderContainer(
  useCases: UseCases,
  mode: "practice" | "study" = "practice",
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onExit = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <PracticeContainer
        useCases={useCases}
        instance={instance}
        deck={deck}
        mode={mode}
        onExit={onExit}
      />
    </QueryClientProvider>,
  );
  return { onExit };
}

describe("PracticeContainer", () => {
  it("shows a preparing state, then the first due card", async () => {
    renderContainer(
      makeUseCasesFake({
        getStudyQueue: vi.fn(async () => ({
          due: [makeCard("card-a", "front-a")],
          newCards: [makeCard("card-b", "front-b")],
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
          async (): Promise<StudyQueue> => ({ due: [], newCards: [] }),
        ),
      }),
    );
    expect(
      await screen.findByText("Nothing to study today — come back tomorrow!"),
    ).toBeInTheDocument();
  });

  it("invalidates caches and exits when the session ends", async () => {
    const { onExit } = renderContainer(makeUseCasesFake());
    fireEvent.click(
      await screen.findByRole("button", { name: "End session" }),
    );
    await waitFor(() => {
      expect(onExit).toHaveBeenCalledOnce();
    });
  });
});
