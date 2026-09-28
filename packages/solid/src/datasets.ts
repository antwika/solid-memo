import {
  deleteSolidDataset,
  getSolidDataset,
  saveSolidDatasetAt,
  type SolidDataset,
  type WithServerResourceInfo,
} from "@inrupt/solid-client";

type Dataset = Awaited<ReturnType<typeof getSolidDataset>>;

/**
 * Reading and writing pod documents with HTTP preconditions, so that a
 * write never silently undoes someone else's (docs/data-model.md#write-discipline):
 *
 * - every read remembers the document's ETag, with the dataset it returned
 *   (keyed by its resource info, which edits of the dataset keep);
 * - saving an edit of a dataset read from the same URL sends
 *   `If-Match: <that ETag>`: had the document changed since, the pod
 *   answers 412 and nothing is written;
 * - saving a new dataset is a creation, which @inrupt/solid-client sends
 *   with `If-None-Match: *`: had the document appeared meanwhile, 412;
 * - deleting a document read before sends `If-Match` too.
 *
 * A 412 becomes a PreconditionFailedError naming the document. Weak
 * ETags (`W/"…"`) are never sent in `If-Match`, where the comparison is
 * strong and would always fail; a document without an ETag, or one saved
 * since it was read (pods need not return the new ETag), is written
 * without `If-Match`.
 */
const ETAGS = new WeakMap<object, string>();

/** The pod refused a write because the document is not as Solid Memo last saw it. */
export class PreconditionFailedError extends Error {
  constructor(
    readonly url: string,
    readonly expected: "unchanged" | "absent",
  ) {
    super(
      expected === "unchanged"
        ? `${url} was changed elsewhere (in another tab or app?) since Solid Memo read it, so nothing was saved. Reload and try again.`
        : `${url} was created elsewhere (in another tab or app?) while Solid Memo was about to create it, so nothing was saved. Reload and try again.`,
    );
    this.name = "PreconditionFailedError";
  }
}

/** Fetch a dataset, remembering its ETag for a later conditional write. */
export async function readDataset(url: string, fetch: typeof globalThis.fetch): Promise<Dataset> {
  let etag: string | null = null;
  const dataset = await getSolidDataset(url, {
    fetch: async (input, init) => {
      const response = await fetch(input, init);
      etag = response.headers.get("ETag");
      return response;
    },
  });
  const info = resourceInfoOf(dataset);
  if (etag !== null && info !== undefined) ETAGS.set(info, etag);
  return dataset;
}

/**
 * Fetch a dataset, treating 404 as null — not-yet-created documents are a
 * normal state in this app. Any other failure still throws.
 */
export async function getSolidDatasetOrNull(
  url: string,
  fetch: typeof globalThis.fetch,
): Promise<Dataset | null> {
  try {
    return await readDataset(url, fetch);
  } catch (error) {
    if (statusOf(error) === 404) return null;
    throw error;
  }
}

/**
 * Save a dataset: an edit of the document it was read from only if that
 * is unchanged (If-Match), a new dataset only if nothing is there yet
 * (If-None-Match: *, sent by @inrupt/solid-client).
 */
export async function saveDataset<T extends SolidDataset>(
  url: string,
  dataset: T,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  const info = resourceInfoOf(dataset);
  const isEdit = info !== undefined && info.sourceIri === url;
  const etag = isEdit ? strong(ETAGS.get(info)) : undefined;
  try {
    await saveSolidDatasetAt(url, dataset, { fetch: withIfMatch(fetch, etag) });
  } catch (error) {
    if (statusOf(error) === 412) throw new PreconditionFailedError(url, isEdit ? "unchanged" : "absent");
    throw error;
  }
  // The pod need not say the new ETag; a later write reads again.
  if (info !== undefined) ETAGS.delete(info);
}

/** Delete a document read before, only if it is unchanged since (If-Match). */
export async function deleteDataset(
  url: string,
  dataset: SolidDataset,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  const info = resourceInfoOf(dataset);
  const etag = info !== undefined && info.sourceIri === url ? strong(ETAGS.get(info)) : undefined;
  try {
    await deleteSolidDataset(url, { fetch: withIfMatch(fetch, etag) });
  } catch (error) {
    if (statusOf(error) === 412) throw new PreconditionFailedError(url, "unchanged");
    throw error;
  }
}

/** The fetch, with `If-Match` added to the request that writes (the only one @inrupt/solid-client makes for it). */
function withIfMatch(fetch: typeof globalThis.fetch, etag: string | undefined): typeof globalThis.fetch {
  if (etag === undefined) return fetch;
  return (input, init) => {
    const headers = new Headers(init?.headers);
    headers.set("If-Match", etag);
    return fetch(input, { ...init, headers });
  };
}

function strong(etag: string | undefined): string | undefined {
  return etag === undefined || etag.startsWith("W/") ? undefined : etag;
}

function resourceInfoOf(dataset: object): WithServerResourceInfo["internal_resourceInfo"] | undefined {
  return (dataset as Partial<WithServerResourceInfo>).internal_resourceInfo;
}

function statusOf(error: unknown): number | undefined {
  const candidate = error as { statusCode?: number; response?: { status?: number } };
  return candidate.statusCode ?? candidate.response?.status;
}
