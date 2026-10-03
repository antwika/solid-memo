import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LibraryUpgradeContainer } from "./LibraryUpgradeContainer";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import type { LibraryUpgradePlan } from "@solid-memo/domain/libraryUpgrade";
import type { DeckUpgradeOutcome, DeckUpgradeProgress } from "@solid-memo/domain/deckUpgrade";
import { AppError } from "@solid-memo/domain/appError";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "A",
};
const imported: Deck = {
  id: "deck-1",
  url: `${instance.url}catalog.ttl#deck-1`,
  title: { en: "Capitals" },
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: ["Anton Wiklund"],
  sourceUrl: "https://solid-memo.com/decks/capitals.ttl",
};
const plan: LibraryUpgradePlan = {
  fromVersion: "1",
  toVersion: "2",
  releaseUrl: "https://solid-memo.com/decks/capitals/2.ttl",
  notes: [],
  add: [{ id: "no", front: { "": "Norway" }, back: { "": "Oslo" }, formatVersion: 1 }],
  change: [],
  retire: [],
  restore: [],
  remove: [],
  kept: [],
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

  it("gives the deck the languages its release adds, once, and refreshes the deck list when it did", async () => {
    const useCases = makeUseCasesFake({
      addReleaseLanguages: vi.fn(async (deck: Deck) => ({ ...deck, title: { en: "Capitals", sv: "Huvudstäder" } })),
    });
    const { invalidate } = renderContainer(useCases);
    await waitFor(() => expect(invalidate).toHaveBeenCalledWith({ queryKey: ["decks"] }));
    expect(useCases.addReleaseLanguages).toHaveBeenCalledOnce();
    expect(useCases.addReleaseLanguages).toHaveBeenCalledWith(imported);
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

  it("tidies away what an upgrade cut off half-way left, once", async () => {
    const useCases = makeUseCasesFake();
    renderContainer(useCases);
    await waitFor(() => expect(useCases.tidyInterruptedDeckUpgrade).toHaveBeenCalledWith(imported));
  });

  it("offers the upgrade, shows its steps while it runs, then refreshes what depends on the deck at once, and reports", async () => {
    let current: LibraryUpgradePlan | null = plan;
    let report: ((progress: DeckUpgradeProgress) => void) | undefined;
    let finish: (() => void) | undefined;
    const useCases = makeUseCasesFake({
      planLibraryUpgrade: vi.fn(async () => current),
      applyLibraryUpgrade: vi.fn(
        (deck: Deck, applied: LibraryUpgradePlan, onProgress?: (progress: DeckUpgradeProgress) => void) =>
          new Promise<DeckUpgradeOutcome>((resolve) => {
            report = onProgress;
            finish = () => {
              current = null;
              resolve({ ok: true, deck: { ...deck, sourceUrl: applied.releaseUrl }, tidied: true });
            };
          }),
      ),
    });
    const { invalidate, remove } = renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Update to release 2" }));

    const region = await screen.findByRole("region", { name: "Updating the deck" });
    expect(region).toHaveTextContent("Reading the deck and its cards…");
    act(() => report!({ step: "verify", done: 3, total: 6 }));
    expect(screen.getByRole("status")).toHaveTextContent("Checking nothing changed meanwhile…");
    expect(screen.getByRole("progressbar", { name: "Update progress" })).toHaveAttribute("value", "3");
    expect(screen.getByRole("progressbar", { name: "Update progress" })).toHaveAttribute("max", "7");
    const steps = within(region).getAllByRole("listitem");
    expect(steps.map((step) => step.textContent)).toEqual([
      "✓Reading the deck and its cards (done)",
      "✓Writing the updated cards to new documents (done)",
      "✓Checking what was written (done)",
      "➜Checking nothing changed meanwhile (in progress)",
      "·Switching the deck over",
      "·Removing the old documents",
      "·Showing the updated deck",
    ]);
    expect(steps[3]).toHaveAttribute("aria-current", "step");
    expect(screen.queryByRole("button", { name: "Update to release 2" })).toBeNull();

    act(() => finish!());
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Updated to release 2 from the library."));
    expect(useCases.applyLibraryUpgrade).toHaveBeenCalledWith(imported, plan, expect.any(Function));
    expect(remove).toHaveBeenCalledWith({ queryKey: ["studyQueue", imported.url] });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["decks"] });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["cards", imported.cardsDocumentUrl] });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["reviews", imported.reviewsDocumentUrl] });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["migration", instance.url] });
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("says where a failed upgrade stopped and that the deck is as it was, and lets the user try again or close", async () => {
    const failed: DeckUpgradeOutcome = {
      ok: false,
      step: "verify",
      error: new AppError("deckChangedDuringUpgrade", { url: imported.cardsDocumentUrl }),
      cleanedUp: true,
    };
    const useCases = makeUseCasesFake({
      planLibraryUpgrade: vi.fn(async () => plan),
      applyLibraryUpgrade: vi.fn(async () => failed),
    });
    const { invalidate } = renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Update to release 2" }));

    const region = await screen.findByRole("region", { name: "Update failed" });
    expect(region).toHaveTextContent(
      `The update failed while checking nothing changed meanwhile: <${imported.cardsDocumentUrl}> changed while the deck was being updated`,
    );
    expect(region).toHaveTextContent("Your deck was not changed. The new documents were removed.");
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["libraryUpgrade", imported.url] });
    expect(invalidate).not.toHaveBeenCalledWith({ queryKey: ["decks"] });

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() => expect(useCases.applyLibraryUpgrade).toHaveBeenCalledTimes(2));
    fireEvent.click(await screen.findByRole("button", { name: "Close" }));
    expect(await screen.findByRole("button", { name: "Update to release 2" })).toBeEnabled();
  });

  it("says when the new documents are left for later, and closes when the offer is gone", async () => {
    let current: LibraryUpgradePlan | null = plan;
    const useCases = makeUseCasesFake({
      planLibraryUpgrade: vi.fn(async () => current),
      applyLibraryUpgrade: vi.fn(async (): Promise<DeckUpgradeOutcome> => {
        current = null;
        return { ok: false, step: "read", error: new AppError("deckChangedSinceOffer"), cleanedUp: false };
      }),
    });
    const { container } = renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Update to release 2" }));
    expect(await screen.findByRole("region", { name: "Update failed" })).toHaveTextContent(
      "The new documents could not be removed yet",
    );
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() => expect(container).toBeEmptyDOMElement());
    expect(useCases.applyLibraryUpgrade).toHaveBeenCalledOnce();
  });

  it("keeps the offer up with the error when the update throws", async () => {
    renderContainer(
      makeUseCasesFake({
        planLibraryUpgrade: vi.fn(async () => plan),
        applyLibraryUpgrade: vi.fn(async () => {
          throw new Error("write refused");
        }),
      }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Update to release 2" }),
    );
    expect(await screen.findByText("write refused")).toHaveClass("error");
    expect(
      screen.getByRole("button", { name: "Update to release 2" }),
    ).toBeEnabled();
  });
});
