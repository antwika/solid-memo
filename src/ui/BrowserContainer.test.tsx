import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserContainer } from "./BrowserContainer";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import { makeUseCasesFake } from "../test/useCasesFake";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
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
  const onAddCard = vi.fn();
  const onDeckRemoved = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserContainer
        useCases={useCases}
        deck={deck}
        deckHref="#/deck?deck=d"
        onAddCard={onAddCard}
        page={1}
        cardHref={(c) => `#/card?card=${c.id}`}
        onDeckRemoved={onDeckRemoved}
        onPageChange={vi.fn()}
      />
    </QueryClientProvider>,
  );
  return { onAddCard, onDeckRemoved, queryClient };
}

describe("BrowserContainer", () => {
  it("shows a loading state, then the cards", async () => {
    renderContainer(makeUseCasesFake({ listCards: vi.fn(async () => [card]) }));
    expect(screen.getByText("Loading cards…")).toBeInTheDocument();
    expect(await screen.findByText("水")).toBeInTheDocument();
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

  it("forwards card-creator navigation", async () => {
    const { onAddCard } = renderContainer(
      makeUseCasesFake({ listCards: vi.fn(async () => []) }),
    );
    fireEvent.click(await screen.findByRole("button", { name: "Add card" }));
    expect(onAddCard).toHaveBeenCalledOnce();
  });

  it("links cards to their own page", async () => {
    renderContainer(makeUseCasesFake({ listCards: vi.fn(async () => [card]) }));
    expect(await screen.findByRole("link", { name: "水" })).toHaveAttribute(
      "href",
      "#/card?card=card-1",
    );
  });

  it("removes a card and refreshes", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const listCards = vi
      .fn<() => Promise<Card[]>>()
      .mockResolvedValueOnce([card])
      .mockResolvedValue([]);
    const useCases = makeUseCasesFake({ listCards });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Remove" }));

    await waitFor(() => {
      expect(useCases.removeCard).toHaveBeenCalledWith(deck, card);
    });
    expect(
      await screen.findByText("No cards in this deck yet."),
    ).toBeInTheDocument();
  });

  it("shows a remove error", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const useCases = makeUseCasesFake({
      listCards: vi.fn(async () => [card]),
      removeCard: vi.fn(async () => {
        throw new Error("remove refused");
      }),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Remove" }));
    expect(await screen.findByText("remove refused")).toBeInTheDocument();
  });

  it("renames the deck and refreshes every deck list", async () => {
    const useCases = makeUseCasesFake();
    const { queryClient } = renderContainer(useCases);
    const invalidate = vi.spyOn(queryClient, "invalidateQueries");

    fireEvent.click(await screen.findByRole("button", { name: "Rename deck" }));
    fireEvent.input(screen.getByLabelText("Deck name"), {
      target: { value: "Kanji N4" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));

    await waitFor(() => {
      expect(useCases.renameDeck).toHaveBeenCalledWith(deck, "Kanji N4");
    });
    await waitFor(() => {
      expect(invalidate).toHaveBeenCalledWith({ queryKey: ["decks"] });
    });
  });

  it("shows a rename error", async () => {
    renderContainer(
      makeUseCasesFake({
        renameDeck: vi.fn(async () => {
          throw new Error("rename refused");
        }),
      }),
    );
    fireEvent.click(await screen.findByRole("button", { name: "Rename deck" }));
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));
    expect(await screen.findByText("rename refused")).toBeInTheDocument();
  });

  it("removes the deck, refreshes the deck lists, then leaves", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const useCases = makeUseCasesFake();
    const { onDeckRemoved, queryClient } = renderContainer(useCases);
    const invalidate = vi.spyOn(queryClient, "invalidateQueries");

    fireEvent.click(await screen.findByRole("button", { name: "Remove deck" }));

    await waitFor(() => {
      expect(onDeckRemoved).toHaveBeenCalledOnce();
    });
    expect(useCases.removeDeck).toHaveBeenCalledWith(deck);
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["decks"] });
  });

  it("shows a deck-remove error and stays", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const { onDeckRemoved } = renderContainer(
      makeUseCasesFake({
        removeDeck: vi.fn(async () => {
          throw new Error("deck remove refused");
        }),
      }),
    );
    fireEvent.click(await screen.findByRole("button", { name: "Remove deck" }));
    expect(await screen.findByText("deck remove refused")).toBeInTheDocument();
    expect(onDeckRemoved).not.toHaveBeenCalled();
  });

});
