import { useState } from "preact/hooks";
import {
  promptSides,
  type CardContent,
  type StudyDirection,
} from "@solid-memo/domain/deck";
import { CardFace } from "./CardFace";

/** A library card, seen from one side. */
export interface PreviewPrompt {
  card: CardContent;
  direction: StudyDirection;
}

/**
 * A try of a library deck before importing it: its cards one at a time,
 * as study shows them, but with nothing graded or recorded — after the
 * answer comes the next card, for as long as the user likes.
 */
export function LibraryPreviewScreen({
  deckName,
  deckHref,
  prompt,
  turn,
  onNext,
  onExit,
}: {
  deckName: string;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  /** null when the deck has no cards. */
  prompt: PreviewPrompt | null;
  /** Counts the cards shown, so each one starts unrevealed, even a repeat. */
  turn: number;
  onNext: () => void;
  onExit: () => void;
}) {
  return (
    <section>
      <header>
        <h2>
          Preview: <a href={deckHref}>{deckName}</a>
        </h2>
        <button onClick={onExit}>Back to library</button>
      </header>
      {prompt === null ? (
        <p>This deck has no cards.</p>
      ) : (
        <>
          <p class="hint">
            Random cards from the deck. Nothing is recorded: import the deck
            to study it.
          </p>
          <PreviewCard key={turn} prompt={prompt} onNext={onNext} />
        </>
      )}
    </section>
  );
}

/** The card shown: the side asked up, the other under a Reveal button. */
function PreviewCard({
  prompt,
  onNext,
}: {
  prompt: PreviewPrompt;
  onNext: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const { question, answer } = promptSides(prompt);

  return (
    <div class="practice-card">
      <CardFace {...question} note={revealed ? question.note : undefined} role="question" />
      {revealed ? (
        <>
          <CardFace {...answer} role="answer" />
          <button class="primary" onClick={onNext}>
            Next card
          </button>
        </>
      ) : (
        <button onClick={() => setRevealed(true)}>Reveal</button>
      )}
    </div>
  );
}
