import { useState } from "preact/hooks";
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

export function PracticeScreen({
  mode,
  deckName,
  deckHref,
  card,
  position,
  total,
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
  total: number;
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
          <CardFace key={card.id} card={card} busy={busy} onAnswer={onAnswer} />
        </>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}

/** Keyed by card id so the reveal state resets on every new card. */
function CardFace({
  card,
  busy,
  onAnswer,
}: {
  card: Card;
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
          <div class="quality-buttons">
            {([0, 1, 2, 3, 4, 5] as ReviewQuality[]).map((quality) => (
              <button
                key={quality}
                onClick={() => onAnswer(quality)}
                disabled={busy}
              >
                {QUALITY_LABELS[quality]}
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
