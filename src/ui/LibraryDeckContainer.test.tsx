import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LibraryDeckContainer } from "./LibraryDeckContainer";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { LibraryDeck } from "../domain/library";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "Geography",
};

const capitals: LibraryDeck = {
  url: "https://solid-memo.com/decks/capitals.ttl",
  name: "Capitals",
  cardCount: 2,
  authors: ["Anton Wiklund"],
  sources: [],
};

const importedDeck: Deck = {
  id: "deck-1",
  url: `${instance.url}catalog.ttl#deck-1`,
  name: "Capitals",
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
  sourceUrl: capitals.url,
};

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onDone = vi.fn();
  const onBrowse = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <LibraryDeckContainer
        useCases={useCases}
        instance={instance}
        deck={capitals}
        onBrowse={onBrowse}
        onDone={onDone}
      />
    </QueryClientProvider>,
  );
  return { onDone, onBrowse, queryClient };
}

describe("LibraryDeckContainer", () => {
  it("shows the deck under a link to its own page", () => {
    renderContainer(makeUseCasesFake());
    expect(screen.getByRole("link", { name: "Capitals" })).toHaveAttribute(
      "href",
      `#/library-deck?instance=${encodeURIComponent(instance.url)}&deck=${encodeURIComponent(capitals.url)}`,
    );
    expect(screen.queryByText("Already imported")).toBeNull();
  });

  it("hands the card list over to its owner", () => {
    const { onBrowse } = renderContainer(makeUseCasesFake());
    fireEvent.click(screen.getByRole("button", { name: "Browse cards" }));
    expect(onBrowse).toHaveBeenCalledOnce();
  });

  it("marks the deck when the instance already holds a copy", async () => {
    renderContainer(
      makeUseCasesFake({
        listDecks: vi.fn(async () => [
          importedDeck,
          // A hand-made deck has no source and marks nothing.
          { ...importedDeck, id: "deck-2", sourceUrl: undefined },
        ]),
      }),
    );
    expect(await screen.findByText("Already imported")).toBeInTheDocument();
  });

  it("imports the deck, refreshes the deck list and returns", async () => {
    const importLibraryDeck = vi.fn(async () => importedDeck);
    const useCases = makeUseCasesFake({ importLibraryDeck });
    const { onDone } = renderContainer(useCases);

    fireEvent.click(screen.getByRole("button", { name: "Import this deck" }));

    await waitFor(() => expect(onDone).toHaveBeenCalledOnce());
    expect(importLibraryDeck).toHaveBeenCalledWith(instance.url, capitals);
    // The deck list's cache entry is refreshed once the deck is in.
    await waitFor(() => expect(useCases.listDecks).toHaveBeenCalledTimes(2));
  });

  it("shows the error when the import fails", async () => {
    const { onDone } = renderContainer(
      makeUseCasesFake({
        importLibraryDeck: vi.fn(async () => {
          throw new Error("pod refused");
        }),
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Import this deck" }));
    expect(await screen.findByText("pod refused")).toHaveClass("error");
    expect(onDone).not.toHaveBeenCalled();
  });
});
