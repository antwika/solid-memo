import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { CardScreen } from "./CardScreen";
import type { Card } from "../domain/deck";

const card: Card = {
  id: "card-1",
  url: "https://pod.example/solid-memo/a/decks/deck-1.ttl#card-1",
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
};

function renderScreen(
  overrides: Partial<Parameters<typeof CardScreen>[0]> = {},
) {
  const props = {
    card,
    busy: false,
    saved: false,
    error: null,
    onSave: vi.fn(),
    onRemove: vi.fn(),
    ...overrides,
  };
  const view = render(<CardScreen {...props} />);
  return { ...view, props };
}

describe("CardScreen", () => {
  it("marks the title with a decorative icon", () => {
    const { container } = renderScreen();
    expect(container.querySelector("h2 svg.icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("shows the card and an editor prefilled with it", () => {
    const { container } = renderScreen();
    expect(screen.getByRole("heading", { name: "Card" })).toBeInTheDocument();
    expect(container.querySelector(".card-front")).toHaveTextContent("水");
    expect(container.querySelector(".card-back")).toHaveTextContent("water");
    expect(screen.getByLabelText("Front")).toHaveValue("水");
    expect(screen.getByLabelText("Back")).toHaveValue("water");
  });

  it("saves the edited card with trimmed values", () => {
    const { props } = renderScreen();
    fireEvent.input(screen.getByLabelText("Front"), {
      target: { value: "  火 " },
    });
    fireEvent.input(screen.getByLabelText("Back"), {
      target: { value: " fire  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith("火", "fire");
  });

  it("removes the card after confirmation", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));
    expect(confirm).toHaveBeenCalledWith(
      'Remove the card "水"? This cannot be undone.',
    );
    expect(props.onRemove).toHaveBeenCalledOnce();
  });

  it("keeps the card when the confirmation is declined", () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));
    expect(props.onRemove).not.toHaveBeenCalled();
  });

  it("confirms a save", () => {
    renderScreen({ saved: true });
    expect(screen.getByRole("status")).toHaveTextContent("Saved.");
  });

  it("shows busy state and errors", () => {
    renderScreen({ busy: true, error: "write refused" });
    expect(screen.getByLabelText("Front")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Remove card" })).toBeDisabled();
    expect(screen.getByText("write refused")).toBeInTheDocument();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
