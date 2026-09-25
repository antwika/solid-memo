import { Store, type Quad } from "n3";
import { createEngine, type ShapeEngine } from "../src/infrastructure/shacl/engine.ts";
import { pickShape } from "../src/infrastructure/shacl/registry.ts";
import type { ShapeContext } from "../src/infrastructure/shacl/shapeDescriptor.ts";
import { RDF_TYPE, objectsOf, parseTurtle, readTurtleTree } from "./rdf.ts";
import { SM_NS } from "./vocab.ts";
import { SHAPES_BASE } from "./shapes.ts";

/**
 * Build-time SHACL validation: the shapes under shapes/ applied to a
 * Turtle document, one subject at a time, with the shape chosen by class
 * and format version exactly as the app chooses it.
 */

/** Every shape file under `<root>/shapes`, parsed into one graph. */
export async function loadShapesGraph(root: string): Promise<Store> {
  const files = await readTurtleTree(`${root}/shapes`);
  return new Store(
    files.flatMap((file) => parseTurtle(file.turtle, `${SHAPES_BASE}${file.path}`)),
  );
}

export async function loadEngine(root: string): Promise<ShapeEngine> {
  return createEngine(await loadShapesGraph(root));
}

/**
 * Validate every Solid Memo subject of a document. Throws one Error
 * listing every problem, `label` first, so a broken file names itself.
 * Subjects without a Solid Memo type (a source's description, say) are
 * not checked; a subject in a format this app does not know, or typed
 * with a Solid Memo term that is no class, is a problem of its own.
 */
export async function validateTurtleDocument(
  label: string,
  quads: readonly Quad[],
  engine: ShapeEngine,
  context: Exclude<ShapeContext, "any">,
): Promise<void> {
  const data = new Store([...quads]);
  const subjects = [
    ...new Set(
      quads
        .filter((q) => q.predicate.value === RDF_TYPE && q.object.value.startsWith(SM_NS))
        .map((q) => q.subject.value),
    ),
  ];
  const problems: string[] = [];
  for (const subject of subjects) {
    const types = objectsOf(quads, subject, RDF_TYPE).map((o) => o.value);
    const version = Number(
      objectsOf(quads, subject, `${SM_NS}formatVersion`)[0]?.value ?? "1",
    );
    const pick = pickShape(types, version, context);
    if (pick.kind === "untyped") {
      problems.push(`<${subject}> is typed with a Solid Memo term that names no class.`);
      continue;
    }
    if (pick.kind === "unknown-version") {
      problems.push(
        `<${subject}> is ${pick.shape} format ${pick.version}; this app knows formats 1–${pick.latest}.`,
      );
      continue;
    }
    for (const violation of await engine.validateNode(
      data,
      subject,
      pick.descriptor.shapeIri,
    )) {
      const where = violation.path === undefined ? "" : ` (${violation.path})`;
      problems.push(`<${subject}>${where}: ${violation.message}`);
    }
  }
  if (problems.length > 0) {
    throw new Error(`${label}:\n  ${problems.join("\n  ")}`);
  }
}
