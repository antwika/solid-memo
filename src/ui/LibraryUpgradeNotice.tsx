import type { LibraryUpgradePlan } from "../domain/libraryUpgrade";
import { DIRECTION_LABELS } from "./direction";
import { cardCount } from "./studyCounts";

/** "adds 1 card, changes 2 cards and removes 1 card", of what the plan does. */
export function describeChanges(plan: LibraryUpgradePlan): string {
  const parts = [
    ...(plan.add.length > 0 ? [`adds ${cardCount(plan.add.length)}`] : []),
    ...(plan.change.length > 0 ? [`changes ${cardCount(plan.change.length)}`] : []),
    ...(plan.remove.length > 0 ? [`removes ${cardCount(plan.remove.length)}`] : []),
    ...(plan.direction === undefined ? [] : [`studies it ${DIRECTION_LABELS[plan.direction].toLowerCase()}`]),
  ];
  return parts.length <= 1 ? parts.join("") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/**
 * Tells the user the library has a newer release of their imported
 * deck, what changed in it, what updating would do to their copy, and
 * lets them do so. Nothing happens until they do.
 */
export function LibraryUpgradeNotice({
  deckName,
  plan,
  busy,
  error,
  onUpgrade,
}: {
  deckName: string;
  plan: LibraryUpgradePlan;
  busy: boolean;
  error: string | null;
  onUpgrade: () => void;
}) {
  return (
    <div class="warning migration" role="region" aria-label="Newer library release">
      <p>
        <strong>The deck library has a newer release of this deck.</strong>{" "}
        {deckName} came from release {plan.fromVersion}; release {plan.toVersion} is out. Updating{" "}
        {describeChanges(plan)}. Your review history is kept
        {plan.remove.length > 0 ? ", but for the cards removed" : ""}.
        {plan.kept.length > 0 &&
          ` ${plan.kept.length === 1 ? "1 card you changed is" : `${plan.kept.length} cards you changed are`} left as you have ${plan.kept.length === 1 ? "it" : "them"}.`}
      </p>
      {plan.notes.length > 0 && (
        <ul>
          {plan.notes.map((note) => (
            <li key={note.version}>
              Release {note.version}: {note.notes}
            </li>
          ))}
        </ul>
      )}
      <button class="primary" onClick={onUpgrade} disabled={busy}>
        {busy ? "Updating…" : `Update to release ${plan.toVersion}`}
      </button>
      {error && <p class="error">{error}</p>}
    </div>
  );
}
