import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import { DEFAULT_PREFERENCES } from "@solid-memo/domain/preferences";
import { DeckPreferencesContainer } from "./DeckPreferencesContainer";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "A",
};

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  title: { en: "Kanji N5" },
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  direction: "front-to-back",
  createdAt: "",
  formatVersion: 3,
  authors: [],
};

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onDone = vi.fn();
  const onDeckRemoved = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <DeckPreferencesContainer
        useCases={useCases}
        instance={instance}
        deck={deck}
        onDeckRemoved={onDeckRemoved}
        onDone={onDone}
      />
    </QueryClientProvider>,
  );
  return { onDone, onDeckRemoved, queryClient };
}

describe("DeckPreferencesContainer", () => {
  it("shows a loading state, then the form against the instance's preferences", async () => {
    const useCases = makeUseCasesFake({
      getPreferences: vi.fn(async () => ({ ...DEFAULT_PREFERENCES, newCardsPerDay: 7 })),
    });
    renderContainer(useCases);
    expect(screen.getByText("Loading preferences…")).toBeInTheDocument();
    expect(await screen.findByLabelText("New cards per day")).toHaveAttribute(
      "placeholder",
      "7",
    );
    expect(useCases.getPreferences).toHaveBeenCalledWith(instance.url);
    expect(screen.getByRole("link", { name: "Kanji N5" })).toHaveAttribute(
      "href",
      `#/deck?instance=${encodeURIComponent(instance.url)}&deck=${encodeURIComponent(deck.url)}`,
    );
    expect(screen.getByRole("link", { name: "study preferences" })).toHaveAttribute(
      "href",
      `#/preferences?instance=${encodeURIComponent(instance.url)}`,
    );
  });

  it("saves the deck's limits, drops its study queue and returns", async () => {
    const useCases = makeUseCasesFake();
    const { onDone, queryClient } = renderContainer(useCases);
    const remove = vi.spyOn(queryClient, "removeQueries");

    fireEvent.input(await screen.findByLabelText("New cards per day"), { target: { value: "3" } });
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    await waitFor(() => expect(onDone).toHaveBeenCalledOnce());
    expect(useCases.setDeckPace).toHaveBeenCalledWith(deck, { newCardsPerDay: 3 });
    expect(remove).toHaveBeenCalledWith({ queryKey: ["studyQueue", deck.url] });
  });

  it("shows a save error and stays", async () => {
    const { onDone } = renderContainer(
      makeUseCasesFake({
        setDeckPace: vi.fn(async () => {
          throw new Error("A daily limit is a whole number, 0 or more.");
        }),
      }),
    );
    fireEvent.click(await screen.findByRole("button", { name: "Save preferences" }));
    expect((await screen.findByText("A daily limit is a whole number, 0 or more.")).closest(".error")).toBeInTheDocument();
    expect(onDone).not.toHaveBeenCalled();
  });

  it("renames the deck and refreshes every deck list, staying on the page", async () => {
    const useCases = makeUseCasesFake();
    const { onDone, queryClient } = renderContainer(useCases);
    const invalidate = vi.spyOn(queryClient, "invalidateQueries");
    fireEvent.click(await screen.findByRole("button", { name: "Rename deck" }));
    fireEvent.input(screen.getByLabelText("Deck name"), { target: { value: "Kanji N4" } });
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));
    await waitFor(() => expect(useCases.renameDeck).toHaveBeenCalledWith(deck, "Kanji N4", "en"));
    await waitFor(() => expect(invalidate).toHaveBeenCalledWith({ queryKey: ["decks"] }));
    expect(onDone).not.toHaveBeenCalled();
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
    expect((await screen.findByText("rename refused")).closest(".error")).toBeInTheDocument();
  });

  it("removes the deck, refreshes the deck lists, then leaves", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const useCases = makeUseCasesFake();
    const { onDeckRemoved, queryClient } = renderContainer(useCases);
    const invalidate = vi.spyOn(queryClient, "invalidateQueries");
    fireEvent.click(await screen.findByRole("button", { name: "Remove deck" }));
    await waitFor(() => expect(onDeckRemoved).toHaveBeenCalledOnce());
    expect(useCases.removeDeck).toHaveBeenCalledWith(deck);
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["decks"] });
    vi.unstubAllGlobals();
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
    expect((await screen.findByText("deck remove refused")).closest(".error")).toBeInTheDocument();
    expect(onDeckRemoved).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("shows an error when the preferences cannot be read", async () => {
    renderContainer(
      makeUseCasesFake({
        getPreferences: vi.fn(async () => {
          throw new Error("preferences unreachable");
        }),
      }),
    );
    expect((await screen.findByText("preferences unreachable")).closest(".error")).toBeInTheDocument();
  });
});
