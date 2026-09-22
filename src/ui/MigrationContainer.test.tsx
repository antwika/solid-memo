import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MigrationContainer } from "./MigrationContainer";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { MigrationPlan } from "../domain/migration";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "Main",
};
const deck: Deck = {
  id: "deck-1",
  url: `${instance.url}catalog.ttl#deck-1`,
  name: "Kanji N5",
  cardsDocumentUrl: `${instance.url}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${instance.url}reviews/deck-1.ttl`,
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
};
const outdated: MigrationPlan = { decks: [{ deck, cardCount: 3 }], cardCount: 3 };
const current: MigrationPlan = { decks: [], cardCount: 0 };

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const invalidate = vi.spyOn(queryClient, "invalidateQueries");
  render(
    <QueryClientProvider client={queryClient}>
      <MigrationContainer useCases={useCases} instance={instance} />
    </QueryClientProvider>,
  );
  return { invalidate, queryClient };
}

describe("MigrationContainer", () => {
  it("shows nothing while planning, when nothing is outdated, or when the check fails", async () => {
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => current),
    });
    const { container } = render(
      <QueryClientProvider client={new QueryClient()}>
        <MigrationContainer useCases={useCases} instance={instance} />
      </QueryClientProvider>,
    );
    expect(container).toBeEmptyDOMElement();
    await waitFor(() => {
      expect(useCases.planMigration).toHaveBeenCalledWith(instance.url);
    });
    expect(container).toBeEmptyDOMElement();

    const failing = render(
      <QueryClientProvider
        client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
      >
        <MigrationContainer
          useCases={makeUseCasesFake({
            planMigration: vi.fn(async () => {
              throw new Error("pod unreachable");
            }),
          })}
          instance={instance}
        />
      </QueryClientProvider>,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(failing.container).toBeEmptyDOMElement();
  });

  it("offers the update, runs it on request, refreshes cards and reports the count", async () => {
    let plan = outdated;
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => plan),
      migrateInstance: vi.fn(async () => {
        plan = current;
        return 3;
      }),
    });
    const { invalidate } = renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Update 3 cards" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Updated 3 cards to the current card format.",
    );
    expect(useCases.migrateInstance).toHaveBeenCalledWith(instance.url);
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["cards"] });
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ["migration", instance.url],
    });
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("keeps the offer up, with the error and what remains, when the update fails", async () => {
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => outdated),
      migrateInstance: vi.fn(async () => {
        throw new Error("write refused");
      }),
    });
    const { invalidate } = renderContainer(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Update 3 cards" }));

    expect(await screen.findByText("write refused")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update 3 cards" })).toBeEnabled();
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ["migration", instance.url],
    });
    expect(useCases.planMigration).toHaveBeenCalledTimes(2);
  });
});
