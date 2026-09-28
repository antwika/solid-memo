import {
  createContainerAt,
  fromRdfJsDataset,
  getFile,
  getSolidDataset,
  overwriteFile,
  saveSolidDatasetAt,
  toRdfJsDataset,
} from "@inrupt/solid-client";
import type { ContainerMove, InstanceCopier } from "@solid-memo/application/ports";
import { rebaseIri } from "@solid-memo/domain/instanceUpdate";
import { deleteContainerRecursively, listContainerTree } from "./containers";
import { getSolidDatasetOrNull } from "./datasets";

type Fetch = typeof globalThis.fetch;

/** The URL a `Link` header gives for `rel`, resolved against the resource; null when none. */
export function linkedUrl(link: string | null, rel: string, resourceUrl: string): string | null {
  for (const match of (link ?? "").matchAll(/<([^>]*)>\s*;([^,]*)/g)) {
    const rels = /rel\s*=\s*"?([^";]*)"?/.exec(match[2])?.[1].split(/\s+/) ?? [];
    if (rels.includes(rel)) return new URL(match[1], resourceUrl).href;
  }
  return null;
}

/**
 * The InstanceCopier over a Solid pod: documents copied with every IRI
 * under the old container moved under the new one (a deck's cards
 * document, the catalogue node, the access rules' targets), other files
 * byte for byte, and each resource's own access control copied the same
 * way. The engine module (lazy, like the validator's) does the moving.
 */
export function createSolidInstanceCopier({
  fetch,
  loadEngine = () => import("@solid-memo/shacl/engine"),
}: {
  fetch: Fetch;
  loadEngine?: () => Promise<{ mapIris: typeof import("@solid-memo/shacl/engine").mapIris }>;
}): InstanceCopier {
  async function rebased(url: string, move: ContainerMove) {
    return rebasedDataset(await getSolidDataset(url, { fetch }), move);
  }

  async function rebasedDataset(dataset: Parameters<typeof toRdfJsDataset>[0], move: ContainerMove) {
    const { mapIris } = await loadEngine();
    return fromRdfJsDataset(mapIris(toRdfJsDataset(dataset), (iri) => rebaseIri(iri, move.from, move.to)));
  }

  function head(url: string): Promise<Response> {
    return fetch(url, { method: "HEAD" });
  }

  return {
    listResources: (containerUrl) => listContainerTree(containerUrl, fetch),

    async ensureAbsent(url) {
      const response = await head(url);
      if (response.status === 404) return;
      throw new Error(
        response.ok ? `<${url}> already exists.` : `Could not check <${url}>: ${response.status}.`,
      );
    },

    async createContainer(url) {
      await createContainerAt(url, { fetch });
    },

    async copyAccessControl(from, to, move) {
      const sourceAcl = linkedUrl((await head(from)).headers.get("Link"), "acl", from);
      const acl = sourceAcl === null ? null : await getSolidDatasetOrNull(sourceAcl, fetch);
      if (acl === null) return false;
      const targetAcl = linkedUrl((await head(to)).headers.get("Link"), "acl", to);
      if (targetAcl === null) {
        throw new Error(`The pod does not say where the access control of <${to}> goes.`);
      }
      await saveSolidDatasetAt(targetAcl, await rebasedDataset(acl, move), { fetch });
      return true;
    },

    async copyResource(from, to, move) {
      if (from.endsWith("/")) {
        await createContainerAt(to, { fetch });
        return;
      }
      const contentType = (await head(from)).headers.get("Content-Type") ?? "";
      if (contentType.startsWith("text/turtle")) {
        await saveSolidDatasetAt(to, await rebased(from, move), { fetch });
        return;
      }
      const file = await getFile(from, { fetch });
      await overwriteFile(to, file, { contentType: contentType || file.type, fetch });
    },

    async fingerprint(url) {
      const response = await head(url);
      const tag = response.headers.get("ETag") ?? response.headers.get("Last-Modified");
      if (tag !== null) return tag;
      const body = await (await fetch(url)).arrayBuffer();
      const digest = await crypto.subtle.digest("SHA-256", body);
      return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
    },

    deleteRecursively: (url) => deleteContainerRecursively(url, fetch),
  };
}
