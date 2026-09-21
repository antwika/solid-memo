import { getSolidDataset } from "@inrupt/solid-client";
import type { WebIdDocumentRepository } from "../../application/ports";
import type { WebIdDocument } from "../../domain/webIdDocument";
import { toWebIdDocument } from "./mappers/webIdDocumentMapper";

export interface SolidWebIdDocumentRepositoryDeps {
  fetch: typeof globalThis.fetch;
}

export function createSolidWebIdDocumentRepository({
  fetch,
}: SolidWebIdDocumentRepositoryDeps): WebIdDocumentRepository {
  return {
    async fetchWebIdDocument(webId): Promise<WebIdDocument> {
      const dataset = await getSolidDataset(webId, { fetch });
      return toWebIdDocument(dataset);
    },
  };
}
