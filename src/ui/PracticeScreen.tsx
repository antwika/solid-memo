import { useState } from "preact/hooks";
import {
  MINIMAL_ANSWER_QUALITY,
  MINIMAL_ANSWERS,
  SM2_QUALITIES,
  type AnswerScale,
  type MinimalAnswer,
} from "../domain/answerScale";
import type { Card } from "../domain/deck";
import type { ReviewQuality } from "../domain/review";

/** "practice" reviews due + new cards; "study" reviews due cards only. */
export type PracticeMode = "practice" | "study";

const QUALITY_LABELS: Record<ReviewQuality, string> = {
  0: "0 — Blackout",
  1: "1 — Wrong",
  2: "2 — Almost",
  3: "3 — Hard",
  4: "4 — Good",
  5: "5 — Easy",
};

const MINIMAL_LABELS: Record<MinimalAnswer, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

/** The grading buttons a scale shows, in display order. */
function answerButtons(
  scale: AnswerScale,
): { label: string; quality: ReviewQuality }[] {
  return scale === "minimal"
    ? MINIMAL_ANSWERS.map((answer) => ({
        label: MINIMAL_LABELS[answer],
        quality: MINIMAL_ANSWER_QUALITY[answer],
      }))
    : SM2_QUALITIES.map((quality) => ({
        label: QUALITY_LABELS[quality],
        quality,
      }));
}

export function PracticeScreen({
  mode,
  deckName,
  deckHref,
  card,
  position,
  total,
  answerScale,
  busy,
  error,
  onAnswer,
  onExit,
}: {
  mode: PracticeMode;
  deckName: string;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  /** null when the session is finished. */
  card: Card | null;
  /** 1-based position of the current card. */
  position: number;
  /** Cards in the session, including repeats of failed cards. */
  total: number;
  answerScale: AnswerScale;
  busy: boolean;
  error: string | null;
  onAnswer: (quality: ReviewQuality) => void;
  onExit: () => void;
}) {
  return (
    <section>
      <header>
        <h2>
          {mode === "study" ? "Study" : "Practice"}:{" "}
          <a href={deckHref}>{deckName}</a>
        </h2>
        <button onClick={onExit} disabled={busy}>
          End session
        </button>
      </header>
      {card === null ? (
        <p>
          {total === 0
            ? "Nothing to study today — come back tomorrow!"
            : "Session finished — all cards reviewed."}
        </p>
      ) : (
        <>
          <p class="hint">
            Card {position} of {total}
          </p>
          <CardFace
            // Keyed by position, not card id: a card repeated after a
            // lapse must start hidden again.
            key={position}
            card={card}
            answerScale={answerScale}
            busy={busy}
            onAnswer={onAnswer}
          />
        </>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}

/** Keyed by the caller so the reveal state resets on every new card. */
function CardFace({
  card,
  answerScale,
  busy,
  onAnswer,
}: {
  card: Card;
  answerScale: AnswerScale;
  busy: boolean;
  onAnswer: (quality: ReviewQuality) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div class="practice-card">
      <p class="card-front">{card.front}</p>
      {revealed ? (
        <>
          <p class="card-back">{card.back}</p>
          <div
            class={`quality-buttons${answerScale === "minimal" ? " minimal" : ""}`}
          >
            {answerButtons(answerScale).map(({ label, quality }) => (
              <button
                key={label}
                data-grade={quality}
                onClick={() => onAnswer(quality)}
                disabled={busy}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button onClick={() => setRevealed(true)} disabled={busy}>
          Reveal
        </button>
      )}
    </div>
  );
}
