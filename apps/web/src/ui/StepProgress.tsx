import { useI18n } from "./i18n";

/**
 * Progress through a fixed list of steps — an update that must not be
 * cut off: what it is doing now (announced), a progress bar, and every
 * step, done, under way or still to come.
 */
export function StepProgress<Step extends string>({
  region,
  steps,
  current,
  done,
  total,
  status,
  progressLabel,
  hint,
}: {
  /** The region's accessible name. */
  region: string;
  /** Every step, in order, with its label. */
  steps: readonly { step: Step; label: string }[];
  current: Step;
  /** Units of work done, out of `total`. */
  done: number;
  total: number;
  /** What it is doing now, in a sentence. */
  status: string;
  progressLabel: string;
  hint: string;
}) {
  const { t } = useI18n();
  const at = steps.findIndex((entry) => entry.step === current);
  const finished = total > 0 && done >= total;
  return (
    <div class="warning migration" role="region" aria-label={region}>
      <p role="status">{status}</p>
      <progress value={done} max={Math.max(total, 1)} aria-label={progressLabel} />
      <ol class="step-list">
        {steps.map(({ step, label }, index) => {
          const state = finished || index < at ? "done" : index === at ? "current" : "waiting";
          return (
            <li key={step} class={`step-${state}`} aria-current={state === "current" ? "step" : undefined}>
              <span class="step-mark" aria-hidden="true">
                {state === "done" ? "✓" : state === "current" ? "➜" : "·"}
              </span>
              {label}
              {state !== "waiting" && <span class="visually-hidden"> ({t(`stepProgress.${state}`)})</span>}
            </li>
          );
        })}
      </ol>
      <p class="hint">{hint}</p>
    </div>
  );
}
