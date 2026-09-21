import { useState } from "preact/hooks";
import type { StudyPreferences } from "../domain/preferences";

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

  const [developerMode, setDeveloperMode] = useState(
    preferences.developerMode,
  );

  function handleSubmit(event: Event) {
    event.preventDefault();
    onSave({
      newCardsPerDay: Number(newCardsPerDay),
      maxReviewsPerDay: Number(maxReviewsPerDay),
      dayBoundaryHour: Number(dayBoundaryHour),
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
