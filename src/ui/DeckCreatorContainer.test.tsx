import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeckCreatorContainer } from "./DeckCreatorContainer";
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
  name: "Kana",
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  createdAt: "2026-09-21T10:00:00.000Z",
};

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onDone = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <DeckCreatorContainer
        useCases={useCases}
        instance={instance}
        onDone={onDone}
      />
    </QueryClientProvider>,
  );
  return { onDone };
}

describe("DeckCreatorContainer", () => {
  it("creates the deck and returns to the deck list", async () => {
    const useCases = makeUseCasesFake({
      createDeck: vi.fn(async () => deck),
    });
    const { onDone } = renderContainer(useCases);

    fireEvent.input(screen.getByLabelText("Name"), {
      target: { value: "Kana" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Create deck" }).closest("form")!,
    );

    await waitFor(() => {
      expect(onDone).toHaveBeenCalledOnce();
    });
    expect(useCases.createDeck).toHaveBeenCalledWith(instance.url, "Kana");
  });

  it("shows a create error and stays on the creator", async () => {
    const useCases = makeUseCasesFake({
      createDeck: vi.fn(async () => {
        throw new Error("save refused");
      }),
    });
    const { onDone } = renderContainer(useCases);

    fireEvent.input(screen.getByLabelText("Name"), {
      target: { value: "X" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Create deck" }).closest("form")!,
    );

    expect(await screen.findByText("save refused")).toBeInTheDocument();
    expect(onDone).not.toHaveBeenCalled();
  });

});
