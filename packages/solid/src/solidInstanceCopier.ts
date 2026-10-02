import {
  createContainerAt,
  fromRdfJsDataset,
  getFile,
  getSolidDataset,
  overwriteFile,
  toRdfJsDataset,
} from "@inrupt/solid-client";
import type { ContainerMove, InstanceCopier } from "@solid-memo/application/ports";
import { rebaseIri } from "@solid-memo/domain/instanceUpdate";
import { deleteContainerRecursively, listContainerTree } from "./containers";
import { getSolidDatasetOrNull, PreconditionFailedError, saveDataset } from "./datasets";
import { AppError } from "@solid-memo/domain/appError";

type Fetch = typeof globalThis.fetch;

/**
 * What a copy was made from, for asking the pod later whether the
 * resource is still that: the request's Accept (an ETag is a property of
 * one representation), and the response's ETag, else its Last-Modified,
 * else a hash of its body.
 */
interface Version {
  accept?: string;
  etag?: string;
  lastModified?: string;
  sha256?: string;
}

async function sha256(body: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", body);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** A fetch that remembers the version of the response it last got. */
function versionRecorder(fetch: Fetch) {
  let version: Version = {};
  return {
    fetch: (async (input, init) => {
      const response = await fetch(input, init);
      const accept = new Headers(init?.headers).get("Accept") ?? undefined;
      const etag = response.headers.get("ETag") ?? undefined;
      const lastModified = response.headers.get("Last-Modified") ?? undefined;
      version = { accept, etag, lastModified };
      if (etag === undefined && lastModified === undefined) {
        version.sha256 = await sha256(await response.clone().arrayBuffer());
      }
      return response;
    }) as Fetch,
    version: () => JSON.stringify(version),
  };
}

/** The fetch, with `If-None-Match: *` on its writes: a copy never overwrites anything. */
function createOnly(fetch: Fetch): Fetch {
  return (input, init) => {
    if ((init?.method ?? "GET").toUpperCase() !== "PUT") return fetch(input, init);
    const headers = new Headers(init?.headers);
    headers.set("If-None-Match", "*");
    return fetch(input, { ...init, headers });
  };
}

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
      throw response.ok
        ? new AppError("alreadyExists", { url })
        : new AppError("cannotCheck", { url, status: response.status });
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
        throw new AppError("accessControlUnknown", { url: to });
      }
      await saveDataset(targetAcl, await rebasedDataset(acl, move), fetch);
      return true;
    },

    async copyResource(from, to, move) {
      const source = versionRecorder(fetch);
      if (from.endsWith("/")) {
        // A container's version: what it lists, which the update compares on its own too.
        await source.fetch(from, { method: "HEAD", headers: { Accept: "text/turtle" } });
        await createContainerAt(to, { fetch });
        return source.version();
      }
      const contentType = (await head(from)).headers.get("Content-Type") ?? "";
      if (contentType.startsWith("text/turtle")) {
        const dataset = await getSolidDataset(from, { fetch: source.fetch });
        await saveDataset(to, await rebasedDataset(dataset, move), fetch);
        return source.version();
      }
      const file = await getFile(from, { fetch: source.fetch });
      try {
        await overwriteFile(to, file, { contentType: contentType || file.type, fetch: createOnly(fetch) });
      } catch (error) {
        if ((error as { statusCode?: number }).statusCode === 412) throw new PreconditionFailedError(to, "absent");
        throw error;
      }
      return source.version();
    },

    async isUnchanged(url, version) {
      const { accept, etag, lastModified, sha256: hash } = JSON.parse(version) as Version;
      const headers = new Headers(accept === undefined ? {} : { Accept: accept });
      if (etag !== undefined) headers.set("If-None-Match", etag);
      else if (lastModified !== undefined) headers.set("If-Modified-Since", lastModified);
      else {
        const response = await fetch(url, { headers });
        return response.ok && (await sha256(await response.arrayBuffer())) === hash;
      }
      const response = await fetch(url, { method: "HEAD", headers });
      if (response.status === 304) return true;
      // A pod that ignores the condition still says what it has now.
      if (!response.ok) return false;
      return etag !== undefined
        ? response.headers.get("ETag") === etag
        : response.headers.get("Last-Modified") === lastModified;
    },

    deleteRecursively: (url) => deleteContainerRecursively(url, fetch),
  };
}
