// Validates deck sources as their next releases would be, with the whole
// library, as the build does, and prints the warnings (sources not released
// yet). Exits 1 on the first invalid deck.
//   node packages/deck-library/scripts/validate_sources.ts            every source in decks/
//   node packages/deck-library/scripts/validate_sources.ts name ...   only these sources
// Named sources are checked in a temporary copy of the library holding the
// releases and those sources alone, so a source being edited elsewhere in
// decks/ cannot fail them.
import { copyFile, mkdtemp, mkdir, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadValidators, readDeckLibrary } from "../src/deckLibrary.ts";
import { DECK_LIBRARY_ROOT } from "../src/root.ts";

const names = process.argv.slice(2);
let root = DECK_LIBRARY_ROOT;
if (names.length > 0) {
  root = await mkdtemp(join(tmpdir(), "deck-library-"));
  await symlink(join(DECK_LIBRARY_ROOT, "releases"), join(root, "releases"));
  await copyFile(join(DECK_LIBRARY_ROOT, "deck-releases.lock.json"), join(root, "deck-releases.lock.json"));
  await mkdir(join(root, "decks"));
  for (const name of names) await copyFile(join(DECK_LIBRARY_ROOT, "decks", `${name}.ttl`), join(root, "decks", `${name}.ttl`));
}
try {
  const { warnings } = await readDeckLibrary(root, await loadValidators());
  for (const warning of warnings) console.log(`warning: ${warning}`);
  console.log("valid");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  if (root !== DECK_LIBRARY_ROOT) await rm(root, { recursive: true, force: true });
}
