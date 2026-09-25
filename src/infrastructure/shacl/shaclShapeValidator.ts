import { asUrl, getThingAll, getUrlAll, toRdfJsDataset } from "@inrupt/solid-client";
import type { DatasetCore } from "@rdfjs/types";
import type { ShapeValidator } from "../../application/ports";
import type { DocumentReport, SubjectReport } from "../../domain/validation";
import { getSolidDatasetOrNull } from "../solid/datasets";
import { storedVersionOf } from "../solid/records";
import { RDF } from "../solid/vocab";
import type { ShapeEngine } from "./engine";
import { pickShape } from "./registry";
import type { ShapeDescriptor } from "./shapeDescriptor";
import { createShapeLoader, type ShapeLoader } from "./shapeLoader";

export interface ShaclShapeValidatorDeps {
  /** Fetches pod documents (authenticated). */
  fetch: typeof globalThis.fetch;
  /** Fetches the site's own shape documents (plain). */
  shapesFetch: typeof globalThis.fetch;
  shapesBaseUrl: string;
  /**
   * Loads the engine module. A dynamic import by default, so the SHACL
   * library ships in its own chunk and is fetched only when a validation
   * is asked for.
   */
  loadEngine?: () => Promise<{ createEngine(shapes: DatasetCore): ShapeEngine }>;
  loader?: ShapeLoader;
}

/**
 * The ShapeValidator port over the SHACL engine: every subject of a
 * document with a Solid Memo class is checked against the shape of its
 * class and stored version, chosen exactly as the app chooses it when
 * reading (registry.pickShape).
 */
export function createShaclShapeValidator({
  fetch,
  shapesFetch,
  shapesBaseUrl,
  loadEngine = () => import("./engine"),
  loader = createShapeLoader({ fetch: shapesFetch, shapesBaseUrl }),
}: ShaclShapeValidatorDeps): ShapeValidator {
  const engines = new Map<string, Promise<ShapeEngine>>();

  function engineFor(descriptor: ShapeDescriptor): Promise<ShapeEngine> {
    let engine = engines.get(descriptor.shapeDocument);
    if (engine === undefined) {
      engine = Promise.all([loadEngine(), loader.load(descriptor)]).then(
        ([{ createEngine }, shapes]) => createEngine(shapes),
      );
      engines.set(descriptor.shapeDocument, engine);
    }
    return engine;
  }

  return {
    async validateDocument(url): Promise<DocumentReport> {
      const dataset = await getSolidDatasetOrNull(url, fetch);
      if (dataset === null) return { url, status: "missing", subjects: [] };
      const data = toRdfJsDataset(dataset);
      const subjects: SubjectReport[] = [];
      for (const thing of getThingAll(dataset)) {
        const subject = asUrl(thing);
        const version = storedVersionOf(thing);
        const pick = pickShape(getUrlAll(thing, RDF.type), version, "pod");
        if (pick.kind === "untyped") {
          subjects.push({ url: subject, status: "untyped" });
          continue;
        }
        if (pick.kind === "unknown-version") {
          subjects.push({
            url: subject,
            status: "newer",
            shape: pick.shape,
            version: pick.version,
            latest: pick.latest,
          });
          continue;
        }
        const engine = await engineFor(pick.descriptor);
        subjects.push({
          url: subject,
          status: "checked",
          shape: pick.descriptor.shape,
          version: pick.descriptor.version,
          violations: await engine.validateNode(data, subject, pick.descriptor.shapeIri),
        });
      }
      return { url, status: "checked", subjects };
    },
  };
}
