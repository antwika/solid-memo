import { getSolidDataset, toRdfJsDataset } from "@inrupt/solid-client";
import type { DatasetCore } from "@rdfjs/types";
import type { ShapeDescriptor } from "./shapeDescriptor";

/**
 * The shape documents as published with the site (shapes/…), fetched
 * once each and parsed the way pod documents are. Shapes are read from
 * the site rather than bundled: they are published anyway, the dev
 * server serves the repository's folder, and the document the browser
 * checks against is the one the build validated.
 */
export interface ShapeLoader {
  load(descriptor: ShapeDescriptor): Promise<DatasetCore>;
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
  return {
    load(descriptor) {
      const url = new URL(descriptor.shapeDocument, shapesBaseUrl).href;
      let dataset = loaded.get(url);
      if (dataset === undefined) {
        dataset = getSolidDataset(url, { fetch }).then(toRdfJsDataset);
        loaded.set(url, dataset);
      }
      return dataset;
    },
  };
}
