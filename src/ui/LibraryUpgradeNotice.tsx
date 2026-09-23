import type { LibraryUpgradePlan } from "../domain/libraryUpgrade";
import { DIRECTION_LABELS } from "./direction";

/**
 * Tells the user the library now publishes their imported deck in a newer
 * format, what applying it would change, and lets them do so. Nothing
 * happens until they do.
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
    <div
      class="warning migration"
      role="region"
      aria-label="Newer library version"
    >
      <p>
        <strong>The deck library has a newer version of this deck.</strong>{" "}
        {deckName} came from the library, which now publishes it in deck
        format {plan.toVersion}; your copy is format {plan.fromVersion}.
        Updating sets its study direction to{" "}
        <em>{DIRECTION_LABELS[plan.direction]}</em>, as the library states.
        Your cards and review history stay as they are, and you can change
        the direction again in the Browser.
      </p>
      <button class="primary" onClick={onUpgrade} disabled={busy}>
        {busy ? "Updating…" : "Update from the library"}
      </button>
      {error && <p class="error">{error}</p>}
    </div>
  );
}
