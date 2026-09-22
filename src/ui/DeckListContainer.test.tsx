import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeckListContainer } from "./DeckListContainer";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { makeUseCasesFake } from "../test/useCasesFake";
import { deckHref, decksHref } from "./router";

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

const card: Card = {
  id: "card-1",
  url: `${deck.cardsDocumentUrl}#card-1`,
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
};

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onStudyDeck = vi.fn();
  const onPracticeDeck = vi.fn();
  const onCreateDeck = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <DeckListContainer
        useCases={useCases}
        instance={instance}
        onStudyDeck={onStudyDeck}
        onPracticeDeck={onPracticeDeck}
        onCreateDeck={onCreateDeck}
      />
    </QueryClientProvider>,
  );
  return { onStudyDeck, onPracticeDeck, onCreateDeck };
}

describe("DeckListContainer", () => {
  it("shows a loading state, then the decks", async () => {
    const useCases = makeUseCasesFake({
      listDecks: vi.fn(async () => [deck]),
    });
    renderContainer(useCases);
    expect(screen.getByText("Loading decks…")).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Kanji N5" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Decks" })).toHaveAttribute(
      "href",
      decksHref(instance.url),
    );
  });

  it("shows an error when listing decks fails", async () => {
    renderContainer(
      makeUseCasesFake({
        listDecks: vi.fn(async () => {
          throw new Error("catalog unreachable");
        }),
      }),
    );
    expect(
      await screen.findByText("catalog unreachable"),
    ).toBeInTheDocument();
  });

  it("forwards deck-creator navigation", async () => {
    const { onCreateDeck } = renderContainer(
      makeUseCasesFake({ listDecks: vi.fn(async () => []) }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Create deck" }),
    );
    expect(onCreateDeck).toHaveBeenCalledOnce();
  });

  it("links a deck's name to its page in this instance", async () => {
    const useCases = makeUseCasesFake({ listDecks: vi.fn(async () => [deck]) });
    renderContainer(useCases);

    expect(
      await screen.findByRole("link", { name: "Kanji N5" }),
    ).toHaveAttribute("href", deckHref(instance.url, deck.url));
  });

  it("suggests Study for a deck with due cards, and starts it", async () => {
    const useCases = makeUseCasesFake({
      listDecks: vi.fn(async () => [deck]),
      getStudyQueue: vi.fn(async () => ({
        due: [card],
        newCards: [],
        studiedToday: 0,
      })),
    });
    const { onStudyDeck } = renderContainer(useCases);

    fireEvent.click(
      await screen.findByRole("button", { name: "Study Kanji N5" }),
    );
    expect(onStudyDeck).toHaveBeenCalledWith(deck);
    expect(useCases.getStudyQueue).toHaveBeenCalledWith(
      instance.url,
      deck,
      expect.any(Date),
    );
  });

  it("suggests Practice, not Study, when only new cards remain", async () => {
    const useCases = makeUseCasesFake({
      listDecks: vi.fn(async () => [deck]),
      getStudyQueue: vi.fn(async () => ({
        due: [],
        newCards: [card],
        studiedToday: 0,
      })),
    });
    const { onPracticeDeck } = renderContainer(useCases);

    fireEvent.click(
      await screen.findByRole("button", { name: "Practice Kanji N5" }),
    );
    expect(onPracticeDeck).toHaveBeenCalledWith(deck);
    expect(screen.queryByRole("button", { name: /^Study/ })).toBeNull();
  });

  it("does not suggest studying a deck with nothing left today", async () => {
    renderContainer(
      makeUseCasesFake({ listDecks: vi.fn(async () => [deck]) }),
    );
    expect(
      await screen.findByRole("img", { name: "Nothing to study today" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Study|Practice/ })).toBeNull();
  });

  it("suggests nothing while the queue is unknown or unreadable", async () => {
    renderContainer(
      makeUseCasesFake({
        listDecks: vi.fn(async () => [deck]),
        getStudyQueue: vi.fn(async () => {
          throw new Error("reviews unreachable");
        }),
      }),
    );
    await screen.findByRole("link", { name: "Kanji N5" });
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /Study|Practice/ })).toBeNull();
    });
    expect(
      screen.queryByRole("img", { name: "Nothing to study today" }),
    ).toBeNull();
    // The deck itself stays reachable; the error shows up on its page.
    expect(screen.queryByText("reviews unreachable")).toBeNull();
  });
});
