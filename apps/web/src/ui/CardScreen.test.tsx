import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { CardScreen } from "./CardScreen";
import type { Card } from "@solid-memo/domain/deck";
import { alertTexts, statusTexts } from "../test/liveRegions";
import { I18nProvider } from "./i18n";

const card: Card = {
  id: "card-1",
  url: "https://pod.example/solid-memo/a/decks/deck-1.ttl#card-1",
  front: { "": "水" },
  back: { "": "water" },
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
    expect(props.onSave).toHaveBeenCalledWith({ front: { "": "火" }, back: { "": "fire" } });
  });

  it("edits a side's English and keeps its other languages, and keeps untagged text untagged", () => {
    const { props } = renderScreen({
      card: { ...card, front: { "": "水" }, back: { en: "water", ja: "みず" } },
    });
    expect(screen.getByLabelText("Back")).toHaveValue("water");
    fireEvent.input(screen.getByLabelText("Front"), { target: { value: " 火 " } });
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: "fire" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith({ front: { "": "火" }, back: { en: "fire", ja: "みず" } });
  });

  it("marks each field with the language it edits, and says so where the reader sees another", () => {
    const both = { en: "Meaning", sv: "Betydelse" };
    const { container } = render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <CardScreen
          card={{ ...card, front: { en: "water", sv: "vatten" }, back: { en: "fire" }, frontNote: both, backLabel: both, backNote: both }}
          busy={false}
          saved={false}
          error={null}
          onSave={vi.fn()}
          onRemove={vi.fn()}
        />
      </I18nProvider>,
    );
    const front = container.querySelector("#card-front")!;
    expect(front).toHaveAttribute("lang", "en");
    expect(front).toHaveAccessibleDescription(
      "Varje sida behöver text, en bild eller båda. Du redigerar texten på engelska. Översättningarna ändras inte.",
    );
    // Notes and labels are the user's own, edited in the page's language.
    expect(container.querySelector("#card-front-note")).toHaveValue("Betydelse");
    expect(container.querySelector("#card-front-note")).toHaveAttribute("aria-describedby", "card-front-note-hint");
    expect(container.querySelector("#card-back-label")).not.toHaveAttribute("lang");
    expect(container.querySelector("#card-back-note")).not.toHaveAttribute("lang");
    // Only English: what is edited is what is seen, so nothing to say.
    const back = container.querySelector("#card-back")!;
    expect(back).toHaveAttribute("lang", "en");
    expect(back).toHaveAttribute("aria-describedby", "card-sides-hint");
    // The faces show Swedish where there is some, and mark the English.
    expect(container.querySelector(".card-front p:not(.card-note)")).not.toHaveAttribute("lang");
    expect(container.querySelector(".card-back p:not(.card-label):not(.card-note)")).toHaveAttribute("lang", "en");
  });

  it("writes a note typed on a Swedish page in Swedish, standing in for the English", () => {
    const onSave = vi.fn();
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <CardScreen card={card} busy={false} saved={false} error={null} onSave={onSave} onRemove={vi.fn()} />
      </I18nProvider>,
    );
    fireEvent.input(screen.getByLabelText("Anteckning på baksidan (valfritt)"), { target: { value: "Ett element." } });
    fireEvent.click(screen.getByRole("button", { name: "Spara" }));
    expect(onSave).toHaveBeenCalledWith({ front: { "": "水" }, back: { "": "water" }, backNote: { en: "Ett element.", sv: "Ett element." } });
  });

  it("edits a note's English and keeps its other languages; clearing the English clears the note", () => {
    const { props } = renderScreen({
      card: { ...card, backNote: { en: "An element.", sv: "Ett element." }, backLabel: { en: "Meaning", sv: "Betydelse" } },
    });
    expect(screen.getByLabelText("Back note (optional)")).toHaveValue("An element.");
    fireEvent.input(screen.getByLabelText("Back note (optional)"), { target: { value: "One of the five elements." } });
    fireEvent.input(screen.getByLabelText("Label (optional)"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith({
      front: { "": "水" },
      back: { "": "water" },
      backNote: { en: "One of the five elements.", sv: "Ett element." },
    });
  });

  it("shows each side's note and the back's label, prefills them and saves them", () => {
    const { props, container } = renderScreen({
      card: { ...card, frontNote: { en: "Kanji" }, backLabel: { en: "Meaning" }, backNote: { en: "An element." } },
    });
    expect(container.querySelector(".card-front .card-note")).toHaveTextContent("Kanji");
    expect(container.querySelector(".card-back .card-label")).toHaveTextContent("Meaning");
    expect(container.querySelector(".card-back .card-note")).toHaveTextContent("An element.");
    expect(screen.getByLabelText("Front note (optional)")).toHaveValue("Kanji");
    expect(screen.getByLabelText("Label (optional)")).toHaveValue("Meaning");
    expect(screen.getByLabelText("Back note (optional)")).toHaveValue("An element.");
    fireEvent.input(screen.getByLabelText("Front note (optional)"), { target: { value: " N5 " } });
    fireEvent.input(screen.getByLabelText("Back note (optional)"), { target: { value: " One of the five elements. " } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith({
      front: { "": "水" },
      frontNote: { en: "N5" },
      backLabel: { en: "Meaning" },
      back: { "": "water" },
      backNote: { en: "One of the five elements." },
    });
  });

  it("shows a picture card and prefills its picture fields", () => {
    const { container } = renderScreen({
      card: {
        ...card,
        front: {},
        frontImageUrl: FLAG,
        back: { "": "Afghanistan" },
        backImageUrl: MAP,
      },
    });
    const front = container.querySelector(".card-front img")!;
    expect(front).toHaveAttribute("src", FLAG);
    expect(front).toHaveAttribute("alt", "Picture on the front of the card");
    expect(container.querySelector(".card-back img")).toHaveAttribute(
      "alt",
      "Picture on the back of the card",
    );
    expect(container.querySelector(".card-back")).toHaveTextContent(
      "Afghanistan",
    );
    expect(screen.getByLabelText("Front")).toHaveValue("");
    expect(screen.getByLabelText("Front picture (URL, optional)")).toHaveValue(FLAG);
    expect(screen.getByLabelText("Back picture (URL, optional)")).toHaveValue(MAP);
  });

  it("describes each picture by the card's description, prefills it and saves it, keeping its other languages", () => {
    const { props, container } = renderScreen({
      card: {
        ...card,
        frontImageUrl: FLAG,
        frontImageDescription: { en: "A black, red and green flag", sv: "En svart, röd och grön flagga" },
        backImageUrl: MAP,
        backImageDescription: { sv: "En karta" },
      },
    });
    expect(container.querySelector(".card-front img")).toHaveAttribute("alt", "A black, red and green flag");
    expect(container.querySelector(".card-back img")).toHaveAttribute("alt", "En karta");
    const front = screen.getByLabelText("Front picture description (optional)");
    expect(front).toHaveValue("A black, red and green flag");
    expect(front).toHaveAccessibleDescription(
      "Read out in place of the picture to anyone who cannot see it. Describe what it shows without giving the answer away.",
    );
    const back = screen.getByLabelText("Back picture description (optional)");
    expect(back).toHaveValue("En karta");
    expect(back).toHaveAttribute("lang", "sv");
    fireEvent.input(front, { target: { value: " A flag with an emblem " } });
    fireEvent.input(back, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith({
      front: { "": "水" },
      back: { "": "water" },
      frontImageUrl: FLAG,
      frontImageDescription: { en: "A flag with an emblem", sv: "En svart, röd och grön flagga" },
      backImageUrl: MAP,
    });
  });

  it("saves a new picture's description in English, and none without a picture", () => {
    const { props } = renderScreen();
    fireEvent.input(screen.getByLabelText("Back picture (URL, optional)"), { target: { value: MAP } });
    fireEvent.input(screen.getByLabelText("Back picture description (optional)"), { target: { value: "A map" } });
    fireEvent.input(screen.getByLabelText("Front picture description (optional)"), { target: { value: "Nothing to describe" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith({
      front: { "": "水" },
      back: { "": "water" },
      backImageUrl: MAP,
      backImageDescription: { en: "A map" },
    });
  });

  it("saves a picture, dropping an emptied one", () => {
    const { props } = renderScreen({
      card: { ...card, backImageUrl: MAP },
    });
    fireEvent.input(screen.getByLabelText("Front picture (URL, optional)"), {
      target: { value: FLAG },
    });
    fireEvent.input(screen.getByLabelText("Back picture (URL, optional)"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).toHaveBeenCalledWith({
      front: { "": "水" },
      back: { "": "water" },
      frontImageUrl: FLAG,
    });
  });

  it("refuses to save an incomplete card and says why", () => {
    const { props } = renderScreen();
    fireEvent.input(screen.getByLabelText("Back"), { target: { value: " " } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(props.onSave).not.toHaveBeenCalled();
    expect(alertTexts()).toEqual(["The back needs text or an image."]);
  });

  it("names a picture-only card by its back in the removal prompt", () => {
    const confirm = vi.fn(() => false);
    vi.stubGlobal("confirm", confirm);
    renderScreen({
      card: { ...card, front: {}, frontImageUrl: FLAG, back: { "": "Afghanistan" } },
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

  it("says a retired card is no longer studied, and says nothing of it otherwise", () => {
    renderScreen();
    expect(screen.queryByRole("note")).toBeNull();
    renderScreen({ card: { ...card, retired: true } });
    expect(screen.getByRole("note")).toHaveTextContent("It is kept, with its review history, but no longer studied.");
  });

  it("confirms each save in a status line mounted throughout", () => {
    const { rerender, props } = renderScreen();
    const status = screen.getByRole("status");
    expect(status.textContent).toBe("");
    rerender(<CardScreen {...props} saved />);
    expect(screen.getByRole("status")).toBe(status);
    expect(status).toHaveTextContent("Saved.");
  });

  it("shows busy state and errors", () => {
    renderScreen({ busy: true, error: "write refused" });
    expect(screen.getByLabelText("Front")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Remove card" })).toHaveAttribute("aria-disabled", "true");
    expect(alertTexts()).toEqual(["write refused"]);
    expect(statusTexts()).toEqual([]);
  });

  it("keeps the pressed button focused while it saves, and ignores it meanwhile", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props, rerender } = renderScreen();
    const save = screen.getByRole("button", { name: "Save" });
    save.focus();
    fireEvent.click(save);
    rerender(<CardScreen {...props} busy />);
    expect(save).toHaveFocus();
    fireEvent.click(save);
    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));
    expect(props.onSave).toHaveBeenCalledOnce();
    expect(confirm).not.toHaveBeenCalled();
    expect(props.onRemove).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
