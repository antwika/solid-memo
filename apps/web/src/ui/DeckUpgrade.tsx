import {
  DECK_UPGRADE_STEPS,
  type DeckUpgradeOutcome,
  type DeckUpgradeStep,
  type StepPart,
} from "@solid-memo/domain/deckUpgrade";
import { useI18n, type I18n } from "./i18n";
import { StepProgress } from "./StepProgress";

/** The upgrade's steps as the screen shows them: the use case's, then refreshing what is shown. */
export type DeckUpgradeScreenStep = DeckUpgradeStep | "refresh";

export const DECK_UPGRADE_SCREEN_STEPS: readonly DeckUpgradeScreenStep[] = [...DECK_UPGRADE_STEPS, "refresh"];

function stepLabel(t: I18n["t"], step: DeckUpgradeScreenStep): string {
  return t(`deckUpgrade.step.${step}`);
}

/** While a library deck upgrade runs: every step, the one it is on, and how far along it is. */
export function DeckUpgradeProgress({
  step,
  done,
  part,
}: {
  step: DeckUpgradeScreenStep;
  done: number;
  /** How far into `step` it is, for a step of more than one read or write. */
  part?: StepPart;
}) {
  const { t } = useI18n();
  const label = stepLabel(t, step);
  return (
    <StepProgress
      region={t("deckUpgrade.progressRegion")}
      steps={DECK_UPGRADE_SCREEN_STEPS.map((entry) => ({ step: entry, label: stepLabel(t, entry) }))}
      current={step}
      done={done}
      total={DECK_UPGRADE_SCREEN_STEPS.length}
      part={part}
      status={
        part === undefined
          ? t("deckUpgrade.running", { step: label })
          : t("deckUpgrade.runningCount", { step: label, done: part.done, total: part.total })
      }
      progressLabel={t("deckUpgrade.progressLabel")}
      hint={t("deckUpgrade.keepOpen")}
    />
  );
}

/** When the upgrade failed: where, why, and that the deck is as it was. */
export function DeckUpgradeFailure({
  outcome,
  onRetry,
  onDismiss,
}: {
  outcome: Extract<DeckUpgradeOutcome, { ok: false }>;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  const { t, errorText } = useI18n();
  return (
    <div class="warning migration" role="region" aria-label={t("deckUpgrade.failedRegion")}>
      <p>
        <strong>{t("deckUpgrade.failedWhile", { step: stepLabel(t, outcome.step).toLowerCase() })}</strong>{" "}
        {errorText(outcome.error)}
      </p>
      <p>
        {t("deckUpgrade.noChanges")}{" "}
        {outcome.cleanedUp ? t("deckUpgrade.copyRemoved") : t("deckUpgrade.copyLeft")}
      </p>
      <div class="edit-actions">
        <button class="primary" onClick={onRetry}>
          {t("deckUpgrade.tryAgain")}
        </button>
        <button onClick={onDismiss}>{t("deckUpgrade.close")}</button>
      </div>
    </div>
  );
}
