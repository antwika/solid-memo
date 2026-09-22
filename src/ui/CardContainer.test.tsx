import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardContainer } from "./CardContainer";
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
  const invalidate = vi.spyOn(queryClient, "invalidateQueries");
  const onRemoved = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <CardContainer
        useCases={useCases}
        deck={deck}
        card={card}
        onRemoved={onRemoved}
      />
    </QueryClientProvider>,
  );
  return { onRemoved, invalidate };
}

describe("CardContainer", () => {
  it("saves an edit, refreshes the deck's cards and confirms", async () => {
    const useCases = makeUseCasesFake({
      updateCard: vi.fn(async () => ({ ...card, back: "water (mizu)" })),
    });
    const { invalidate } = renderContainer(useCases);

    fireEvent.input(screen.getByLabelText("Back"), {
      target: { value: "water (mizu)" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Saved.");
    expect(useCases.updateCard).toHaveBeenCalledWith(
      deck,
      card,
      "水",
      "water (mizu)",
    );
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ["cards", deck.cardsDocumentUrl],
    });
  });

  it("shows a save error", async () => {
    renderContainer(
      makeUseCasesFake({
        updateCard: vi.fn(async () => {
          throw new Error("update refused");
        }),
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("update refused")).toBeInTheDocument();
  });

  it("removes the card, refreshes cards and reviews, then leaves", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const useCases = makeUseCasesFake();
    const { onRemoved, invalidate } = renderContainer(useCases);

    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));

    await waitFor(() => {
      expect(onRemoved).toHaveBeenCalledOnce();
    });
    expect(useCases.removeCard).toHaveBeenCalledWith(deck, card);
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ["cards", deck.cardsDocumentUrl],
    });
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ["reviews", deck.reviewsDocumentUrl],
    });
  });

  it("shows a remove error and stays", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const { onRemoved } = renderContainer(
      makeUseCasesFake({
        removeCard: vi.fn(async () => {
          throw new Error("remove refused");
        }),
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));
    expect(await screen.findByText("remove refused")).toBeInTheDocument();
    expect(onRemoved).not.toHaveBeenCalled();
  });
});
