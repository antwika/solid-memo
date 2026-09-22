import { useState } from "preact/hooks";
import type { AnswerScale } from "../domain/answerScale";
import type { StudyPreferences } from "../domain/preferences";

const ANSWER_SCALE_OPTIONS: {
  value: AnswerScale;
  label: string;
  hint: string;
}[] = [
  {
    value: "sm2",
    label: "0 to 5 scale",
    hint: "The full SM-2 grades, from 0 (blackout) to 5 (easy).",
  },
  {
    value: "minimal",
    label: "Again · Hard · Good · Easy",
    hint: "Four buttons. Again repeats the card later in the session.",
  },
];

export function PreferencesScreen({
  preferences,
  busy,
  error,
  onSave,
}: {
  preferences: StudyPreferences;
  busy: boolean;
  error: string | null;
  onSave: (preferences: StudyPreferences) => void;
}) {
  const [newCardsPerDay, setNewCardsPerDay] = useState(
    String(preferences.newCardsPerDay),
  );
  const [maxReviewsPerDay, setMaxReviewsPerDay] = useState(
    String(preferences.maxReviewsPerDay),
  );
  const [dayBoundaryHour, setDayBoundaryHour] = useState(
    String(preferences.dayBoundaryHour),
  );

  const [answerScale, setAnswerScale] = useState<AnswerScale>(
    preferences.answerScale,
  );
  const [developerMode, setDeveloperMode] = useState(
    preferences.developerMode,
  );

  function handleSubmit(event: Event) {
    event.preventDefault();
    onSave({
      newCardsPerDay: Number(newCardsPerDay),
      maxReviewsPerDay: Number(maxReviewsPerDay),
      dayBoundaryHour: Number(dayBoundaryHour),
      answerScale,
      developerMode,
    });
  }

  return (
    <section>
      <header>
        <h2>Study preferences</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label for="pref-new">New cards per day</label>
        <input
          id="pref-new"
          type="number"
          min="0"
          value={newCardsPerDay}
          onInput={(e) => setNewCardsPerDay(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <label for="pref-max">Max reviews per day</label>
        <input
          id="pref-max"
          type="number"
          min="0"
          value={maxReviewsPerDay}
          onInput={(e) => setMaxReviewsPerDay(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <label for="pref-boundary">Day starts at (hour)</label>
        <input
          id="pref-boundary"
          type="number"
          min="0"
          max="23"
          value={dayBoundaryHour}
          onInput={(e) => setDayBoundaryHour(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <fieldset>
          <legend>Answer buttons</legend>
          {ANSWER_SCALE_OPTIONS.map((option) => (
            <label key={option.value} class="radio-option">
              <input
                type="radio"
                name="answer-scale"
                value={option.value}
                checked={answerScale === option.value}
                onChange={() => setAnswerScale(option.value)}
                disabled={busy}
              />
              {option.label}
              <span class="hint">{option.hint}</span>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Developer settings</legend>
          <label>
            <input
              type="checkbox"
              checked={developerMode}
              onChange={(e) => setDeveloperMode(e.currentTarget.checked)}
              disabled={busy}
            />
            Developer mode
          </label>
          <p class="hint">Shows your raw WebID document below the app.</p>
        </fieldset>
        <button type="submit" disabled={busy}>
          Save
        </button>
      </form>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
