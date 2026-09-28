import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Store, type Quad } from "n3";
import { createEngine, type ShapeEngine } from "../src/engine.ts";
import {
  coreOnly,
  PROFILES,
  REFERENCE_DATA,
  type ProfileName,
} from "../src/profiles.ts";
import { pickShape } from "../src/registry.ts";
import { ALL_SHAPES } from "@solid-memo/vocab/descriptors.generated";
import type { ShapeContext } from "@solid-memo/vocab/shapeDescriptor";
import { RDF_TYPE, objectsOf, parseTurtle, readTurtleTree } from "@solid-memo/turtle/rdf";
import { SM_NS } from "@solid-memo/vocab/tooling/vocab";
import { SHAPES_BASE } from "@solid-memo/vocab/tooling/shapes";

/**
 * Build-time SHACL validation: the shapes under shapes/ applied to a
 * Turtle document, one subject at a time, with the shape chosen by class
 * and format version exactly as the app chooses it; and the vendored
 * profiles (DCAT-AP, SKOS) applied to a whole document.
 */

/** Where a file under the repository root is published. */
const SITE = "https://solid-memo.com/";

async function readSiteTurtle(root: string, path: string): Promise<Quad[]> {
  return parseTurtle(await readFile(join(root, path), "utf8"), `${SITE}${path}`);
}

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

/** The classes Solid Memo's shapes are picked by: its own, and the DCAT and FOAF ones it writes. */
const SHAPED_CLASSES = new Set(ALL_SHAPES.map((d) => d.targetClass));

/**
 * Validate every Solid Memo subject of a document: one with a Solid
 * Memo type, or of a DCAT or FOAF class a shape describes (a catalogue,
 * an agent, a distribution). Throws one Error listing every problem,
 * `label` first, so a broken file names itself. Other subjects (a
 * source's description, say) are not checked; a subject in a format
 * this app does not know, or typed with a Solid Memo term that is no
 * class, is a problem of its own.
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
        .filter(
          (q) =>
            q.predicate.value === RDF_TYPE &&
            (q.object.value.startsWith(SM_NS) || SHAPED_CLASSES.has(q.object.value)),
        )
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

/** An engine for one vendored profile, its SPARQL constraints left out. */
export async function loadProfileEngine(
  root: string,
  profile: ProfileName,
): Promise<ShapeEngine> {
  const quads = await Promise.all(PROFILES[profile].map((path) => readSiteTurtle(root, path)));
  return createEngine(new Store(coreOnly(quads.flat())));
}

/** The reference data a profile check loads next to a document. */
export async function loadReferenceData(root: string): Promise<Quad[]> {
  return (await Promise.all(REFERENCE_DATA.map((path) => readSiteTurtle(root, path)))).flat();
}

/**
 * Check a whole document against a profile, with the reference data in
 * the data graph. Throws one Error listing every violation about a
 * subject of the document, `label` first; results about the reference
 * data itself are its own test's business. Warnings (a profile's
 * recommendations) fail only with `minimum: "warning"`, which Solid
 * Memo's own concept schemes are held to; infos never fail.
 */
export async function validateProfile(
  label: string,
  quads: readonly Quad[],
  engine: ShapeEngine,
  reference: readonly Quad[],
  minimum: "violation" | "warning" = "violation",
): Promise<void> {
  const failing = minimum === "warning" ? ["violation", "warning"] : ["violation"];
  const subjects = new Set(quads.map((q) => q.subject.value));
  const problems = (await engine.validate(new Store([...quads, ...reference])))
    .filter((violation) => failing.includes(violation.severity))
    .filter((violation) => subjects.has(violation.focusNode))
    .map((violation) => {
      const where = violation.path === undefined ? "" : ` (${violation.path})`;
      return `<${violation.focusNode}>${where}: ${violation.message}`;
    });
  if (problems.length > 0) {
    throw new Error(`${label}:\n  ${problems.join("\n  ")}`);
  }
}
