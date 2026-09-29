import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import type { Deck } from "@solid-memo/domain/deck";
import { DeckPreferencesScreen } from "./DeckPreferencesScreen";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/c.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/d.ttl",
  reviewsDocumentUrl: "https://pod.example/r.ttl",
  createdAt: "",
  formatVersion: 3,
  direction: "front-to-back",
  authors: [],
};

function renderScreen(overrides: Partial<Parameters<typeof DeckPreferencesScreen>[0]> = {}) {
  const props = {
    deck,
    deckHref: "#/deck?deck=d",
    preferences: { newCardsPerDay: 20, maxReviewsPerDay: 200 },
    preferencesHref: "#/preferences?instance=a",
    busy: false,
    error: null,
    onSave: vi.fn(),
    onRename: vi.fn(),
    onRemove: vi.fn(),
    ...overrides,
  };
  render(<DeckPreferencesScreen {...props} />);
  return props;
}

describe("DeckPreferencesScreen", () => {
  it("links the deck in its heading", () => {
    renderScreen();
    expect(screen.getByRole("heading", { name: "Preferences: Kanji N5" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Kanji N5" })).toHaveAttribute("href", "#/deck?deck=d");
  });

  it("says an empty field uses the default, and links to where it is set", () => {
    renderScreen();
    expect(screen.getByText(/An empty field defaults to your/)).toHaveTextContent(
      "An empty field defaults to your study preferences.",
    );
    expect(screen.getByRole("link", { name: "study preferences" })).toHaveAttribute(
      "href",
      "#/preferences?instance=a",
    );
  });

  it("shows the deck's own limits, and the preferences' where it sets none", () => {
    renderScreen({ deck: { ...deck, newCardsPerDay: 5 } });
    expect(screen.getByLabelText("New cards per day")).toHaveValue(5);
    const maxReviews = screen.getByLabelText("Max reviews per day");
    expect(maxReviews).toHaveValue(null);
    expect(maxReviews).toHaveAttribute("placeholder", "200");
    expect(maxReviews.nextElementSibling).toHaveTextContent("max reviews per day");
    expect(screen.getByLabelText("New cards per day").nextElementSibling).toHaveTextContent(
      "new cards per day",
    );
  });

  it("says what each number counts, in the singular for one", () => {
    renderScreen({ preferences: { newCardsPerDay: 1, maxReviewsPerDay: 20 } });
    const newCards = screen.getByLabelText("New cards per day");
    const maxReviews = screen.getByLabelText("Max reviews per day");
    expect(newCards.nextElementSibling).toHaveTextContent("new card per day");
    fireEvent.input(newCards, { target: { value: "3" } });
    expect(newCards.nextElementSibling).toHaveTextContent("new cards per day");
    fireEvent.input(maxReviews, { target: { value: "1" } });
    expect(maxReviews.nextElementSibling).toHaveTextContent("max review per day");
  });

  it("saves the limits, an empty field following the preferences", () => {
    const { onSave } = renderScreen({ deck: { ...deck, newCardsPerDay: 5 } });
    fireEvent.input(screen.getByLabelText("New cards per day"), { target: { value: "" } });
    fireEvent.input(screen.getByLabelText("Max reviews per day"), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
    expect(onSave).toHaveBeenCalledWith({ maxReviewsPerDay: 0 });
  });

  it("is disabled while busy and shows an error", () => {
    renderScreen({ busy: true, error: "pod unreachable" });
    expect(screen.getByRole("button", { name: "Save preferences" })).toBeDisabled();
    expect(screen.getByLabelText("New cards per day")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Rename deck" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Remove deck" })).toBeDisabled();
    expect(screen.getByText("pod unreachable")).toHaveClass("error");
  });

  it("renames the deck, trimmed, and closes the form", () => {
    const props = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Rename deck" }));
    const field = screen.getByLabelText("Deck name");
    expect(field).toHaveValue("Kanji N5");
    fireEvent.input(field, { target: { value: "  Kanji N4 " } });
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));
    expect(props.onRename).toHaveBeenCalledWith("Kanji N4");
    expect(screen.queryByLabelText("Deck name")).toBeNull();
  });

  it("cancels renaming without saving", () => {
    const props = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Rename deck" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel renaming" }));
    expect(props.onRename).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Rename deck" })).toBeInTheDocument();
  });

  it("removes the deck after confirmation, and keeps it when declined", () => {
    const confirm = vi.fn(() => false);
    vi.stubGlobal("confirm", confirm);
    const props = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove deck" }));
    expect(confirm).toHaveBeenCalledWith(
      'Remove the deck "Kanji N5" and all its cards? This cannot be undone.',
    );
    expect(props.onRemove).not.toHaveBeenCalled();
    confirm.mockReturnValue(true);
    fireEvent.click(screen.getByRole("button", { name: "Remove deck" }));
    expect(props.onRemove).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
