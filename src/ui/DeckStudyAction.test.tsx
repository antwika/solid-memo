import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { DeckStudyAction } from "./DeckStudyAction";
import type { Card } from "../domain/deck";
import type { StudyQueue } from "../domain/scheduling";

const card: Card = {
  id: "card-1",
  url: "https://pod.example/solid-memo/a/decks/deck-1.ttl#card-1",
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
};

function renderAction(queue: StudyQueue | undefined) {
  const onStudy = vi.fn();
  const onPractice = vi.fn();
  const view = render(
    <DeckStudyAction
      deckName="Kanji N5"
      queue={queue}
      onStudy={onStudy}
      onPractice={onPractice}
    />,
  );
  return { ...view, onStudy, onPractice };
}

describe("DeckStudyAction", () => {
  it("suggests Study when cards are due", () => {
    const { onStudy, onPractice } = renderAction({
      due: [card],
      newCards: [card],
      studiedToday: 0,
    });
    const study = screen.getByRole("button", { name: "Study Kanji N5" });
    expect(study).toHaveClass("primary");
    fireEvent.click(study);
    expect(onStudy).toHaveBeenCalledOnce();
    expect(onPractice).not.toHaveBeenCalled();
  });

  it("suggests Practice when nothing is due but new cards remain", () => {
    const { onStudy, onPractice } = renderAction({
      due: [],
      newCards: [card],
      studiedToday: 3,
    });
    expect(screen.queryByRole("button", { name: /^Study/ })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Practice Kanji N5" }));
    expect(onPractice).toHaveBeenCalledOnce();
    expect(onStudy).not.toHaveBeenCalled();
  });

  it("does not suggest studying when there is nothing to study", () => {
    renderAction({ due: [], newCards: [], studiedToday: 12 });
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("Nothing to study today")).toBeInTheDocument();
  });

  it("suggests nothing while the queue is unknown", () => {
    const { container } = renderAction(undefined);
    expect(container).toBeEmptyDOMElement();
  });
});
