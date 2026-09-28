import { getSolidDataset } from "@inrupt/solid-client";

type Dataset = Awaited<ReturnType<typeof getSolidDataset>>;

/**
 * Fetch a dataset, treating 404 as null — not-yet-created documents are a
 * normal state in this app. Any other failure still throws.
 */
export async function getSolidDatasetOrNull(
  url: string,
  fetch: typeof globalThis.fetch,
): Promise<Dataset | null> {
  try {
    return await getSolidDataset(url, { fetch });
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

function isNotFound(error: unknown): boolean {
  const candidate = error as {
    statusCode?: number;
    response?: { status?: number };
  };
  return candidate.statusCode === 404 || candidate.response?.status === 404;
}
