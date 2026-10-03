import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/preact";
import { CardCreatorScreen } from "./CardCreatorScreen";
import { I18nProvider } from "./i18n";
import type { Deck } from "@solid-memo/domain/deck";
import { alertTexts, statusTexts } from "../test/liveRegions";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  title: { en: "Kanji N5" },
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
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
    backHref: "#/browser?deck=d",
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
    expect(
      screen.getByText(
        (_text, element) =>
          element?.tagName === "P" &&
          element.textContent === 'Adding to "Kanji N5".',
      ),
    ).toBeInTheDocument();
  });

  it("explains the optional fields in visible hints tied to them, not in placeholders", () => {
    renderScreen();
    for (const [label, hint] of [
      ["Front note (optional)", "Shown under the front once the answer is revealed."],
      ["Label (optional)", "Shown above the back, e.g. what kind of answer it is."],
      ["Back note (optional)", "Shown under the back once the answer is revealed."],
    ]) {
      const field = screen.getByLabelText(label);
      expect(field).toHaveAccessibleDescription(hint);
      expect(field).not.toHaveAttribute("placeholder");
      expect(screen.getByText(hint)).toBeVisible();
    }
  });

  it("says ahead of the fields what each side needs, and marks the field an error is about", () => {
    const { props } = renderScreen();
    const sides = "Each side needs text, a picture, or both.";
    expect(screen.getByText(sides)).toBeVisible();
    expect(screen.getByLabelText("Front")).toHaveAccessibleDescription(sides);
    expect(screen.getByLabelText("Back")).toHaveAccessibleDescription(sides);
    expect(screen.getByLabelText("Front picture (URL, optional)")).not.toHaveAttribute("placeholder", expect.stringContaining("optional"));

    fireEvent.click(screen.getByRole("button", { name: "Add card" }));
    expect(props.onAdd).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Front")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Front")).toHaveAccessibleDescription(`The front needs text or an image. ${sides}`);
    expect(screen.getByLabelText("Back")).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByLabelText("Back")).toHaveAccessibleDescription(sides);

    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "火" } });
    fireEvent.input(screen.getByLabelText("Back picture (URL, optional)"), { target: { value: "ftp://x" } });
    fireEvent.click(screen.getByRole("button", { name: "Add card" }));
    expect(screen.getByLabelText("Front")).toHaveAttribute("aria-invalid", "false");
    const backImage = screen.getByLabelText("Back picture (URL, optional)");
    expect(backImage).toHaveAttribute("aria-invalid", "true");
    expect(backImage).toHaveAccessibleDescription("The back image must be an http(s) URL.");
    expect(screen.getByLabelText("Front picture (URL, optional)")).not.toHaveAccessibleDescription();
  });

  it("adds a card with trimmed values, and once added clears the form, says so and focuses the front", () => {
    const { props, container, rerender } = renderScreen();
    fireEvent.input(screen.getByLabelText("Front"), {
      target: { value: " 火 " },
    });
    fireEvent.input(screen.getByLabelText("Back"), {
      target: { value: " fire " },
    });
    const add = screen.getByRole("button", { name: "Add card" });
    add.focus();
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenCalledWith({ front: { "": "火" }, back: { "": "fire" } }, expect.any(Function));
    // Kept until it is added: a failed add loses nothing.
    expect(screen.getByLabelText("Front")).toHaveValue(" 火 ");
    rerender(<CardCreatorScreen {...props} busy />);
    expect(add).toHaveAttribute("aria-disabled", "true");
    expect(add).toHaveFocus();

    // Told while still busy: the field takes the focus once it is enabled again.
    const onAdded = vi.mocked(props.onAdd).mock.calls[0][1];
    act(() => onAdded());
    expect(screen.getByLabelText("Front")).toHaveValue("");
    expect(screen.getByLabelText("Back")).toHaveValue("");
    expect(statusTexts()).toEqual(["Card added."]);
    expect(add).toHaveFocus();
    rerender(<CardCreatorScreen {...props} busy={false} />);
    expect(screen.getByLabelText("Front")).toHaveFocus();

    // The next add clears what was said.
    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "水" } });
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: "water" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(statusTexts()).toEqual([]);
  });

  it("ignores a submit while the last card is still being added", () => {
    const { props, container } = renderScreen({ busy: true });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).not.toHaveBeenCalled();
  });

  it("adds a picture-only front, and once added clears the picture fields too", () => {
    const { props, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("Front picture (URL, optional)"), {
      target: { value: " https://flagcdn.com/af.svg " },
    });
    fireEvent.input(screen.getByLabelText("Back"), {
      target: { value: "Afghanistan" },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenCalledWith({
      front: {},
      back: { "": "Afghanistan" },
      frontImageUrl: "https://flagcdn.com/af.svg",
    }, expect.any(Function));
    act(() => vi.mocked(props.onAdd).mock.calls[0][1]());
    expect(screen.getByLabelText("Front picture (URL, optional)")).toHaveValue("");
    expect(screen.getByLabelText("Back picture (URL, optional)")).toHaveValue("");
  });

  it("refuses an incomplete card, explains, and keeps what was typed", () => {
    const { props, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("Back"), {
      target: { value: "fire" },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).not.toHaveBeenCalled();
    expect(alertTexts()).toEqual(["The front needs text or an image."]);
    expect(screen.getByLabelText("Back")).toHaveValue("fire");

    fireEvent.input(screen.getByLabelText("Front"), {
      target: { value: "火" },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenCalledOnce();
    expect(alertTexts()).toEqual([]);
  });

  it("explains an incomplete card in the language the user reads", () => {
    const { container } = render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <CardCreatorScreen deck={deck} deckHref="#/deck?deck=d" busy={false} error={null} onAdd={vi.fn()} backHref="#/browser?deck=d" />
      </I18nProvider>,
    );
    fireEvent.submit(container.querySelector("form")!);
    expect(alertTexts()).toEqual(["Framsidan behöver text eller en bild."]);
  });

  it("links back to the Browser", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute("href", "#/browser?deck=d");
  });

  it("disables the form while busy and shows errors", () => {
    renderScreen({ busy: true, error: "add failed" });
    expect(screen.getByLabelText("Front")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Add card" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("add failed")).toBeInTheDocument();
  });
});
