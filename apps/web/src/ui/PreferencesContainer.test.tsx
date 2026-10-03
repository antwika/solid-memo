import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PreferencesContainer } from "./PreferencesContainer";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import { DEFAULT_PREFERENCES, type StudyPreferences } from "@solid-memo/domain/preferences";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = {
  url: "https://pod.example/solid-memo/a/",
  name: "Japanese study",
};

function renderContainer(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const onBack = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <PreferencesContainer
        useCases={useCases}
        instance={instance}
        onBack={onBack}
      />
    </QueryClientProvider>,
  );
  return { onBack, queryClient };
}

describe("PreferencesContainer", () => {
  it("shows a loading state, then the form", async () => {
    renderContainer(
      makeUseCasesFake({
        getPreferences: vi.fn(
          () => new Promise<StudyPreferences>(() => { }),
        ),
      }),
    );
    expect(screen.getByText("Loading preferences…")).toBeInTheDocument();
  });

  it("shows an error when loading fails", async () => {
    renderContainer(
      makeUseCasesFake({
        getPreferences: vi.fn(async () => {
          throw new Error("prefs unreachable");
        }),
      }),
    );
    expect(await screen.findByText("prefs unreachable")).toBeInTheDocument();
  });

  it("saves and returns to the deck list", async () => {
    const useCases = makeUseCasesFake();
    const { onBack, queryClient } = renderContainer(useCases);
    const queueKey = ["studyQueue", "https://pod.example/catalog.ttl#deck-1"];
    queryClient.setQueryData(queueKey, { due: [], newCards: [], studiedToday: 0 });

    fireEvent.input(await screen.findByLabelText("New cards per day"), {
      target: { value: "7" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Save" }).closest("form")!,
    );

    await waitFor(() => {
      expect(onBack).toHaveBeenCalledOnce();
    });
    expect(queryClient.getQueryData(queueKey)).toBeUndefined();
    expect(useCases.savePreferences).toHaveBeenCalledWith(instance.url, {
      newCardsPerDay: 7,
      maxReviewsPerDay: 200,
      dayBoundaryHour: 4,
      answerScale: "sm2",
      scheduler: "sm2",
      desiredRetention: 0.9,
      developerMode: false,
      invalidDataPolicy: "block-instance" as const,
    });
  });

  it("reschedules with FSRS, forgets the study queues, and says what moved", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const useCases = makeUseCasesFake({
      getPreferences: vi.fn(async () => ({ ...DEFAULT_PREFERENCES, scheduler: "fsrs" as const })),
      rescheduleWithFsrs: vi.fn(async () => ({ sooner: 5, later: 8 })),
    });
    const { onBack, queryClient } = renderContainer(useCases);
    const queueKey = ["studyQueue", "https://pod.example/catalog.ttl#deck-1"];
    queryClient.setQueryData(queueKey, { due: [], newCards: [], studiedToday: 0 });

    fireEvent.click(await screen.findByRole("button", { name: "Reschedule due dates with FSRS" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Rescheduled. Due sooner: 5. Due later: 8.");
    expect(useCases.rescheduleWithFsrs).toHaveBeenCalledWith(instance.url);
    expect(queryClient.getQueryData(queueKey)).toBeUndefined();
    expect(onBack).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("shows a reschedule error", async () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    renderContainer(
      makeUseCasesFake({
        getPreferences: vi.fn(async () => ({ ...DEFAULT_PREFERENCES, scheduler: "fsrs" as const })),
        rescheduleWithFsrs: vi.fn(async () => {
          throw new Error("reviews unreachable");
        }),
      }),
    );
    fireEvent.click(await screen.findByRole("button", { name: "Reschedule due dates with FSRS" }));
    expect(await screen.findByText("reviews unreachable")).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("shows a save error", async () => {
    renderContainer(
      makeUseCasesFake({
        savePreferences: vi.fn(async () => {
          throw new Error("write refused");
        }),
      }),
    );

    fireEvent.submit(
      (await screen.findByRole("button", { name: "Save" })).closest("form")!,
    );
    expect(await screen.findByText("write refused")).toBeInTheDocument();
  });

});
