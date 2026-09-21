import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PreferencesContainer } from "./PreferencesContainer";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import type { StudyPreferences } from "../domain/preferences";
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
  return { onBack };
}

describe("PreferencesContainer", () => {
  it("shows a loading state, then the form", async () => {
    renderContainer(
      makeUseCasesFake({
        getPreferences: vi.fn(
          () => new Promise<StudyPreferences>(() => {}),
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
    const { onBack } = renderContainer(useCases);

    fireEvent.input(await screen.findByLabelText("New cards per day"), {
      target: { value: "7" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Save" }).closest("form")!,
    );

    await waitFor(() => {
      expect(onBack).toHaveBeenCalledOnce();
    });
    expect(useCases.savePreferences).toHaveBeenCalledWith(instance.url, {
      newCardsPerDay: 7,
      maxReviewsPerDay: 200,
      dayBoundaryHour: 4,
    });
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

  it("navigates back", async () => {
    const { onBack } = renderContainer(makeUseCasesFake());
    fireEvent.click(
      await screen.findByRole("button", { name: "Back to decks" }),
    );
    expect(onBack).toHaveBeenCalledOnce();
  });
});
