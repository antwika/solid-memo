import { getPodUrlAll } from "@inrupt/solid-client";
import type { StorageGateway } from "../../application/ports";
import type { Storage } from "../../domain/storage";
import { ensureTrailingSlash } from "./urls";

const PIM_STORAGE_TYPE = "http://www.w3.org/ns/pim/space#Storage";

export interface SolidStorageGatewayDeps {
  fetch: typeof globalThis.fetch;
}

export function createSolidStorageGateway({
  fetch,
}: SolidStorageGatewayDeps): StorageGateway {
  return {
    async discoverStorages(webId): Promise<Storage[]> {
      const fromProfile = await getPodUrlAll(webId, { fetch });
      if (fromProfile.length > 0) {
        return fromProfile.map((url) => ({ url, source: "profile" }));
      }
      const fromLinkHeader = await walkUpToStorage(webId, fetch);
      if (fromLinkHeader !== null) {
        return [{ url: fromLinkHeader, source: "linkHeader" }];
      }
      return [];
    },

    async probeStorage(url): Promise<Storage> {
      const normalized = ensureTrailingSlash(url);
      const response = await fetch(normalized, { method: "HEAD" });
      if (!response.ok) {
        throw new Error(
          `Cannot access <${normalized}> (HTTP ${response.status}).`,
        );
      }
      return { url: normalized, source: "manual" };
    },
  };
}

/**
 * Candidate URLs for the Solid Protocol storage walk-up: the WebID document
 * itself, then each ancestor container up to the origin root.
 */
export function candidateStorageUrls(webId: string): string[] {
  const url = new URL(webId);
  url.hash = "";
  url.search = "";
  const segments = url.pathname.split("/").filter((s) => s.length > 0);
  const candidates = [url.toString()];
  for (let depth = segments.length - 1; depth >= 0; depth--) {
    const path = segments
      .slice(0, depth)
      .map((segment) => `${segment}/`)
      .join("");
    candidates.push(`${url.origin}/${path}`);
  }
  return candidates;
}

/**
 * True when a Link header advertises the resource as a pim:Storage
 * (rel="type" targeting http://www.w3.org/ns/pim/space#Storage — note the
 * capital-S class, distinct from the lowercase pim:storage predicate).
 */
export function hasStorageLink(linkHeader: string | null): boolean {
  if (linkHeader === null) {
    return false;
  }
  return linkHeader
    .split(",")
    .some(
      (link) =>
        link.includes(`<${PIM_STORAGE_TYPE}>`) &&
        /rel="?type"?/.test(link),
    );
}

async function walkUpToStorage(
  webId: string,
  fetch: typeof globalThis.fetch,
): Promise<string | null> {
  for (const candidate of candidateStorageUrls(webId)) {
    let linkHeader: string | null;
    try {
      const response = await fetch(candidate, { method: "HEAD" });
      linkHeader = response.headers.get("Link");
    } catch {
      continue;
    }
    if (hasStorageLink(linkHeader)) {
      return candidate;
    }
  }
  return null;
}
