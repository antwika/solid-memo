import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LibraryContainer } from "./LibraryContainer";
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
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
  direction: "front-to-back",
  sources: [],
};
const rivers: LibraryDeck = {
  url: "https://solid-memo.com/decks/rivers.ttl",
  name: "Rivers",
  cardCount: 1,
  authors: [],
  direction: "front-to-back",
  sources: [],
};

const importedDeck: Deck = {
  id: "deck-1",
  url: `${instance.url}catalog.ttl#deck-1`,
  name: "Capitals",
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  direction: "front-to-back",
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
  render(
    <QueryClientProvider client={queryClient}>
      <LibraryContainer
        useCases={useCases}
        instance={instance}
        onDone={onDone}
      />
    </QueryClientProvider>,
  );
  return { onDone, queryClient };
}

describe("LibraryContainer", () => {
  it("shows a loading state, then the library", async () => {
    renderContainer(
      makeUseCasesFake({
        listLibraryDecks: vi.fn(async () => [capitals, rivers]),
      }),
    );
    expect(screen.getByText("Loading the deck library…")).toBeInTheDocument();
    expect(
      await screen.findByRole("checkbox", { name: "Capitals" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Deck library" })).toHaveAttribute(
      "href",
      `#/library?instance=${encodeURIComponent(instance.url)}`,
    );
    expect(screen.getByRole("link", { name: "Capitals" })).toHaveAttribute(
      "href",
      `#/library-deck?instance=${encodeURIComponent(instance.url)}&deck=${encodeURIComponent(capitals.url)}`,
    );
  });

  it("shows an error when the library cannot be read", async () => {
    renderContainer(
      makeUseCasesFake({
        listLibraryDecks: vi.fn(async () => {
          throw new Error("library offline");
        }),
      }),
    );
    expect(await screen.findByText("library offline")).toHaveClass("error");
  });

  it("marks library decks the instance already imported", async () => {
    renderContainer(
      makeUseCasesFake({
        listLibraryDecks: vi.fn(async () => [capitals, rivers]),
        listDecks: vi.fn(async () => [
          importedDeck,
          // A hand-made deck has no source and marks nothing.
          { ...importedDeck, id: "deck-2", sourceUrl: undefined },
        ]),
      }),
    );
    expect(await screen.findByText("Already imported")).toBeInTheDocument();
    expect(screen.getAllByText("Already imported")).toHaveLength(1);
  });

  it("imports the ticked decks one by one, then returns to the deck list", async () => {
    const importLibraryDeck = vi.fn(async () => importedDeck);
    const useCases = makeUseCasesFake({
      listLibraryDecks: vi.fn(async () => [capitals, rivers]),
      importLibraryDeck,
    });
    const { onDone, queryClient } = renderContainer(useCases);
    // The deck list's cache entry is refreshed once the decks are in.
    queryClient.setQueryData(["decks", instance.url], []);

    fireEvent.click(await screen.findByRole("checkbox", { name: "Capitals" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Rivers" }));
    fireEvent.submit(
      screen.getByRole("button", { name: "Import 2 decks" }).closest("form")!,
    );

    await waitFor(() => expect(onDone).toHaveBeenCalledOnce());
    expect(importLibraryDeck.mock.calls).toEqual([
      [instance.url, capitals],
      [instance.url, rivers],
    ]);
    await waitFor(() =>
      expect(useCases.listDecks).toHaveBeenCalledTimes(2),
    );
  });

  it("shows the error and keeps the decks imported before it", async () => {
    const importLibraryDeck = vi
      .fn<UseCases["importLibraryDeck"]>()
      .mockResolvedValueOnce(importedDeck)
      .mockRejectedValueOnce(new Error("pod refused"));
    const listDecks = vi
      .fn<UseCases["listDecks"]>()
      .mockResolvedValueOnce([])
      .mockResolvedValue([importedDeck]);
    const useCases = makeUseCasesFake({
      listLibraryDecks: vi.fn(async () => [capitals, rivers]),
      importLibraryDeck,
      listDecks,
    });
    const { onDone } = renderContainer(useCases);

    fireEvent.click(await screen.findByRole("checkbox", { name: "Capitals" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Rivers" }));
    fireEvent.submit(
      screen.getByRole("button", { name: "Import 2 decks" }).closest("form")!,
    );

    expect(await screen.findByText("pod refused")).toHaveClass("error");
    expect(onDone).not.toHaveBeenCalled();
    // Capitals went in before Rivers failed: the refreshed deck list says so.
    expect(await screen.findByText("Already imported")).toBeInTheDocument();
  });
});
