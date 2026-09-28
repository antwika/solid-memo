import { join } from "node:path";

/**
 * This package's folder, ending in a slash: where vocab/, shapes/, vendor/
 * and fixtures/ are, for the node tooling of any package (the generator,
 * the build's validators, the site's publishing) wherever it runs from.
 */
export const VOCAB_ROOT = join(import.meta.dirname, "../");
