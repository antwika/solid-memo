import { CARD_FORMAT_VERSION, DECK_FORMAT_VERSION } from "@solid-memo/domain/deck";
import { INSTANCE_FORMAT_VERSION } from "@solid-memo/domain/instance";
import type { MigrationPlan } from "@solid-memo/domain/migration";
import { PREFERENCES_FORMAT_VERSION } from "@solid-memo/domain/preferences";
import { REVIEW_STATE_FORMAT_VERSION } from "@solid-memo/domain/review";
import { cardCount as formatCardCount } from "./studyCounts";
import { readerText } from "./readerText";

/** "1 deck entry" / "n deck entries". */
function deckEntries(count: number): string {
  return count === 1 ? "1 deck entry" : `${count} deck entries`;
}

/** "1 review state" / "n review states". */
function reviewStates(count: number): string {
  return count === 1 ? "1 review state" : `${count} review states`;
}

function inDecks(count: number): string {
  return count === 1 ? "one deck" : `${count} decks`;
}

/** "a, b and c". */
function list(parts: string[]): string {
  return parts.length <= 1
    ? parts.join("")
    : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/**
 * What is outdated, as a subject: "2 deck entries, 255 cards in 3 decks
 * and your preferences". Never empty for a plan the notice shows.
 */
export function describeOutdated(plan: MigrationPlan): string {
  const parts: string[] = [];
  if (plan.instanceOutdated) parts.push("the instance record");
  if (plan.catalogMissing) parts.push("the instance's catalogue");
  if (plan.preferencesOutdated) parts.push("your preferences");
  if (plan.deckCount > 0) parts.push(deckEntries(plan.deckCount));
  if (plan.cardCount > 0) {
    const decks = plan.decks.filter(({ cardCount }) => cardCount > 0).length;
    parts.push(`${formatCardCount(plan.cardCount)} in ${inDecks(decks)}`);
  }
  if (plan.reviewCount > 0) {
    const decks = plan.decks.filter(({ reviewCount }) => reviewCount > 0).length;
    parts.push(`${reviewStates(plan.reviewCount)} in ${inDecks(decks)}`);
  }
  return list(parts);
}

/** What each format this app writes added, for the formats the plan touches. */
export function describeFormats(plan: MigrationPlan): string {
  const parts: string[] = [];
  if (plan.instanceOutdated) parts.push(`instance format ${INSTANCE_FORMAT_VERSION}`);
  if (plan.catalogMissing) {
    parts.push("a catalogue of each instance's decks, which other apps read as a DCAT catalogue");
  }
  if (plan.preferencesOutdated) {
    parts.push(
      `preferences format ${PREFERENCES_FORMAT_VERSION}, which records the answer scale, developer mode and what to do with invalid data`,
    );
  }
  if (plan.deckCount > 0) {
    parts.push(
      `deck format ${DECK_FORMAT_VERSION}, which describes decks with the DCAT and SKOS standards, gives every deck a description and lets a deck's title and description come in several languages`,
    );
  }
  if (plan.cardCount > 0) {
    parts.push(`card format ${CARD_FORMAT_VERSION}, which adds pictures on cards`);
  }
  if (plan.reviewCount > 0) {
    parts.push(
      `review-state format ${REVIEW_STATE_FORMAT_VERSION}, which keeps each study direction's state and the day's undo snapshot`,
    );
  }
  return list(parts);
}

/** The button label: "Update 3 decks and preferences". */
function updateLabel(plan: MigrationPlan): string {
  const parts: string[] = [];
  if (plan.decks.length > 0) parts.push(inDecks(plan.decks.length).replace(/^one /, "1 "));
  if (plan.preferencesOutdated) parts.push("preferences");
  if (plan.instanceOutdated) parts.push("the instance record");
  if (plan.catalogMissing) parts.push("the catalogue");
  return `Update ${list(parts)}`;
}

/**
 * Tells the user their data is stored in an older format, what an update
 * would touch, and lets them start it. Nothing happens until they do:
 * the app works on the old format meanwhile.
 */
export function MigrationNotice({
  plan,
  busy,
  error,
  onMigrate,
}: {
  plan: MigrationPlan;
  busy: boolean;
  error: string | null;
  onMigrate: () => void;
}) {
  const singular =
    plan.deckCount +
      plan.cardCount +
      plan.reviewCount +
      Number(plan.preferencesOutdated) +
      Number(plan.instanceOutdated) +
      Number(plan.catalogMissing) ===
    1;
  return (
    <div class="warning migration" role="region" aria-label="Format update">
      <p>
        <strong>Your data needs a format update.</strong>{" "}
        {describeOutdated(plan)} {singular ? "is" : "are"} stored in an
        older format. Solid Memo now writes {describeFormats(plan)}.
        Updating makes an updated copy and switches over to it once it is
        checked, keeping your current data as a backup; deck names, card
        text, directions, your review history and your settings stay as
        they are, and a deck without a description gets a short one you can
        change.
      </p>
      <ul>
        {plan.instanceOutdated && <li>Instance record</li>}
        {plan.catalogMissing && <li>Catalogue of the decks</li>}
        {plan.preferencesOutdated && <li>Preferences</li>}
        {plan.decks.map(({ deck, deckOutdated, cardCount, reviewCount }) => (
          <li key={deck.url}>
            {readerText(deck.title)} —{" "}
            {[
              ...(deckOutdated ? ["deck entry"] : []),
              ...(cardCount > 0 ? [formatCardCount(cardCount)] : []),
              ...(reviewCount > 0 ? [reviewStates(reviewCount)] : []),
            ].join(", ")}
          </li>
        ))}
      </ul>
      <button class="primary" onClick={onMigrate} disabled={busy}>
        {busy ? "Updating…" : updateLabel(plan)}
      </button>
      {error && <p class="error">{error}</p>}
    </div>
  );
}
