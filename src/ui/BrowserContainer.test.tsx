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
  const onBack = vi.fn();
  const onAddCard = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserContainer
        useCases={useCases}
        deck={deck}
        onBack={onBack}
        onAddCard={onAddCard}
      />
    </QueryClientProvider>,
  );
  return { onBack, onAddCard };
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

  it("updates a card and refreshes the list", async () => {
    const edited = { ...card, front: "수영하다", back: "to swim" };
    const listCards = vi
      .fn<() => Promise<Card[]>>()
      .mockResolvedValueOnce([card])
      .mockResolvedValue([edited]);
    const useCases = makeUseCasesFake({
      listCards,
      updateCard: vi.fn(async () => edited),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByText("水"));
    fireEvent.input(document.querySelector("#edit-front-card-1")!, {
      target: { value: "수영하다" },
    });
    fireEvent.input(document.querySelector("#edit-back-card-1")!, {
      target: { value: "to swim" },
    });
    fireEvent.submit(document.querySelector("form.card-edit")!);

    expect(await screen.findByText("수영하다")).toBeInTheDocument();
    expect(useCases.updateCard).toHaveBeenCalledWith(
      deck,
      card,
      "수영하다",
      "to swim",
    );
  });

  it("shows an update error", async () => {
    const useCases = makeUseCasesFake({
      listCards: vi.fn(async () => [card]),
      updateCard: vi.fn(async () => {
        throw new Error("update refused");
      }),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByText("水"));
    fireEvent.submit(document.querySelector("form.card-edit")!);
    expect(await screen.findByText("update refused")).toBeInTheDocument();
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

  it("navigates back", async () => {
    const { onBack } = renderContainer(makeUseCasesFake());
    fireEvent.click(
      await screen.findByRole("button", { name: "Back to deck" }),
    );
    expect(onBack).toHaveBeenCalledOnce();
  });
});
