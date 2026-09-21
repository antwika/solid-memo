import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeckDetailContainer } from "./DeckDetailContainer";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { StudyQueue } from "../domain/scheduling";
import { makeUseCasesFake } from "../test/useCasesFake";
import { decksHref } from "./router";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  createdAt: "2026-09-21T10:00:00.000Z",
};

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "A",
};

const card: Card = {
  id: "card-1",
  url: `${deck.cardsDocumentUrl}#card-1`,
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
};

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onStudy = vi.fn();
  const onPractice = vi.fn();
  const onBrowse = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <DeckDetailContainer
        useCases={useCases}
        instance={instance}
        deck={deck}
        onStudy={onStudy}
        onPractice={onPractice}
        onBrowse={onBrowse}
      />
    </QueryClientProvider>,
  );
  return { onStudy, onPractice, onBrowse };
}

describe("DeckDetailContainer", () => {
  it("shows a loading state, then the card count", async () => {
    renderContainer(makeUseCasesFake({ listCards: vi.fn(async () => [card]) }));
    expect(screen.getByText("Loading cards…")).toBeInTheDocument();
    expect(
      await screen.findByText(/1 card in this deck/),
    ).toBeInTheDocument();
  });

  it("keeps loading until today's study queue is known", async () => {
    renderContainer(
      makeUseCasesFake({
        listCards: vi.fn(async () => [card]),
        getStudyQueue: vi.fn(() => new Promise<StudyQueue>(() => {})),
      }),
    );
    await waitFor(() => {
      expect(screen.getByText("Loading cards…")).toBeInTheDocument();
    });
    expect(screen.queryByText(/1 card in this deck/)).toBeNull();
  });

  it("says all cards are studied when today's queue is empty", async () => {
    const useCases = makeUseCasesFake({
      listCards: vi.fn(async () => [card]),
      getStudyQueue: vi.fn(async () => ({ due: [], newCards: [] })),
    });
    renderContainer(useCases);
    expect(
      await screen.findByText(
        "All cards have been studied — nothing more to study today.",
      ),
    ).toBeInTheDocument();
    expect(useCases.getStudyQueue).toHaveBeenCalledWith(
      instance.url,
      deck,
      expect.any(Date),
    );
  });

  it("shows an error when the study queue fails", async () => {
    renderContainer(
      makeUseCasesFake({
        getStudyQueue: vi.fn(async () => {
          throw new Error("reviews unreachable");
        }),
      }),
    );
    expect(await screen.findByText("reviews unreachable")).toBeInTheDocument();
  });

  it("shows an error when listing cards fails", async () => {
    renderContainer(
      makeUseCasesFake({
        listCards: vi.fn(async () => {
          throw new Error("cards unreachable");
        }),
      }),
    );
    expect(await screen.findByText("cards unreachable")).toBeInTheDocument();
  });

  it("forwards the navigation callbacks", async () => {
    const { onStudy, onPractice, onBrowse } =
      renderContainer(
        makeUseCasesFake({
          listCards: vi.fn(async () => [card]),
          getStudyQueue: vi.fn(async () => ({ due: [card], newCards: [] })),
        }),
      );
    expect(
      await screen.findByRole("link", { name: "Back to decks" }),
    ).toHaveAttribute("href", decksHref(instance.url));
    fireEvent.click(screen.getByRole("button", { name: "Study" }));
    expect(onStudy).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Practice" }));
    expect(onPractice).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Browser" }));
    expect(onBrowse).toHaveBeenCalledOnce();
  });
});
