import {
  buildThing,
  createSolidDataset,
  createThing,
  getSolidDataset,
  getSourceUrl,
  getStringNoLocale,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { DCTERMS, PIM, RDF, SM, SOLID } from "./vocab";
import {
  candidateStorageUrls,
  hasStorageLink,
} from "./solidStorageGateway";

type Fetch = typeof globalThis.fetch;
export type TypeIndexKind = "private" | "public";

export interface TypeIndexLocations {
  privateIndexUrl: string | null;
  publicIndexUrl: string | null;
}

/**
 * Locate both type indexes for a WebID. The public index is linked from
 * the profile; the private index is linked from the profile directly
 * (common in the wild) or from the pim:preferencesFile (per spec) —
 * both places are checked.
 */
export async function locateTypeIndexes(
  webId: string,
  fetch: Fetch,
): Promise<TypeIndexLocations> {
  const profileDataset = await getSolidDataset(webId, { fetch });
  const profile = getThing(profileDataset, webId);
  if (profile === null) {
    return { privateIndexUrl: null, publicIndexUrl: null };
  }

  const publicIndexUrl = getUrl(profile, SOLID.publicTypeIndex);
  let privateIndexUrl = getUrl(profile, SOLID.privateTypeIndex);

  if (privateIndexUrl === null) {
    const preferencesFileUrl = getUrl(profile, PIM.preferencesFile);
    if (preferencesFileUrl !== null) {
      privateIndexUrl = await readPrivateIndexFromPreferences(
        preferencesFileUrl,
        webId,
        fetch,
      );
    }
  }

  return { privateIndexUrl, publicIndexUrl };
}

async function readPrivateIndexFromPreferences(
  preferencesFileUrl: string,
  webId: string,
  fetch: Fetch,
): Promise<string | null> {
  try {
    const dataset = await getSolidDataset(preferencesFileUrl, { fetch });
    const subject = getThing(dataset, webId);
    return subject === null ? null : getUrl(subject, SOLID.privateTypeIndex);
  } catch {
    // Preferences file unreadable: treat as no private index.
    return null;
  }
}

/**
 * Create a type index document under <storage>settings/ and link it from
 * the profile. Throws if either write fails.
 */
export async function createTypeIndex(
  kind: TypeIndexKind,
  webId: string,
  nearUrl: string,
  fetch: Fetch,
): Promise<string> {
  const storageRoot = await findStorageRoot(nearUrl, fetch);
  const indexUrl = `${storageRoot}settings/${kind}TypeIndex.ttl`;

  const indexDocument = setThing(
    createSolidDataset(),
    buildThing(createThing({ url: indexUrl }))
      .addIri(RDF.type, SOLID.TypeIndex)
      .addIri(
        RDF.type,
        kind === "public" ? SOLID.ListedDocument : SOLID.UnlistedDocument,
      )
      .build(),
  );
  await saveSolidDatasetAt(indexUrl, indexDocument, { fetch });
  await linkTypeIndexFromProfile(kind, webId, indexUrl, fetch);
  return indexUrl;
}

async function linkTypeIndexFromProfile(
  kind: TypeIndexKind,
  webId: string,
  indexUrl: string,
  fetch: Fetch,
): Promise<void> {
  const profileDataset = await getSolidDataset(webId, { fetch });
  const profile = getThing(profileDataset, webId);
  if (profile === null) {
    throw new Error(`No subject <${webId}> found in the profile document.`);
  }
  const predicate =
    kind === "public" ? SOLID.publicTypeIndex : SOLID.privateTypeIndex;
  const updated = setThing(
    profileDataset,
    buildThing(profile).addIri(predicate, indexUrl).build(),
  );
  await saveSolidDatasetAt(getSourceUrl(profileDataset), updated, { fetch });
}

/** Find the target index, creating it (and its profile link) if missing. */
export async function ensureTypeIndex(
  kind: TypeIndexKind,
  webId: string,
  nearUrl: string,
  fetch: Fetch,
): Promise<string> {
  const locations = await locateTypeIndexes(webId, fetch);
  const existing =
    kind === "public" ? locations.publicIndexUrl : locations.privateIndexUrl;
  return existing ?? createTypeIndex(kind, webId, nearUrl, fetch);
}

export interface InstanceRegistration {
  containerUrl: string;
  title: string | null;
}

/** All sm:Instance registrations in a type index document. */
export async function readInstanceRegistrations(
  indexUrl: string,
  fetch: Fetch,
): Promise<InstanceRegistration[]> {
  const dataset = await getSolidDataset(indexUrl, { fetch });
  const registrations: InstanceRegistration[] = [];
  for (const thing of getThingAll(dataset)) {
    const types = getUrlAll(thing, RDF.type);
    if (!types.includes(SOLID.TypeRegistration)) continue;
    if (!getUrlAll(thing, SOLID.forClass).includes(SM.Instance)) continue;
    // Accept both spellings seen in the wild.
    const containerUrl =
      getUrl(thing, SOLID.instanceContainer) ?? getUrl(thing, SOLID.instance);
    if (containerUrl === null) continue;
    registrations.push({
      containerUrl,
      title: getStringNoLocale(thing, DCTERMS.title),
    });
  }
  return registrations;
}

/** Add one sm:Instance registration to a type index document. */
export async function addInstanceRegistration(
  indexUrl: string,
  registration: { id: string; containerUrl: string; title: string },
  fetch: Fetch,
): Promise<void> {
  const dataset = await getSolidDataset(indexUrl, { fetch });
  const updated = setThing(
    dataset,
    buildThing(createThing({ url: `${indexUrl}#${registration.id}` }))
      .addIri(RDF.type, SOLID.TypeRegistration)
      .addIri(SOLID.forClass, SM.Instance)
      .addIri(SOLID.instanceContainer, registration.containerUrl)
      .addStringNoLocale(DCTERMS.title, registration.title)
      .build(),
  );
  await saveSolidDatasetAt(indexUrl, updated, { fetch });
}

/**
 * Storage root for a resource per the Solid Protocol Link-header walk-up,
 * falling back to the origin root when no candidate advertises one.
 */
async function findStorageRoot(
  resourceUrl: string,
  fetch: Fetch,
): Promise<string> {
  const candidates = candidateStorageUrls(resourceUrl);
  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, { method: "HEAD" });
      if (hasStorageLink(response.headers.get("Link"))) {
        return candidate;
      }
    } catch {
      continue;
    }
  }
  return new URL("/", resourceUrl).toString();
}
