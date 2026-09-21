import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { DeckCreatorScreen } from "./DeckCreatorScreen";

function renderScreen(
  overrides: Partial<Parameters<typeof DeckCreatorScreen>[0]> = {},
) {
  const props = {
    busy: false,
    error: null,
    onCreate: vi.fn(),
    decksHref: "#/decks?instance=a",
    ...overrides,
  };
  const view = render(<DeckCreatorScreen {...props} />);
  return { ...view, props };
}

describe("DeckCreatorScreen", () => {
  it("creates a deck with a trimmed name", () => {
    const { props, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("Name"), {
      target: { value: " Kana " },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onCreate).toHaveBeenCalledWith("Kana");
  });

  it("links back to the deck list", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Back to decks" })).toHaveAttribute(
      "href",
      "#/decks?instance=a",
    );
  });

  it("disables the form while busy and shows errors", () => {
    renderScreen({ busy: true, error: "create failed" });
    expect(screen.getByLabelText("Name")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Create deck" })).toBeDisabled();
    expect(screen.getByText("create failed")).toBeInTheDocument();
  });
});
