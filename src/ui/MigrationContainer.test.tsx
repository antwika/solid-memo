import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MigrationContainer } from "./MigrationContainer";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { MigrationPlan } from "../domain/migration";
import type { UpdateOutcome, UpdateProgress } from "../domain/instanceUpdate";
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
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
};
const nothing = { reviewCount: 0, preferencesOutdated: false, instanceOutdated: false, catalogMissing: false };
const session = { webId: "https://alice.example/profile/card#me" };
const outdated: MigrationPlan = {
  decks: [{ deck, deckOutdated: true, cardCount: 3, reviewCount: 0 }],
  deckCount: 1,
  cardCount: 3,
  ...nothing,
};
const current: MigrationPlan = { decks: [], deckCount: 0, cardCount: 0, ...nothing };

function renderContainer(useCases: UseCases, onUpdated = vi.fn()) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const invalidate = vi.spyOn(queryClient, "invalidateQueries");
  render(
    <QueryClientProvider client={queryClient}>
      <MigrationContainer useCases={useCases} session={session} instance={instance} onUpdated={onUpdated} />
    </QueryClientProvider>,
  );
  return { invalidate, queryClient, onUpdated };
}

describe("MigrationContainer", () => {
  it("shows nothing while planning, when nothing is outdated, or when the check fails", async () => {
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => current),
    });
    const { container } = render(
      <QueryClientProvider client={new QueryClient()}>
        <MigrationContainer useCases={useCases} session={session} instance={instance} onUpdated={vi.fn()} />
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
          session={session}
          instance={instance}
          onUpdated={vi.fn()}
        />
      </QueryClientProvider>,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(failing.container).toBeEmptyDOMElement();
  });

  it("asks before updating, and does nothing when the user says not now", async () => {
    const useCases = makeUseCasesFake({ planMigration: vi.fn(async () => outdated) });
    renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Update 1 deck" }));
    expect(screen.getByRole("region", { name: "Start the update" })).toHaveTextContent("kept as a backup");
    fireEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.getByRole("button", { name: "Update 1 deck" })).toBeEnabled();
    expect(useCases.updateInstance).not.toHaveBeenCalled();
  });

  it("runs the update once started, showing its progress, then opens the updated instance", async () => {
    let finish: (outcome: UpdateOutcome) => void = () => undefined;
    let report: ((progress: UpdateProgress) => void) | undefined;
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => outdated),
      updateInstance: vi.fn((_s, _i, onProgress) => {
        report = onProgress;
        return new Promise<UpdateOutcome>((resolve) => (finish = resolve));
      }),
    });
    const { invalidate, onUpdated } = renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Update 1 deck" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the update" }));
    expect(screen.getByRole("region", { name: "Updating" })).toHaveTextContent("Preparing a new copy…");
    await waitFor(() => expect(report).toBeDefined());
    act(() => report!({ step: "copy", done: 3, total: 10 }));
    expect(screen.getByRole("region", { name: "Updating" })).toHaveTextContent("Copying documents… (3 of 10)");
    expect(screen.getByRole("progressbar", { name: "Update progress" })).toHaveAttribute("value", "3");
    act(() => finish({ ok: true, instanceUrl: "https://pod.example/solid-memo/a-1/", backupUrl: instance.url }));
    await waitFor(() =>
      expect(onUpdated).toHaveBeenCalledWith({ url: "https://pod.example/solid-memo/a-1/", name: "Main" }),
    );
    expect(useCases.updateInstance).toHaveBeenCalledWith(session, instance, expect.any(Function));
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["instances"] });
  });

  it("says where the update failed, and that nothing changed, then goes back to the offer", async () => {
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => outdated),
      updateInstance: vi.fn(async (): Promise<UpdateOutcome> => ({
        ok: false,
        step: "validate",
        error: "The updated copy does not conform",
        cleanedUp: true,
      })),
    });
    renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Update 1 deck" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the update" }));
    const failed = await screen.findByRole("region", { name: "Update failed" });
    expect(failed).toHaveTextContent(
      "The update failed while checking the new copy: The updated copy does not conform",
    );
    expect(failed).toHaveTextContent("No changes were made to your data. The partial copy was removed.");
    expect(screen.queryByRole("button", { name: "Try removing it again" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.getByRole("button", { name: "Update 1 deck" })).toBeEnabled();
  });

  it("names a copy it could not remove, and removes it on request", async () => {
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => outdated),
      updateInstance: vi.fn(async (): Promise<UpdateOutcome> => ({
        ok: false,
        step: "copy",
        error: "offline",
        cleanedUp: false,
        leftoverUrl: "https://pod.example/solid-memo/a-1/",
      })),
    });
    renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Update 1 deck" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the update" }));
    expect(await screen.findByRole("region", { name: "Update failed" })).toHaveTextContent(
      "The partial copy could not be removed; it is at https://pod.example/solid-memo/a-1/.",
    );
    fireEvent.click(screen.getByRole("button", { name: "Try removing it again" }));
    await waitFor(() => expect(screen.queryByRole("region", { name: "Update failed" })).toBeNull());
    expect(useCases.removeInterruptedUpdate).toHaveBeenCalledWith(instance);
  });

  it("shows an error thrown by the update on the offer", async () => {
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => outdated),
      updateInstance: vi.fn(async () => {
        throw new Error("write refused");
      }),
    });
    renderContainer(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Update 1 deck" }));
    fireEvent.click(screen.getByRole("button", { name: "Start the update" }));
    expect(await screen.findByText("write refused")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update 1 deck" })).toBeEnabled();
  });

  it("offers to remove what an interrupted update left, and says why it could not", async () => {
    let leftover: string | null = "https://pod.example/solid-memo/a-1/";
    const removeInterruptedUpdate = vi
      .fn()
      .mockRejectedValueOnce(new Error("not allowed"))
      .mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        leftover = null;
      });
    const useCases = makeUseCasesFake({
      planMigration: vi.fn(async () => current),
      findInterruptedUpdate: vi.fn(async () => leftover),
      removeInterruptedUpdate,
    });
    renderContainer(useCases);
    const notice = await screen.findByRole("region", { name: "Interrupted update" });
    expect(notice).toHaveTextContent("A partial copy remains at https://pod.example/solid-memo/a-1/.");
    fireEvent.click(screen.getByRole("button", { name: "Remove it" }));
    expect(await screen.findByText("not allowed")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove it" }));
    expect(await screen.findByRole("button", { name: "Removing…" })).toBeDisabled();
    await waitFor(() => expect(screen.queryByRole("region", { name: "Interrupted update" })).toBeNull());
  });
});
