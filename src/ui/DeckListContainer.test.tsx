import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeckListContainer } from "./DeckListContainer";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
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
};

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onStudyDeck = vi.fn();
  const onCreateDeck = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <DeckListContainer
        useCases={useCases}
        instance={instance}
        onStudyDeck={onStudyDeck}
        onCreateDeck={onCreateDeck}
      />
    </QueryClientProvider>,
  );
  return { onStudyDeck, onCreateDeck };
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

  it("forwards starting a study session", async () => {
    const useCases = makeUseCasesFake({ listDecks: vi.fn(async () => [deck]) });
    const { onStudyDeck } = renderContainer(useCases);

    fireEvent.click(
      await screen.findByRole("button", { name: "Study Kanji N5" }),
    );
    expect(onStudyDeck).toHaveBeenCalledWith(deck);
  });
});
