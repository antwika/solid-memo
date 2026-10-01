import type { ComponentChildren } from "preact";
import type { Deck } from "@solid-memo/domain/deck";
import { DeckProvenance } from "./DeckProvenance";
import { DeckIcon } from "./icons";
import { useI18n } from "./i18n";

export function DeckDetailScreen({
  deck,
  cardCount,
  dueCount,
  newCount,
  studiedToday,
  busy,
  error,
  deckHref,
  onStudy,
  onPreferences,
  onBrowse,
  onResetDay,
  notice,
}: {
  deck: Deck;
  cardCount: number;
  /** Prompts due today. */
  dueCount: number;
  /** New prompts still within today's budget. */
  newCount: number;
  /** Cards reviewed today; the reset option appears once there are any. */
  studiedToday: number;
  /** A reset is in progress. */
  busy: boolean;
  error: string | null;
  /** URL of this deck's page; its name links here wherever it is shown. */
  deckHref: string;
  /** Today's session: due prompts and new ones, interleaved. */
  onStudy: () => void;
  /** Open the deck's preferences: its own daily limits. */
  onPreferences: () => void;
  /** Open the Browser view, where the deck and its cards are edited. */
  onBrowse: () => void;
  /** Undo today's reviews of this deck. */
  onResetDay: () => void;
  /** Anything to say about the deck before its study state, e.g. an offer. */
  notice?: ComponentChildren;
}) {
  const { t, readerText } = useI18n();
  const canStudy = dueCount + newCount > 0;
  const studied = t("common.cardCount", { count: studiedToday });

  function handleResetDay() {
    if (
      window.confirm(
        t("deckDetail.resetConfirm", { title: readerText(deck.title), studied }),
      )
    ) {
      onResetDay();
    }
  }

  return (
    <section>
      <header>
        <h2>
          <a href={deckHref}>
            <DeckIcon />
            {readerText(deck.title)}
          </a>
        </h2>
        <div class="header-actions">
          <button onClick={onPreferences} aria-label={t("deckDetail.preferencesLabel")}>
            {t("deckDetail.preferencesButton")}
          </button>
          <button onClick={onBrowse}>{t("deckDetail.browseButton")}</button>
        </div>
      </header>
      <DeckProvenance
        authors={deck.authors}
        license={deck.license}
        modifiedAt={deck.modifiedAt}
        description={deck.description === undefined ? undefined : readerText(deck.description)}
      />
      {notice}
      {!canStudy && (
        <p>
          {cardCount === 0
            ? t("deckDetail.noCards")
            : t("deckDetail.allStudied")}
        </p>
      )}
      {canStudy && (
        <p class="hint">
          {dueCount === 0
            ? t("deckDetail.newOnly", { count: newCount })
            : newCount === 0
              ? t("deckDetail.dueOnly", { due: t("common.cardCount", { count: dueCount }) })
              : t("deckDetail.dueAndNew", {
                  due: t("common.cardCount", { count: dueCount }),
                  count: newCount,
                })}
        </p>
      )}
      <div class="session-actions">
        {canStudy && (
          <button class="primary" onClick={onStudy} disabled={busy}>
            {t("deckDetail.studyButton")}
          </button>
        )}
      </div>
      {studiedToday > 0 && (
        <div class="day-reset">
          <span class="hint">{t("deckDetail.studiedToday", { studied })}</span>
          <button onClick={handleResetDay} disabled={busy}>
            {busy ? t("deckDetail.resetting") : t("deckDetail.resetButton")}
          </button>
        </div>
      )}
      {error && <p class="error">{error}</p>}
      <p class="hint">
        {t("deckDetail.cardsInDeck", { cards: t("common.cardCount", { count: cardCount }) })}
      </p>
    </section>
  );
}
