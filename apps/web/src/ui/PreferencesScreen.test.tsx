import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { PreferencesScreen } from "./PreferencesScreen";
import { I18nProvider } from "./i18n";
import { DEFAULT_PREFERENCES } from "@solid-memo/domain/preferences";

function renderScreen(
  overrides: Partial<Parameters<typeof PreferencesScreen>[0]> = {},
) {
  const props = {
    preferences: DEFAULT_PREFERENCES,
    busy: false,
    error: null,
    onSave: vi.fn(),
    ...overrides,
  };
  const view = render(<PreferencesScreen {...props} />);
  return { ...view, props };
}

describe("PreferencesScreen", () => {
  it("advises a small, steady number of new cards", () => {
    renderScreen();
    expect(screen.getByLabelText("New cards per day")).toHaveAccessibleDescription(
      /a high number now piles up reviews later\. Better to start small and be consistent/,
    );
  });

  it("switches the language right away, without saving", () => {
    const onChoose = vi.fn();
    const onSave = vi.fn();
    render(
      <I18nProvider locale="en" onChoose={onChoose}>
        <PreferencesScreen preferences={DEFAULT_PREFERENCES} busy={false} error={null} onSave={onSave} />
      </I18nProvider>,
    );
    expect(screen.getByRole("radio", { name: "English" })).toBeChecked();
    fireEvent.click(screen.getByRole("radio", { name: "Svenska" }));
    expect(onChoose).toHaveBeenCalledWith("sv");
    expect(onSave).not.toHaveBeenCalled();
  });

  it("prefills the current preferences", () => {
    renderScreen({
      preferences: {
        newCardsPerDay: 10,
        maxReviewsPerDay: 50,
        dayBoundaryHour: 2,
        answerScale: "minimal",
        developerMode: true,
        invalidDataPolicy: "block-instance" as const,
      },
    });
    expect(screen.getByLabelText("New cards per day")).toHaveValue(10);
    expect(screen.getByLabelText("Max reviews per day")).toHaveValue(50);
    expect(screen.getByLabelText("Day starts at (hour)")).toHaveValue(2);
    expect(screen.getByLabelText("Developer mode")).toBeChecked();
    expect(screen.getByLabelText(/Again · Hard · Good · Easy/)).toBeChecked();
  });

  it("keeps developer mode off by default", () => {
    renderScreen();
    expect(screen.getByLabelText("Developer mode")).not.toBeChecked();
  });

  it("activates developer mode under Developer settings", () => {
    const { props, container } = renderScreen();
    expect(screen.getByRole("group", { name: "Developer settings" })).toContainElement(
      screen.getByLabelText("Developer mode"),
    );

    fireEvent.click(screen.getByLabelText("Developer mode"));
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onSave).toHaveBeenCalledWith({
      ...DEFAULT_PREFERENCES,
      developerMode: true,
      invalidDataPolicy: "block-instance" as const,
    });
  });

  it("switches the answer scale and saves it", () => {
    const { props, container } = renderScreen();
    expect(screen.getByLabelText(/0 to 5 scale/)).toBeChecked();

    fireEvent.click(screen.getByLabelText(/Again · Hard · Good · Easy/));
    fireEvent.submit(container.querySelector("form")!);

    expect(props.onSave).toHaveBeenCalledWith({
      ...DEFAULT_PREFERENCES,
      answerScale: "minimal",
    });
  });

  it("offers what to do with invalid data, labelled from the vocabulary, and saves the choice", () => {
    const { props, container } = renderScreen();
    const group = screen.getByRole("group", { name: "When data does not conform" });
    expect(group).toContainElement(screen.getByLabelText(/Block the instance/));
    expect(screen.getByLabelText(/Block the instance/)).toBeChecked();
    expect(group).toHaveTextContent("Any invalid data stops the app from using the instance until it is repaired.");

    fireEvent.click(screen.getByLabelText(/Set invalid data aside/));
    fireEvent.submit(container.querySelector("form")!);

    expect(props.onSave).toHaveBeenCalledWith({
      ...DEFAULT_PREFERENCES,
      invalidDataPolicy: "block-subject",
    });
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
      answerScale: "sm2",
      developerMode: false,
      invalidDataPolicy: "block-instance" as const,
    });
  });

  it("shows busy state and errors", () => {
    renderScreen({ busy: true, error: "save failed" });
    expect(screen.getByLabelText("New cards per day")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(screen.getByText("save failed")).toBeInTheDocument();
  });

  it("speaks Swedish", () => {
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <PreferencesScreen preferences={DEFAULT_PREFERENCES} busy={false} error={null} onSave={vi.fn()} />
      </I18nProvider>,
    );
    expect(screen.getByRole("heading", { name: "Studieinställningar" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nya kort per dag")).toBeInTheDocument();
    expect(screen.getByLabelText(/Spärra instansen/)).toBeChecked();
  });
});
