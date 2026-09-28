import type { UpdateJournal } from "@solid-memo/application/ports";

/**
 * The UpdateJournal in the browser's localStorage, one key per instance
 * being updated. Browser storage may be missing or refuse (a private
 * window, blocked site data), so every access is guarded: the journal
 * is a convenience, never needed for an update to succeed.
 */
export function createLocalStorageUpdateJournal(
  storage: () => Storage = () => globalThis.localStorage,
): UpdateJournal {
  const key = (sourceUrl: string) => `solid-memo:update:${sourceUrl}`;
  return {
    begin(sourceUrl, stagingUrl) {
      try {
        storage().setItem(key(sourceUrl), JSON.stringify({ stagingUrl, startedAt: new Date().toISOString() }));
      } catch {
        // Without storage, an interrupted update cannot be found later; nothing else changes.
      }
    },
    end(sourceUrl) {
      try {
        storage().removeItem(key(sourceUrl));
      } catch {
        // As above.
      }
    },
    staging(sourceUrl) {
      try {
        const entry = storage().getItem(key(sourceUrl));
        if (entry === null) return null;
        const stagingUrl = (JSON.parse(entry) as { stagingUrl?: unknown }).stagingUrl;
        return typeof stagingUrl === "string" ? stagingUrl : null;
      } catch {
        return null;
      }
    },
  };
}
