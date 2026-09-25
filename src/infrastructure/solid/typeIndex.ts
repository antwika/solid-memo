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
  removeThing,
  saveSolidDatasetAt,
  setThing,
  type SolidDataset,
  type Thing,
  type WithResourceInfo,
} from "@inrupt/solid-client";
import { getSolidDatasetOrNull } from "./datasets";
import { ensureTrailingSlash } from "./urls";
import { DCTERMS, FOAF, PIM, RDF, RDFS, SM, SOLID } from "./vocab";
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
 * Locate both type indexes for a WebID. Links are looked up on the WebID
 * subject in the WebID document and in any extended profile documents
 * (rdfs:seeAlso / foaf:isPrimaryTopicOf — e.g. Inrupt PodSpaces keeps a
 * read-only WebID document and a writable profile in the pod). The
 * private index is additionally looked up in the pim:preferencesFile
 * (per spec).
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

  let publicIndexUrl = getUrl(profile, SOLID.publicTypeIndex);
  let privateIndexUrl = getUrl(profile, SOLID.privateTypeIndex);

  for (const extendedProfileUrl of extendedProfileUrls(
    profile,
    profileDataset,
  )) {
    if (publicIndexUrl !== null && privateIndexUrl !== null) break;
    const subject = await readSubjectSafely(extendedProfileUrl, webId, fetch);
    if (subject === null) continue;
    publicIndexUrl ??= getUrl(subject, SOLID.publicTypeIndex);
    privateIndexUrl ??= getUrl(subject, SOLID.privateTypeIndex);
  }

  if (privateIndexUrl === null) {
    const preferencesFileUrl = getUrl(profile, PIM.preferencesFile);
    if (preferencesFileUrl !== null) {
      const subject = await readSubjectSafely(
        preferencesFileUrl,
        webId,
        fetch,
      );
      privateIndexUrl =
        subject === null ? null : getUrl(subject, SOLID.privateTypeIndex);
    }
  }

  return { privateIndexUrl, publicIndexUrl };
}

/**
 * Extended profile documents linked from the WebID subject, deduplicated
 * and excluding the WebID document itself (which is commonly its own
 * foaf:isPrimaryTopicOf).
 */
function extendedProfileUrls(
  profile: Thing,
  profileDataset: SolidDataset & WithResourceInfo,
): string[] {
  const self = new Set([
    stripFragment(profile.url),
    stripFragment(getSourceUrl(profileDataset)),
  ]);
  const urls = [
    ...getUrlAll(profile, RDFS.seeAlso),
    ...getUrlAll(profile, FOAF.isPrimaryTopicOf),
  ].map(stripFragment);
  return [...new Set(urls)].filter((url) => !self.has(url));
}

function stripFragment(url: string): string {
  return url.split("#")[0];
}

/** The WebID subject in a document, or null if unreadable or absent. */
async function readSubjectSafely(
  documentUrl: string,
  webId: string,
  fetch: Fetch,
): Promise<Thing | null> {
  try {
    const dataset = await getSolidDataset(documentUrl, { fetch });
    return getThing(dataset, webId);
  } catch {
    return null;
  }
}

/**
 * Create a type index document under <storage>settings/ and link it from
 * the profile. An index document already at that URL (e.g. left behind
 * by an earlier run whose profile link failed) is adopted as-is rather
 * than overwritten. Throws if either write fails.
 */
export async function createTypeIndex(
  kind: TypeIndexKind,
  webId: string,
  nearUrl: string,
  fetch: Fetch,
): Promise<string> {
  const storageRoot = await findStorageRoot(nearUrl, fetch);
  const indexUrl = `${storageRoot}settings/${kind}TypeIndex.ttl`;

  const existing = await getSolidDatasetOrNull(indexUrl, fetch);
  if (existing === null) {
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
  }
  await linkTypeIndexFromProfile(kind, webId, indexUrl, fetch);
  return indexUrl;
}

/**
 * Add the type index link to the WebID subject. The WebID document is
 * tried first; when it is not writable (e.g. Inrupt PodSpaces, whose
 * WebID documents live on a read-only identity broker) the extended
 * profile documents are tried in turn. Throws if no candidate accepts
 * the write.
 */
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

  const failures: string[] = [];
  try {
    const updated = setThing(
      profileDataset,
      buildThing(profile).addIri(predicate, indexUrl).build(),
    );
    await saveSolidDatasetAt(getSourceUrl(profileDataset), updated, {
      fetch,
    });
    return;
  } catch (error) {
    failures.push(describeFailure(getSourceUrl(profileDataset), error));
  }

  for (const documentUrl of extendedProfileUrls(profile, profileDataset)) {
    try {
      const dataset = await getSolidDataset(documentUrl, { fetch });
      const subject =
        getThing(dataset, webId) ?? createThing({ url: webId });
      const updated = setThing(
        dataset,
        buildThing(subject).addIri(predicate, indexUrl).build(),
      );
      await saveSolidDatasetAt(documentUrl, updated, { fetch });
      return;
    } catch (error) {
      failures.push(describeFailure(documentUrl, error));
    }
  }

  throw new Error(
    `Could not link the ${kind} type index <${indexUrl}> from any profile document:\n` +
    failures.map((failure) => `- ${failure}`).join("\n"),
  );
}

function describeFailure(documentUrl: string, error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return `<${documentUrl}>: ${message}`;
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
 * Remove every sm:Instance registration for a container from a type index
 * document. Matching ignores a missing trailing slash, as reading does.
 * Saves only when something was removed.
 */
export async function removeInstanceRegistrations(
  indexUrl: string,
  containerUrl: string,
  fetch: Fetch,
): Promise<void> {
  const dataset = await getSolidDataset(indexUrl, { fetch });
  const target = ensureTrailingSlash(containerUrl);
  let updated = dataset;
  for (const thing of getThingAll(dataset)) {
    if (!getUrlAll(thing, RDF.type).includes(SOLID.TypeRegistration)) continue;
    if (!getUrlAll(thing, SOLID.forClass).includes(SM.Instance)) continue;
    const registered = [
      ...getUrlAll(thing, SOLID.instanceContainer),
      ...getUrlAll(thing, SOLID.instance),
    ].map(ensureTrailingSlash);
    if (registered.includes(target)) {
      updated = removeThing(updated, thing);
    }
  }
  if (updated !== dataset) {
    await saveSolidDatasetAt(indexUrl, updated, { fetch });
  }
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
