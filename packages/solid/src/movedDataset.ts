import { fromRdfJsDataset, toRdfJsDataset, type SolidDataset } from "@inrupt/solid-client";

/** The engine module's IRI mapper, loaded when first needed (it is large, like the validator). */
export type LoadEngine = () => Promise<{ mapIris: typeof import("@solid-memo/shacl/engine").mapIris }>;

export const loadEngine: LoadEngine = () => import("@solid-memo/shacl/engine");

/** The document's IRI or one of its fragments, moved to another document; any other IRI as it is. */
export function movedIri(iri: string, from: string, to: string): string {
  if (iri === from) return to;
  return iri.startsWith(`${from}#`) ? `${to}${iri.slice(from.length)}` : iri;
}

/**
 * A document's dataset as a new dataset for another document: every IRI
 * of the old document (its fragments) moved to the new one, all else as
 * it is. A new dataset is saved as a creation (If-None-Match: *).
 */
export async function movedDataset(
  dataset: SolidDataset,
  from: string,
  to: string,
  load: LoadEngine = loadEngine,
): Promise<SolidDataset> {
  const { mapIris } = await load();
  return fromRdfJsDataset(mapIris(toRdfJsDataset(dataset), (iri) => movedIri(iri, from, to)));
}
