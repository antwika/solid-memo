import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { CardCreatorScreen } from "./CardCreatorScreen";
import type { Deck } from "../domain/deck";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  createdAt: "2026-09-21T10:00:00.000Z",
};

function renderScreen(
  overrides: Partial<Parameters<typeof CardCreatorScreen>[0]> = {},
) {
  const props = {
    deck,
    deckHref: "#/deck?deck=d",
    busy: false,
    error: null,
    onAdd: vi.fn(),
    onBack: vi.fn(),
    ...overrides,
  };
  const view = render(<CardCreatorScreen {...props} />);
  return { ...view, props };
}

describe("CardCreatorScreen", () => {
  it("links the deck's name to the deck's page", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Kanji N5" })).toHaveAttribute(
      "href",
      "#/deck?deck=d",
    );
  });

  it("names the deck it adds to", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "New card" }),
    ).toBeInTheDocument();
    // The deck's name is a link, so match the sentence across elements.
    expect(
      screen.getByText(
        (_text, element) =>
          element?.tagName === "P" &&
          element.textContent === 'Adding to "Kanji N5".',
      ),
    ).toBeInTheDocument();
  });

  it("adds a card with trimmed values and clears the form", () => {
    const { props, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("Front"), {
      target: { value: " 火 " },
    });
    fireEvent.input(screen.getByLabelText("Back"), {
      target: { value: " fire " },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenCalledWith("火", "fire");
    expect(screen.getByLabelText("Front")).toHaveValue("");
    expect(screen.getByLabelText("Back")).toHaveValue("");
  });

  it("navigates back", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(props.onBack).toHaveBeenCalledOnce();
  });

  it("disables the form while busy and shows errors", () => {
    renderScreen({ busy: true, error: "add failed" });
    expect(screen.getByLabelText("Front")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Add card" })).toBeDisabled();
    expect(screen.getByText("add failed")).toBeInTheDocument();
  });
});
