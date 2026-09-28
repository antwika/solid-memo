import {
  deleteContainer,
  deleteFile,
  getContainedResourceUrlAll,
} from "@inrupt/solid-client";
import { getSolidDatasetOrNull } from "./datasets";

/**
 * Containers as trees of resources: listing everything below one, and
 * deleting it. Solid lists a container's direct children only and
 * deletes only empty containers, so both walk the tree. Both follow only
 * children whose URL lies below the container, so a strange listing can
 * never lead them (or a copy or a delete) outside it.
 */

/** Every resource below a container, depth first; containers end with a slash. None when it is gone. */
export async function listContainerTree(
  containerUrl: string,
  fetch: typeof globalThis.fetch,
): Promise<string[]> {
  const container = await getSolidDatasetOrNull(containerUrl, fetch);
  if (container === null) return [];
  const resources: string[] = [];
  const below = getContainedResourceUrlAll(container).filter(
    (child) => child.startsWith(containerUrl) && child !== containerUrl,
  );
  for (const child of below.sort()) {
    resources.push(child);
    if (child.endsWith("/")) resources.push(...(await listContainerTree(child, fetch)));
  }
  return resources;
}

/**
 * Delete a container and everything below it: children first, an
 * instance's meta.ttl last, so a partly deleted instance still attaches
 * by URL. A container that is already gone counts as deleted.
 */
export async function deleteContainerRecursively(
  containerUrl: string,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  const container = await getSolidDatasetOrNull(containerUrl, fetch);
  if (container === null) return;
  // Only what lies below the container: a listing naming anything else is not followed.
  const children = getContainedResourceUrlAll(container)
    .filter((child) => child.startsWith(containerUrl) && child !== containerUrl)
    .sort(
    (a, b) => Number(isMetaDocument(a)) - Number(isMetaDocument(b)),
  );
  for (const child of children) {
    if (child.endsWith("/")) {
      await deleteContainerRecursively(child, fetch);
    } else {
      await deleteFile(child, { fetch });
    }
  }
  await deleteContainer(containerUrl, { fetch });
}

function isMetaDocument(url: string): boolean {
  return url.endsWith("/meta.ttl");
}
