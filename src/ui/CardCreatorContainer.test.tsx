import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardCreatorContainer } from "./CardCreatorContainer";
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
  const onBack = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <CardCreatorContainer
        useCases={useCases}
        deck={deck}
        deckHref="#/deck?deck=d"
        onBack={onBack}
      />
    </QueryClientProvider>,
  );
  return { onBack };
}

function submitCard(front: string, back: string) {
  fireEvent.input(screen.getByLabelText("Front"), {
    target: { value: front },
  });
  fireEvent.input(screen.getByLabelText("Back"), { target: { value: back } });
  fireEvent.submit(
    screen.getByRole("button", { name: "Add card" }).closest("form")!,
  );
}

describe("CardCreatorContainer", () => {
  it("adds a card and stays on the page for the next one", async () => {
    const useCases = makeUseCasesFake({ addCard: vi.fn(async () => card) });
    const { onBack } = renderContainer(useCases);

    submitCard("水", "water");

    await waitFor(() => {
      expect(useCases.addCard).toHaveBeenCalledWith(deck, "水", "water");
    });
    // Still on the creator, ready for the next card.
    expect(onBack).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: "New card" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Front")).toHaveValue("");
  });

  it("shows an add error", async () => {
    renderContainer(
      makeUseCasesFake({
        addCard: vi.fn(async () => {
          throw new Error("write refused");
        }),
      }),
    );

    submitCard("x", "y");
    expect(await screen.findByText("write refused")).toBeInTheDocument();
  });

  it("navigates back", () => {
    const { onBack } = renderContainer(makeUseCasesFake());
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
