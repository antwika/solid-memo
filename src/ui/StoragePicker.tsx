import { useState } from "preact/hooks";
import type { Storage } from "../domain/storage";

const SOURCE_LABEL: Record<Storage["source"], string> = {
  profile: "from your profile",
  linkHeader: "discovered from your pod server",
  manual: "entered manually",
};

export function StoragePicker({
  storages,
  busy,
  error,
  onSelect,
  onAddManual,
}: {
  storages: Storage[];
  busy: boolean;
  error: string | null;
  onSelect: (storage: Storage) => void;
  onAddManual: (url: string) => void;
}) {
  const [manualUrl, setManualUrl] = useState("");

  function handleSubmit(event: Event) {
    event.preventDefault();
    onAddManual(manualUrl.trim());
  }

  return (
    <section>
      <h2>Choose a storage</h2>
      {storages.length === 0 ? (
        <p>
          No storage was found for your WebID. Enter your pod's root URL
          below.
        </p>
      ) : (
        <ul class="storage-list">
          {storages.map((storage) => (
            <li key={storage.url}>
              <button onClick={() => onSelect(storage)} disabled={busy}>
                {storage.url}
              </button>{" "}
              <span class="hint">({SOURCE_LABEL[storage.source]})</span>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label for="storage-url">Storage URL</label>
        <input
          id="storage-url"
          type="url"
          placeholder="https://your-pod/"
          value={manualUrl}
          onInput={(e) => setManualUrl(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <button type="submit" disabled={busy}>
          Use this storage
        </button>
      </form>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
