import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readTurtleTree, type TurtleFile } from "./rdf.ts";
import { parseShapes, renderDescriptors, renderDomainTypes } from "./shapes.ts";
import { parseVocab, renderVocabConstants } from "./vocab.ts";

/**
 * `npm run generate`: render the TypeScript that the vocabulary and the
 * shapes determine, and write it; `npm run generate:check` renders and
 * fails on any difference from what is committed. The outputs are data
 * only (constants, interfaces), so drift is caught by `tsc` and the
 * tests too — the check just names the file.
 */

export const OUTPUTS = {
  vocab: "src/infrastructure/solid/vocab.generated.ts",
  types: "src/domain/shapes/generated.ts",
  descriptors: "src/infrastructure/shacl/shapes.generated.ts",
} as const;

export interface GenerateIo {
  readFile(path: string): Promise<string>;
  writeFile(path: string, text: string): Promise<void>;
  readTurtleTree(dir: string): Promise<TurtleFile[]>;
  log(message: string): void;
}

export function defaultIo(root: string): GenerateIo {
  return {
    readFile: (path) => readFile(join(root, path), "utf8"),
    writeFile: (path, text) => writeFile(join(root, path), text),
    readTurtleTree: (dir) => readTurtleTree(join(root, dir)),
    log: (message) => console.log(message),
  };
}

/** Every output path with its rendered text. */
export async function render(io: GenerateIo): Promise<Record<string, string>> {
  const vocab = parseVocab(await io.readFile("vocab/v1.ttl"));
  const shapes = parseShapes(await io.readTurtleTree("shapes"));
  return {
    [OUTPUTS.vocab]: renderVocabConstants(vocab),
    [OUTPUTS.types]: renderDomainTypes(shapes),
    [OUTPUTS.descriptors]: renderDescriptors(shapes),
  };
}

/** Exit code: 0 when written (or, with --check, up to date), 1 on drift. */
export async function main(argv: readonly string[], io: GenerateIo): Promise<number> {
  const outputs = await render(io);
  if (!argv.includes("--check")) {
    for (const [path, text] of Object.entries(outputs)) {
      await io.writeFile(path, text);
      io.log(`wrote ${path}`);
    }
    return 0;
  }
  let drifted = 0;
  for (const [path, text] of Object.entries(outputs)) {
    const committed = await io.readFile(path).catch(() => "");
    if (committed !== text) {
      io.log(`${path} is out of date: run \`npm run generate\`.`);
      drifted += 1;
    }
  }
  return drifted === 0 ? 0 : 1;
}

/** The script entry: `node -e "import('./tooling/generate.ts').then((m) => m.run())"`. */
export async function run(
  process: { argv: readonly string[]; cwd(): string; exitCode?: number },
): Promise<void> {
  process.exitCode = await main(process.argv, defaultIo(process.cwd()));
}
