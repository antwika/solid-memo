import {
  buildThing,
  createSolidDataset,
  createThing,
  deleteContainer,
  deleteFile,
  deleteSolidDataset,
  getContainedResourceUrlAll,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import type { InstanceRepository } from "../../application/ports";
import type { Instance } from "../../domain/instance";
import { getSolidDatasetOrNull } from "./datasets";
import { toInstance } from "./mappers/instanceMapper";
import {
  addInstanceRegistration,
  ensureTypeIndex,
  locateTypeIndexes,
  readInstanceRegistrations,
  removeInstanceRegistrations,
  type InstanceRegistration,
} from "./typeIndex";
import { ensureTrailingSlash, lastPathSegment } from "./urls";
import { DCTERMS, RDF, SM } from "./vocab";

const FORMAT_VERSION = 1;

export interface SolidInstanceRepositoryDeps {
  fetch: typeof globalThis.fetch;
  now: () => Date;
  randomId: () => string;
}

export function createSolidInstanceRepository({
  fetch,
  now,
  randomId,
}: SolidInstanceRepositoryDeps): InstanceRepository {
  return {
    async listInstances(webId): Promise<Instance[]> {
      const locations = await locateTypeIndexes(webId, fetch);
      const byUrl = new Map<string, InstanceRegistration>();
      for (const indexUrl of [
        locations.privateIndexUrl,
        locations.publicIndexUrl,
      ]) {
        if (indexUrl === null) continue;
        for (const registration of await readRegistrationsSafely(
          indexUrl,
          fetch,
        )) {
          const url = ensureTrailingSlash(registration.containerUrl);
          if (!byUrl.has(url)) byUrl.set(url, registration);
        }
      }
      return [...byUrl.values()].map(toInstance);
    },

    async getRegistrationOptions(webId) {
      const locations = await locateTypeIndexes(webId, fetch);
      return {
        privateIndexExists: locations.privateIndexUrl !== null,
        publicIndexExists: locations.publicIndexUrl !== null,
      };
    },

    async createInstance({ webId, containerUrl, name, registrationTarget }) {
      const url = ensureTrailingSlash(containerUrl);
      const metaUrl = `${url}meta.ttl`;
      await saveMetaDocument(metaUrl, name, now(), fetch);
      try {
        const indexUrl = await ensureTypeIndex(
          registrationTarget,
          webId,
          url,
          fetch,
        );
        await addInstanceRegistration(
          indexUrl,
          { id: `sm-inst-${randomId()}`, containerUrl: url, title: name },
          fetch,
        );
      } catch (error) {
        await bestEffortCleanup(metaUrl, url, fetch);
        throw error;
      }
      return { url, name };
    },

    async attachInstance({ webId, instanceUrl, registrationTarget }) {
      const url = ensureTrailingSlash(instanceUrl);
      const name = await readInstanceName(url, fetch);
      const indexUrl = await ensureTypeIndex(
        registrationTarget,
        webId,
        url,
        fetch,
      );
      const registrations = await readInstanceRegistrations(indexUrl, fetch);
      const alreadyRegistered = registrations.some(
        (registration) =>
          ensureTrailingSlash(registration.containerUrl) === url,
      );
      if (!alreadyRegistered) {
        await addInstanceRegistration(
          indexUrl,
          { id: `sm-inst-${randomId()}`, containerUrl: url, title: name },
          fetch,
        );
      }
      return { url, name };
    },

    async deleteInstance({ webId, instance }) {
      const url = ensureTrailingSlash(instance.url);
      await deleteContainerRecursively(url, fetch);
      const locations = await locateTypeIndexes(webId, fetch);
      for (const indexUrl of [
        locations.privateIndexUrl,
        locations.publicIndexUrl,
      ]) {
        if (indexUrl === null) continue;
        await removeInstanceRegistrations(indexUrl, url, fetch);
      }
    },
  };
}

/**
 * Delete a container and everything below it. Solid only deletes empty
 * containers, so children go first; the instance's meta.ttl goes last so
 * a partly deleted instance still attaches by URL. A container that is
 * already gone counts as deleted.
 */
async function deleteContainerRecursively(
  containerUrl: string,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  const container = await getSolidDatasetOrNull(containerUrl, fetch);
  if (container === null) return;
  const children = getContainedResourceUrlAll(container).sort(
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

async function readRegistrationsSafely(
  indexUrl: string,
  fetch: typeof globalThis.fetch,
): Promise<InstanceRegistration[]> {
  try {
    return await readInstanceRegistrations(indexUrl, fetch);
  } catch {
    return [];
  }
}

async function saveMetaDocument(
  metaUrl: string,
  name: string,
  createdAt: Date,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  const meta = setThing(
    createSolidDataset(),
    buildThing(createThing({ url: `${metaUrl}#it` }))
      .addIri(RDF.type, SM.Instance)
      .addStringNoLocale(DCTERMS.title, name)
      .addDatetime(DCTERMS.created, createdAt)
      .addInteger(SM.formatVersion, FORMAT_VERSION)
      .build(),
  );
  await saveSolidDatasetAt(metaUrl, meta, { fetch });
}

async function readInstanceName(
  instanceUrl: string,
  fetch: typeof globalThis.fetch,
): Promise<string> {
  const metaUrl = `${instanceUrl}meta.ttl`;
  let dataset;
  try {
    dataset = await getSolidDataset(metaUrl, { fetch });
  } catch {
    throw new Error(
      `<${instanceUrl}> is not a Solid Memo instance (no readable meta.ttl).`,
    );
  }
  const meta = getThing(dataset, `${metaUrl}#it`);
  if (meta === null) {
    throw new Error(
      `<${instanceUrl}> is not a Solid Memo instance (meta.ttl has no #it subject).`,
    );
  }
  return getStringNoLocale(meta, DCTERMS.title) ?? lastPathSegment(instanceUrl);
}

async function bestEffortCleanup(
  metaUrl: string,
  containerUrl: string,
  fetch: typeof globalThis.fetch,
): Promise<void> {
  try {
    await deleteSolidDataset(metaUrl, { fetch });
    await deleteContainer(containerUrl, { fetch });
  } catch {
  }
}
