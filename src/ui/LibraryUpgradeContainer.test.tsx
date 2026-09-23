import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LibraryUpgradeContainer } from "./LibraryUpgradeContainer";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { LibraryUpgradePlan } from "../domain/libraryUpgrade";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "A",
};
const imported: Deck = {
  id: "deck-1",
  url: `${instance.url}catalog.ttl#deck-1`,
  name: "Capitals",
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: ["Anton Wiklund"],
  sourceUrl: "https://solid-memo.com/decks/capitals.ttl",
};
const plan: LibraryUpgradePlan = {
  fromVersion: 1,
  toVersion: 2,
  direction: "bidirectional",
};

function renderContainer(useCases: UseCases, deck: Deck = imported) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const invalidate = vi.spyOn(queryClient, "invalidateQueries");
  const remove = vi.spyOn(queryClient, "removeQueries");
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <LibraryUpgradeContainer useCases={useCases} instance={instance} deck={deck} />
    </QueryClientProvider>,
  );
  return { container, invalidate, remove };
}

describe("LibraryUpgradeContainer", () => {
  it("checks nothing for a home-made deck", async () => {
    const useCases = makeUseCasesFake();
    const { container } = renderContainer(useCases, {
      ...imported,
      sourceUrl: undefined,
    });
    expect(container).toBeEmptyDOMElement();
    expect(useCases.planLibraryUpgrade).not.toHaveBeenCalled();
  });

  it("shows nothing when the library has nothing newer, or cannot be read", async () => {
    const quiet = makeUseCasesFake();
    const { container } = renderContainer(quiet);
    await waitFor(() =>
      expect(quiet.planLibraryUpgrade).toHaveBeenCalledWith(imported),
    );
    expect(container).toBeEmptyDOMElement();

    const failing = makeUseCasesFake({
      planLibraryUpgrade: vi.fn(async () => {
        throw new Error("library offline");
      }),
    });
    const { container: other } = renderContainer(failing);
    await waitFor(() => expect(failing.planLibraryUpgrade).toHaveBeenCalled());
    expect(other).toBeEmptyDOMElement();
  });

  it("offers the upgrade, applies it on request, refreshes what depends on the deck, and reports", async () => {
    let current: LibraryUpgradePlan | null = plan;
    const useCases = makeUseCasesFake({
      planLibraryUpgrade: vi.fn(async () => current),
      applyLibraryUpgrade: vi.fn(async (deck, applied) => {
        current = null;
        return { ...deck, direction: applied.direction, formatVersion: 2 };
      }),
    });
    const { invalidate, remove } = renderContainer(useCases);

    fireEvent.click(
      await screen.findByRole("button", { name: "Update from the library" }),
    );

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Updated from the library: now studied both ways.",
    );
    expect(useCases.applyLibraryUpgrade).toHaveBeenCalledWith(imported, plan);
    expect(remove).toHaveBeenCalledWith({ queryKey: ["studyQueue", imported.url] });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["decks"] });
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ["migration", instance.url],
    });
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("keeps the offer up with the error when the update fails", async () => {
    renderContainer(
      makeUseCasesFake({
        planLibraryUpgrade: vi.fn(async () => plan),
        applyLibraryUpgrade: vi.fn(async () => {
          throw new Error("write refused");
        }),
      }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Update from the library" }),
    );
    expect(await screen.findByText("write refused")).toHaveClass("error");
    expect(
      screen.getByRole("button", { name: "Update from the library" }),
    ).toBeEnabled();
  });
});
