import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { PracticeScreen } from "./PracticeScreen";
import type { Card } from "../domain/deck";

const card: Card = {
  id: "card-1",
  url: "https://pod.example/solid-memo/a/decks/deck-1.ttl#card-1",
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
};

function renderScreen(
  overrides: Partial<Parameters<typeof PracticeScreen>[0]> = {},
) {
  const props = {
    mode: "practice" as const,
    deckName: "Kanji N5",
    deckHref: "#/deck?deck=d",
    card: card as Card | null,
    position: 1,
    total: 3,
    busy: false,
    error: null,
    onAnswer: vi.fn(),
    onExit: vi.fn(),
    ...overrides,
  };
  const view = render(<PracticeScreen {...props} />);
  return { ...view, props };
}

describe("PracticeScreen", () => {
  it("links the deck's name to the deck's page", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Kanji N5" })).toHaveAttribute(
      "href",
      "#/deck?deck=d",
    );
  });

  it("shows the front and hides the back until revealed", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "Practice: Kanji N5" }),
    ).toBeInTheDocument();
    expect(screen.getByText("水")).toBeInTheDocument();
    expect(screen.queryByText("water")).toBeNull();
    expect(screen.getByText("Card 1 of 3")).toBeInTheDocument();
  });

  it("titles a due-only session as Study", () => {
    renderScreen({ mode: "study" });
    expect(
      screen.getByRole("heading", { name: "Study: Kanji N5" }),
    ).toBeInTheDocument();
  });

  it("reveals the back and offers quality grades", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByText("water")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "4 — Good" }));
    expect(props.onAnswer).toHaveBeenCalledWith(4);
  });

  it("shows the finished state after the last card", () => {
    renderScreen({ card: null, position: 4, total: 3 });
    expect(
      screen.getByText("Session finished — all cards reviewed."),
    ).toBeInTheDocument();
  });

  it("shows the empty state when nothing is due", () => {
    renderScreen({ card: null, position: 1, total: 0 });
    expect(
      screen.getByText("Nothing to study today — come back tomorrow!"),
    ).toBeInTheDocument();
  });

  it("ends the session", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "End session" }));
    expect(props.onExit).toHaveBeenCalledOnce();
  });

  it("disables grading while busy and shows errors", () => {
    renderScreen({ busy: true, error: "review failed" });
    expect(screen.getByRole("button", { name: "Reveal" })).toBeDisabled();
    expect(screen.getByText("review failed")).toBeInTheDocument();
  });
});
