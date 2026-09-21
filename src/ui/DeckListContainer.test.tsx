import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeckListContainer } from "./DeckListContainer";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
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

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onOpenDeck = vi.fn();
  const onStudyDeck = vi.fn();
  const onCreateDeck = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <DeckListContainer
        useCases={useCases}
        instance={instance}
        onOpenDeck={onOpenDeck}
        onStudyDeck={onStudyDeck}
        onCreateDeck={onCreateDeck}
      />
    </QueryClientProvider>,
  );
  return { onOpenDeck, onStudyDeck, onCreateDeck };
}

describe("DeckListContainer", () => {
  it("shows a loading state, then the decks", async () => {
    const useCases = makeUseCasesFake({
      listDecks: vi.fn(async () => [deck]),
    });
    renderContainer(useCases);
    expect(screen.getByText("Loading decks…")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Kanji N5" }),
    ).toBeInTheDocument();
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

  it("removes a deck and refreshes the list", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const listDecks = vi
      .fn<() => Promise<Deck[]>>()
      .mockResolvedValueOnce([deck])
      .mockResolvedValue([]);
    const useCases = makeUseCasesFake({ listDecks });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Remove" }));

    await waitFor(() => {
      expect(useCases.removeDeck).toHaveBeenCalledWith(deck);
    });
    expect(await screen.findByText(/No decks yet/)).toBeInTheDocument();
  });

  it("shows a remove error", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const useCases = makeUseCasesFake({
      listDecks: vi.fn(async () => [deck]),
      removeDeck: vi.fn(async () => {
        throw new Error("remove refused");
      }),
    });
    renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Remove" }));
    expect(await screen.findByText("remove refused")).toBeInTheDocument();
  });

  it("forwards deck opening", async () => {
    const useCases = makeUseCasesFake({ listDecks: vi.fn(async () => [deck]) });
    const { onOpenDeck } = renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Kanji N5" }));
    expect(onOpenDeck).toHaveBeenCalledWith(deck);
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
