import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeckDetailContainer } from "./DeckDetailContainer";
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
  const onStudy = vi.fn();
  const onPractice = vi.fn();
  const onBrowse = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <DeckDetailContainer
        useCases={useCases}
        deck={deck}
        onBack={onBack}
        onAddCard={onAddCard}
        onStudy={onStudy}
        onPractice={onPractice}
        onBrowse={onBrowse}
      />
    </QueryClientProvider>,
  );
  return { onBack, onAddCard, onStudy, onPractice, onBrowse };
}

describe("DeckDetailContainer", () => {
  it("shows a loading state, then the card count", async () => {
    renderContainer(makeUseCasesFake({ listCards: vi.fn(async () => [card]) }));
    expect(screen.getByText("Loading cards…")).toBeInTheDocument();
    expect(
      await screen.findByText(/1 card in this deck/),
    ).toBeInTheDocument();
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
    const { onBack, onAddCard, onStudy, onPractice, onBrowse } =
      renderContainer(makeUseCasesFake());
    fireEvent.click(
      await screen.findByRole("button", { name: "Back to decks" }),
    );
    expect(onBack).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Add card" }));
    expect(onAddCard).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Study" }));
    expect(onStudy).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Practice" }));
    expect(onPractice).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Browser" }));
    expect(onBrowse).toHaveBeenCalledOnce();
  });
});
