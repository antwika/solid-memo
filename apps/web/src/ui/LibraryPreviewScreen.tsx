import { useState } from "preact/hooks";
import {
  promptSides,
  type CardContent,
  type StudyDirection,
} from "@solid-memo/domain/deck";
import { CardFace } from "./CardFace";
import { useI18n } from "./i18n";

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
  const { t, tx } = useI18n();
  return (
    <section>
      <header>
        <h2>
          {tx("libraryPreview.heading", { deck: <a href={deckHref}>{deckName}</a> })}
        </h2>
        <button onClick={onExit}>{t("libraryPreview.back")}</button>
      </header>
      {prompt === null ? (
        <p>{t("libraryPreview.empty")}</p>
      ) : (
        <>
          <p class="hint">{t("libraryPreview.hint")}</p>
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
  const { t } = useI18n();
  const [revealed, setRevealed] = useState(false);
  const { question, answer } = promptSides(prompt);

  return (
    <div class="practice-card">
      <CardFace {...question} note={revealed ? question.note : undefined} role="question" />
      {revealed ? (
        <>
          <CardFace {...answer} role="answer" />
          <button class="primary" onClick={onNext}>
            {t("libraryPreview.nextCard")}
          </button>
        </>
      ) : (
        <button onClick={() => setRevealed(true)}>{t("libraryPreview.reveal")}</button>
      )}
    </div>
  );
}
