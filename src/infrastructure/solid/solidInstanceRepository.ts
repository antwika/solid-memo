import {
  buildThing,
  createSolidDataset,
  createThing,
  deleteContainer,
  deleteSolidDataset,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import type { InstanceRepository } from "../../application/ports";
import type { Instance } from "../../domain/instance";
import { toInstance } from "./mappers/instanceMapper";
import {
  addInstanceRegistration,
  ensureTypeIndex,
  locateTypeIndexes,
  readInstanceRegistrations,
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
        // Fail loudly, but do not leave an unregistered orphan behind.
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
  };
}

async function readRegistrationsSafely(
  indexUrl: string,
  fetch: typeof globalThis.fetch,
): Promise<InstanceRegistration[]> {
  try {
    return await readInstanceRegistrations(indexUrl, fetch);
  } catch {
    // A dangling or unreadable index link must not break the listing.
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
    // Cleanup is best-effort; the original error is what matters.
  }
}
