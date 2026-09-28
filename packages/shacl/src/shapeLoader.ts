import { getSolidDataset, toRdfJsDataset } from "@inrupt/solid-client";
import type { DatasetCore } from "@rdfjs/types";
import { PROFILES, REFERENCE_DATA, type ProfileName } from "./profiles";
import type { ShapeDescriptor } from "@solid-memo/vocab/shapeDescriptor";

/**
 * The shape documents as published with the site (shapes/…, and the
 * vendored profiles and reference data at vendor/… and vocab/… beside
 * it), fetched once each and parsed the way pod documents are. Shapes are read from
 * the site rather than bundled: they are published anyway, the dev
 * server serves the repository's folder, and the document the browser
 * checks against is the one the build validated.
 */
export interface ShapeLoader {
  load(descriptor: ShapeDescriptor): Promise<DatasetCore>;
  /** A profile's shape files (vendor/…), each as published. */
  loadProfile(profile: ProfileName): Promise<DatasetCore[]>;
  /** The reference data profile checks load beside a document (vocab/…). */
  loadReferenceData(): Promise<DatasetCore[]>;
}

export function createShapeLoader({
  fetch,
  shapesBaseUrl,
}: {
  fetch: typeof globalThis.fetch;
  /** Where the shapes live, e.g. `new URL("shapes/", document.baseURI).href`. */
  shapesBaseUrl: string;
}): ShapeLoader {
  const loaded = new Map<string, Promise<DatasetCore>>();
  const site = new URL("../", shapesBaseUrl).href;
  function fetchOnce(url: string): Promise<DatasetCore> {
    let dataset = loaded.get(url);
    if (dataset === undefined) {
      dataset = getSolidDataset(url, { fetch }).then(toRdfJsDataset);
      loaded.set(url, dataset);
    }
    return dataset;
  }
  return {
    load(descriptor) {
      return fetchOnce(new URL(descriptor.shapeDocument, shapesBaseUrl).href);
    },
    loadProfile(profile) {
      return Promise.all(PROFILES[profile].map((path) => fetchOnce(new URL(path, site).href)));
    },
    loadReferenceData() {
      return Promise.all(REFERENCE_DATA.map((path) => fetchOnce(new URL(path, site).href)));
    },
  };
}
