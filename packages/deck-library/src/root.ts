import { join } from "node:path";

/** This package's folder, ending in a slash: where decks/, releases/ and the lockfile are. */
export const DECK_LIBRARY_ROOT = join(import.meta.dirname, "../");
