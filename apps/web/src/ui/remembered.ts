import { useState } from "preact/hooks";

/** Values kept past their screen, for the life of the page. */
const memory = new Map<string, unknown>();

/**
 * Like useState, but the value outlives the component: it is kept under
 * `key` and comes back when a component asks for that key again. A screen
 * the user leaves for a moment (a deck's page, a preview) is unmounted,
 * and its choices would otherwise be lost on the way back. Kept in memory
 * only, so a reload starts afresh and nothing lands in the browser's storage.
 */
export function useRemembered<T>(
  key: string,
  initial: T,
): [T, (update: (current: T) => T) => void] {
  const [value, setValue] = useState<T>(() =>
    memory.has(key) ? (memory.get(key) as T) : initial,
  );
  function update(next: (current: T) => T) {
    setValue((current) => {
      const value = next(current);
      memory.set(key, value);
      return value;
    });
  }
  return [value, update];
}

/** Drops what is kept under `key`, so its next screen starts afresh. */
export function forget(key: string): void {
  memory.delete(key);
}
