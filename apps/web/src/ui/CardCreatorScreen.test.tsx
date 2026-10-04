import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/preact";
import { CardCreatorScreen } from "./CardCreatorScreen";
import { I18nProvider } from "./i18n";
import type { Deck } from "@solid-memo/domain/deck";
import { alertTexts, statusTexts } from "../test/liveRegions";
import { recentLanguages, rememberLanguage } from "./remembered";

beforeEach(() => localStorage.clear());

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

/** The picker of a field's main text. */
const picker = (fieldId: string) => document.getElementById(`${fieldId}-language-0`)!;

/** Chooses the language of a field's main text by its code — a radio's, else typed as another — and closes its picker. */
function chooseLanguage(fieldId: string, tag: string) {
  fireEvent.click(picker(fieldId));
  const panel = document.getElementById(`${fieldId}-language-0-panel`)!;
  const radio = panel.querySelector<HTMLInputElement>(`input[type=radio][value="${tag}"]`);
  if (radio === null) {
    fireEvent.click(screen.getByRole("radio", { name: "Other language…" }));
    fireEvent.input(screen.getByLabelText("Language code, e.g. fi, pt-BR"), { target: { value: tag } });
  } else {
    fireEvent.click(radio);
  }
  fireEvent.click(screen.getByRole("button", { name: "Done" }));
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
      expect(field).toHaveAccessibleDescription(`Language: not stated ${hint}`);
      expect(field).not.toHaveAttribute("placeholder");
      expect(screen.getByText(hint)).toBeVisible();
    }
  });

  it("says ahead of the fields what each side needs, and marks the field an error is about", () => {
    const { props } = renderScreen();
    const sides = "Each side needs text, a picture, or both.";
    expect(screen.getByText(sides)).toBeVisible();
    expect(screen.getByLabelText("Front")).toHaveAccessibleDescription(`Language: not stated ${sides}`);
    expect(screen.getByLabelText("Back")).toHaveAccessibleDescription(`Language: not stated ${sides}`);
    expect(screen.getByLabelText("Front picture (URL, optional)")).not.toHaveAttribute("placeholder", expect.stringContaining("optional"));

    fireEvent.click(screen.getByRole("button", { name: "Add card" }));
    expect(props.onAdd).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Front")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Front")).toHaveAccessibleDescription(
      `Language: not stated The front needs text or an image. ${sides}`,
    );
    expect(screen.getByLabelText("Back")).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByLabelText("Back")).toHaveAccessibleDescription(`Language: not stated ${sides}`);

    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "火" } });
    chooseLanguage("card-front", "ja");
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
    chooseLanguage("card-front", "ja");
    fireEvent.input(screen.getByLabelText("Back"), {
      target: { value: " fire " },
    });
    chooseLanguage("card-back", "en");
    const add = screen.getByRole("button", { name: "Add card" });
    add.focus();
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenCalledWith({ front: { ja: "火" }, back: { en: "fire" } }, expect.any(Function));
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

    // The next add clears what was said; its texts are in the languages the last card's were.
    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "水" } });
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: "water" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(statusTexts()).toEqual([]);
    expect(props.onAdd).toHaveBeenLastCalledWith({ front: { ja: "水" }, back: { en: "water" } }, expect.any(Function));
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
    chooseLanguage("card-back", "en");
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenCalledWith({
      front: {},
      back: { en: "Afghanistan" },
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
    chooseLanguage("card-back", "en");
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).not.toHaveBeenCalled();
    expect(alertTexts()).toEqual(["The front needs text or an image."]);
    expect(screen.getByLabelText("Back")).toHaveValue("fire");

    fireEvent.input(screen.getByLabelText("Front"), {
      target: { value: "火" },
    });
    chooseLanguage("card-front", "ja");
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

  it("asks the language of each text written, at its picker, never guessing it from the page", () => {
    const { props, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "火" } });
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: "fire" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).not.toHaveBeenCalled();
    expect(alertTexts()).toEqual(["Choose the language of the front."]);
    expect(picker("card-front")).toHaveFocus();
    expect(picker("card-front")).toHaveAttribute("aria-invalid", "true");
    expect(picker("card-front")).toHaveAccessibleDescription("Choose the language of the front.");
    // Answered as the user changes the card.
    chooseLanguage("card-front", "ja");
    expect(alertTexts()).toEqual([]);
    expect(picker("card-front")).not.toHaveAttribute("aria-invalid");

    fireEvent.submit(container.querySelector("form")!);
    expect(alertTexts()).toEqual(["Choose the language of the back."]);
    expect(picker("card-back")).toHaveFocus();
    chooseLanguage("card-back", "en");
    fireEvent.input(screen.getByLabelText("Label (optional)"), { target: { value: "Element" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(alertTexts()).toEqual(["Choose the language of the label."]);
    expect(picker("card-back-label")).toHaveFocus();
  });

  it("names the text whose language it asks in the language the user reads", () => {
    const { container } = render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <CardCreatorScreen deck={deck} deckHref="#/deck?deck=d" busy={false} error={null} onAdd={vi.fn()} backHref="#/browser?deck=d" />
      </I18nProvider>,
    );
    fireEvent.input(screen.getByLabelText("Anteckning på baksidan (valfritt)"), { target: { value: "Ett element" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(alertTexts()).toEqual(["Välj språket för anteckningen under baksidan."]);
  });

  it("takes three choices for a deck's first card, and none for the next", () => {
    const { props, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "火" } });
    chooseLanguage("card-front", "ja");
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: "fire" } });
    chooseLanguage("card-back", "en");
    // The user's own text is in one language: choosing it for one empty field chooses it for the others.
    chooseLanguage("card-back-note", "sv");
    for (const id of ["card-front-note", "card-back-label", "card-front-image-description", "card-back-image-description"]) {
      expect(picker(id)).toHaveTextContent("Language: Swedish");
    }
    // The front and back are each their own.
    expect(picker("card-front")).toHaveTextContent("Language: Japanese");
    fireEvent.input(screen.getByLabelText("Back note (optional)"), { target: { value: "Ett av fem element." } });
    fireEvent.input(screen.getByLabelText("Label (optional)"), { target: { value: "Betydelse" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenLastCalledWith(
      { front: { ja: "火" }, back: { en: "fire" }, backLabel: { sv: "Betydelse" }, backNote: { sv: "Ett av fem element." } },
      expect.any(Function),
    );
    act(() => vi.mocked(props.onAdd).mock.lastCall![1]());
    expect(recentLanguages("own")).toEqual(["sv"]);

    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "水" } });
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: "water" } });
    fireEvent.input(screen.getByLabelText("Front note (optional)"), { target: { value: "Vanlig" } });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAdd).toHaveBeenLastCalledWith(
      { front: { ja: "水" }, back: { en: "water" }, frontNote: { sv: "Vanlig" } },
      expect.any(Function),
    );
  });

  it("does not fill a field the user chose a language for, choosing another's", () => {
    renderScreen();
    chooseLanguage("card-front-note", "fi");
    chooseLanguage("card-back-note", "sv");
    expect(picker("card-front-note")).toHaveTextContent("Language: Finnish");
    expect(picker("card-back-label")).toHaveTextContent("Language: Swedish");
    // Text already written is not retagged by another field's choice either.
    fireEvent.input(screen.getByLabelText("Label (optional)"), { target: { value: "Capital" } });
    chooseLanguage("card-back-image-description", "en");
    expect(picker("card-back-label")).toHaveTextContent("Language: Swedish");
  });

  it("starts new text in the languages the deck's cards have, once they are read, in place of the device's last for the user's own", () => {
    rememberLanguage("own", "fi");
    const { props, rerender } = renderScreen();
    expect(picker("card-front")).toHaveTextContent("Language: not stated");
    expect(picker("card-front-note")).toHaveTextContent("Language: Finnish");
    // Touched: kept as the user left it.
    chooseLanguage("card-back", "sv");
    rerender(
      <CardCreatorScreen
        {...props}
        languages={{ front: "ja", back: "en", own: "en", unstatedCounts: { front: 0, back: 0 } }}
      />,
    );
    expect(picker("card-front")).toHaveTextContent("Language: Japanese");
    expect(picker("card-back")).toHaveTextContent("Language: Swedish");
    // The deck's evidence outranks the device's recent choice.
    expect(picker("card-back-note")).toHaveTextContent("Language: English");
    // What the deck uses is offered first, then its name's languages.
    fireEvent.click(picker("card-back"));
    expect(screen.getAllByRole("radio").slice(0, 2).map((radio) => radio.getAttribute("value"))).toEqual(["sv", "en"]);
  });

  it("keeps the languages a card added kept when the deck's cards are read after it", () => {
    rememberLanguage("own", "fi");
    const { props, rerender, container } = renderScreen();
    fireEvent.input(screen.getByLabelText("Front"), { target: { value: "火" } });
    chooseLanguage("card-front", "ja");
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: "fire" } });
    chooseLanguage("card-back", "en");
    fireEvent.submit(container.querySelector("form")!);
    act(() => vi.mocked(props.onAdd).mock.lastCall![1]());
    rerender(
      <CardCreatorScreen
        {...props}
        languages={{ front: "ja", back: "en", own: "sv", unstatedCounts: { front: 0, back: 0 } }}
      />,
    );
    expect(picker("card-back-note")).toHaveTextContent("Language: Finnish");
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
