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
    rescheduling: false,
    rescheduled: null,
    onReschedule: vi.fn(),
    ...overrides,
  };
  const view = render(<PreferencesScreen {...props} />);
  return { ...view, props };
}

describe("PreferencesScreen", () => {
  it("switches the language right away, without saving", () => {
    const onChoose = vi.fn();
    const onSave = vi.fn();
    render(
      <I18nProvider locale="en" onChoose={onChoose}>
        <PreferencesScreen preferences={DEFAULT_PREFERENCES} busy={false} error={null} onSave={onSave} rescheduling={false} rescheduled={null} onReschedule={vi.fn()} />
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
        scheduler: "fsrs",
        desiredRetention: 0.85,
        developerMode: true,
        invalidDataPolicy: "block-instance" as const,
      },
    });
    expect(screen.getByLabelText("New cards per day")).toHaveValue(10);
    expect(screen.getByLabelText("Max reviews per day")).toHaveValue(50);
    expect(screen.getByLabelText("Day starts at (hour)")).toHaveValue(2);
    expect(screen.getByLabelText("Developer mode")).toBeChecked();
    expect(screen.getByLabelText(/Again · Hard · Good · Easy/)).toBeChecked();
    expect(screen.getByLabelText(/^FSRS/)).toBeChecked();
    expect(screen.getByLabelText("Desired retention (0.70 to 0.97)")).toHaveValue(0.85);
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
      scheduler: "sm2",
      desiredRetention: 0.9,
      developerMode: false,
      invalidDataPolicy: "block-instance" as const,
    });
  });

  it("switches to FSRS with a desired retention, and saves both", () => {
    const { props, container } = renderScreen();
    expect(screen.getByLabelText(/^SM-2/)).toBeChecked();
    expect(screen.queryByLabelText("Desired retention (0.70 to 0.97)")).toBeNull();

    fireEvent.click(screen.getByLabelText(/^FSRS/));
    fireEvent.input(screen.getByLabelText("Desired retention (0.70 to 0.97)"), {
      target: { value: "0.85" },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onSave).toHaveBeenCalledWith({
      ...DEFAULT_PREFERENCES,
      scheduler: "fsrs",
      desiredRetention: 0.85,
    });
  });

  it("notes that FSRS counts grades 0 to 2 alike, on the 0 to 5 scale only", () => {
    renderScreen();
    const note = "With FSRS, grades 0, 1 and 2 all count as Again.";
    expect(screen.queryByText(note)).toBeNull();
    fireEvent.click(screen.getByLabelText(/^FSRS/));
    expect(screen.getByText(note)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Again · Hard · Good · Easy/));
    expect(screen.queryByText(note)).toBeNull();
  });

  it("offers to reschedule only once FSRS is saved, and only after confirming", () => {
    renderScreen();
    fireEvent.click(screen.getByLabelText(/^FSRS/));
    expect(screen.queryByRole("button", { name: "Reschedule due dates with FSRS" })).toBeNull();
  });

  it("reschedules with FSRS once confirmed, and says what moved", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props, rerender } = renderScreen({ preferences: { ...DEFAULT_PREFERENCES, scheduler: "fsrs" } });
    confirm.mockReturnValueOnce(false);
    fireEvent.click(screen.getByRole("button", { name: "Reschedule due dates with FSRS" }));
    expect(props.onReschedule).not.toHaveBeenCalled();
    confirm.mockReturnValueOnce(true);
    fireEvent.click(screen.getByRole("button", { name: "Reschedule due dates with FSRS" }));
    expect(props.onReschedule).toHaveBeenCalledOnce();
    expect(confirm).toHaveBeenLastCalledWith(
      "Reschedule every studied card in this instance with FSRS? Due days will move, some sooner and some later.",
    );
    vi.unstubAllGlobals();

    rerender(<PreferencesScreen {...props} rescheduling={true} />);
    expect(screen.getByRole("button", { name: "Rescheduling…" })).toBeDisabled();
    rerender(<PreferencesScreen {...props} rescheduled={{ sooner: 4, later: 1 }} />);
    expect(screen.getByRole("status")).toHaveTextContent("Rescheduled. Due sooner: 4. Due later: 1.");
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
        <PreferencesScreen preferences={{ ...DEFAULT_PREFERENCES, scheduler: "fsrs" }} busy={false} error={null} onSave={vi.fn()} rescheduling={false} rescheduled={{ sooner: 2, later: 3 }} onReschedule={vi.fn()} />
      </I18nProvider>,
    );
    expect(screen.getByRole("heading", { name: "Studieinställningar" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nya kort per dag")).toBeInTheDocument();
    expect(screen.getByLabelText(/Spärra instansen/)).toBeChecked();
    expect(screen.getByLabelText("Önskad minnesgrad (0,70 till 0,97)")).toHaveValue(0.9);
    expect(screen.getByRole("status")).toHaveTextContent("Omschemalagt. Förfaller tidigare: 2. Förfaller senare: 3.");
  });
});
