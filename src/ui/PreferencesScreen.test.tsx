import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { PreferencesScreen } from "./PreferencesScreen";
import { DEFAULT_PREFERENCES } from "../domain/preferences";

function renderScreen(
  overrides: Partial<Parameters<typeof PreferencesScreen>[0]> = {},
) {
  const props = {
    preferences: DEFAULT_PREFERENCES,
    busy: false,
    error: null,
    onSave: vi.fn(),
    onBack: vi.fn(),
    ...overrides,
  };
  const view = render(<PreferencesScreen {...props} />);
  return { ...view, props };
}

describe("PreferencesScreen", () => {
  it("prefills the current preferences", () => {
    renderScreen({
      preferences: {
        newCardsPerDay: 10,
        maxReviewsPerDay: 50,
        dayBoundaryHour: 2,
      },
    });
    expect(screen.getByLabelText("New cards per day")).toHaveValue(10);
    expect(screen.getByLabelText("Max reviews per day")).toHaveValue(50);
    expect(screen.getByLabelText("Day starts at (hour)")).toHaveValue(2);
  });

  it("saves the edited preferences as numbers", () => {
    const { props, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("New cards per day"), {
      target: { value: "15" },
    });
    fireEvent.input(screen.getByLabelText("Max reviews per day"), {
      target: { value: "120" },
    });
    fireEvent.input(screen.getByLabelText("Day starts at (hour)"), {
      target: { value: "0" },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onSave).toHaveBeenCalledWith({
      newCardsPerDay: 15,
      maxReviewsPerDay: 120,
      dayBoundaryHour: 0,
    });
  });

  it("navigates back", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Back to decks" }));
    expect(props.onBack).toHaveBeenCalledOnce();
  });

  it("shows busy state and errors", () => {
    renderScreen({ busy: true, error: "save failed" });
    expect(screen.getByLabelText("New cards per day")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(screen.getByText("save failed")).toBeInTheDocument();
  });
});
