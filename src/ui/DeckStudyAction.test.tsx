import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { DeckStudyAction } from "./DeckStudyAction";
import type { Card, Prompt } from "../domain/deck";
import type { StudyQueue } from "../domain/scheduling";

const card: Card = {
  id: "card-1",
  url: "https://pod.example/solid-memo/a/decks/deck-1.ttl#card-1",
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
};
const prompt: Prompt = { card, direction: "front-to-back" };

function renderAction(queue: StudyQueue | undefined, loading = false) {
  const onStudy = vi.fn();
  const view = render(
    <DeckStudyAction
      deckName="Kanji N5"
      queue={queue}
      loading={loading}
      onStudy={onStudy}
    />,
  );
  return { ...view, onStudy };
}

describe("DeckStudyAction", () => {
  it("offers Study with due and new counted together", () => {
    const { onStudy } = renderAction({
      due: [prompt],
      newPrompts: [prompt],
      studiedToday: 0,
    });
    const study = screen.getByRole("button", { name: "Study Kanji N5" });
    expect(study).toHaveClass("primary");
    expect(screen.getByText("2 to review")).toBeInTheDocument();
    fireEvent.click(study);
    expect(onStudy).toHaveBeenCalledOnce();
  });

  it("offers Study when nothing is due but new cards remain", () => {
    const { onStudy } = renderAction({
      due: [],
      newPrompts: [prompt],
      studiedToday: 3,
    });
    expect(screen.getByText("1 to review")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Study Kanji N5" }));
    expect(onStudy).toHaveBeenCalledOnce();
  });

  it("shows how many cards are due when none are new", () => {
    renderAction({ due: [prompt, prompt, prompt], newPrompts: [], studiedToday: 0 });
    expect(screen.getByText("3 to review")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Study Kanji N5" })).toBeInTheDocument();
  });

  it("shows a checkmark instead of an action when there is nothing to study", () => {
    const { container } = renderAction({ due: [], newPrompts: [], studiedToday: 12 });
    expect(screen.queryByRole("button")).toBeNull();
    const done = screen.getByRole("img", { name: "Nothing to study today" });
    expect(done).toHaveClass("study-done");
    expect(container.querySelector(".study-done svg.icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByText(/review|Nothing/)).toBeNull();
  });

  it("shows a loader in the slot while the queue is first fetched", () => {
    const { container } = renderAction(undefined, true);
    const status = screen.getByRole("status", { name: "Checking what is due" });
    expect(status).toHaveClass("study-loading");
    expect(container.querySelector(".loading-dots")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("offers nothing when the queue is unknown and not being fetched", () => {
    const { container } = renderAction(undefined);
    expect(container).toBeEmptyDOMElement();
  });
});
