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
const FLAG = "https://flagcdn.com/af.svg";
const MAP = "https://img.example/af-map.png";

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
    expect(props.onSave).toHaveBeenCalledWith({ front: "火", back: "fire" });
  });

  it("shows a picture card and prefills its picture fields", () => {
    const { container } = renderScreen({
      card: {
        ...card,
        front: "",
        frontImageUrl: FLAG,
        back: "Afghanistan",
        backImageUrl: MAP,
      },
    });
    const front = container.querySelector(".card-front img")!;
    expect(front).toHaveAttribute("src", FLAG);
    expect(front).toHaveAttribute("alt", "Picture on the front of the card");
    expect(container.querySelector(".card-back img")).toHaveAttribute("alt", "");
    expect(container.querySelector(".card-back")).toHaveTextContent(
      "Afghanistan",
    );
    expect(screen.getByLabelText("Front")).toHaveValue("");
    expect(screen.getByLabelText("Front picture (URL)")).toHaveValue(FLAG);
    expect(screen.getByLabelText("Back picture (URL)")).toHaveValue(MAP);
  });

  it("saves a picture, dropping an emptied one", () => {
    const { props } = renderScreen({
      card: { ...card, backImageUrl: MAP },
    });
    fireEvent.input(screen.getByLabelText("Front picture (URL)"), {
      target: { value: FLAG },
    });
    fireEvent.input(screen.getByLabelText("Back picture (URL)"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith({
      front: "水",
      back: "water",
      frontImageUrl: FLAG,
    });
  });

  it("refuses to save an incomplete card and says why", () => {
    const { props } = renderScreen();
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: " " } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The back needs text or an image.",
    );
  });

  it("names a picture-only card by its back in the removal prompt", () => {
    const confirm = vi.fn(() => false);
    vi.stubGlobal("confirm", confirm);
    renderScreen({
      card: { ...card, front: "", frontImageUrl: FLAG, back: "Afghanistan" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));
    expect(confirm).toHaveBeenCalledWith(
      'Remove the card "Afghanistan"? This cannot be undone.',
    );
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
