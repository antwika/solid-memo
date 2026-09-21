import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildThing,
  createThing,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll,
  mockSolidDatasetFrom,
  saveSolidDatasetAt,
  setThing,
  type SolidDataset,
  type ThingBuilder,
  type ThingPersisted,
} from "@inrupt/solid-client";
import {
  addInstanceRegistration,
  createTypeIndex,
  ensureTypeIndex,
  locateTypeIndexes,
  readInstanceRegistrations,
} from "./typeIndex";
import { DCTERMS, PIM, RDF, SM, SOLID } from "./vocab";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@inrupt/solid-client")>();
  return {
    ...actual,
    getSolidDataset: vi.fn(),
    saveSolidDatasetAt: vi.fn(),
  };
});

const WEBID = "https://alice.example/profile/card#me";
const PROFILE_DOC = "https://alice.example/profile/card";
const PRIVATE_INDEX = "https://alice.example/settings/privateTypeIndex.ttl";
const PUBLIC_INDEX = "https://alice.example/settings/publicTypeIndex.ttl";
const PREFERENCES_FILE = "https://alice.example/settings/prefs.ttl";

const noFetch = vi.fn() as unknown as typeof globalThis.fetch;

function profileDataset(
  build: (
    thing: ThingBuilder<ThingPersisted>,
  ) => ThingBuilder<ThingPersisted> = (t) => t,
): SolidDataset {
  return setThing(
    mockSolidDatasetFrom(PROFILE_DOC),
    build(buildThing(createThing({ url: WEBID }))).build(),
  );
}

/** Route getSolidDataset calls by URL. */
function mockDatasets(datasets: Record<string, SolidDataset>) {
  vi.mocked(getSolidDataset).mockImplementation((async (url: string) => {
    const dataset = datasets[url];
    if (dataset === undefined) throw new Error(`404 ${url}`);
    return dataset;
  }) as never);
}

beforeEach(() => {
  vi.mocked(getSolidDataset).mockReset();
  vi.mocked(saveSolidDatasetAt).mockReset();
  vi.mocked(saveSolidDatasetAt).mockImplementation(async (_url, dataset) => {
    return dataset as never;
  });
});

describe("locateTypeIndexes", () => {
  it("finds both indexes linked directly from the profile", async () => {
    mockDatasets({
      [WEBID]: profileDataset((t) =>
        t
          .addIri(SOLID.privateTypeIndex, PRIVATE_INDEX)
          .addIri(SOLID.publicTypeIndex, PUBLIC_INDEX),
      ),
    });
    await expect(locateTypeIndexes(WEBID, noFetch)).resolves.toEqual({
      privateIndexUrl: PRIVATE_INDEX,
      publicIndexUrl: PUBLIC_INDEX,
    });
  });

  it("returns nulls when the profile has no WebID subject", async () => {
    mockDatasets({ [WEBID]: mockSolidDatasetFrom(PROFILE_DOC) });
    await expect(locateTypeIndexes(WEBID, noFetch)).resolves.toEqual({
      privateIndexUrl: null,
      publicIndexUrl: null,
    });
  });

  it("follows the preferences file to the private index", async () => {
    mockDatasets({
      [WEBID]: profileDataset((t) =>
        t.addIri(PIM.preferencesFile, PREFERENCES_FILE),
      ),
      [PREFERENCES_FILE]: setThing(
        mockSolidDatasetFrom(PREFERENCES_FILE),
        buildThing(createThing({ url: WEBID }))
          .addIri(SOLID.privateTypeIndex, PRIVATE_INDEX)
          .build(),
      ),
    });
    await expect(locateTypeIndexes(WEBID, noFetch)).resolves.toEqual({
      privateIndexUrl: PRIVATE_INDEX,
      publicIndexUrl: null,
    });
  });

  it("treats an unreadable preferences file as no private index", async () => {
    mockDatasets({
      [WEBID]: profileDataset((t) =>
        t.addIri(PIM.preferencesFile, PREFERENCES_FILE),
      ),
    });
    await expect(locateTypeIndexes(WEBID, noFetch)).resolves.toEqual({
      privateIndexUrl: null,
      publicIndexUrl: null,
    });
  });

  it("treats a preferences file without the WebID subject as no private index", async () => {
    mockDatasets({
      [WEBID]: profileDataset((t) =>
        t.addIri(PIM.preferencesFile, PREFERENCES_FILE),
      ),
      [PREFERENCES_FILE]: mockSolidDatasetFrom(PREFERENCES_FILE),
    });
    await expect(locateTypeIndexes(WEBID, noFetch)).resolves.toEqual({
      privateIndexUrl: null,
      publicIndexUrl: null,
    });
  });

  it("returns null private index when the profile links nothing", async () => {
    mockDatasets({ [WEBID]: profileDataset() });
    await expect(locateTypeIndexes(WEBID, noFetch)).resolves.toEqual({
      privateIndexUrl: null,
      publicIndexUrl: null,
    });
  });
});

describe("createTypeIndex", () => {
  function storageAwareFetch(storageRoot: string): typeof globalThis.fetch {
    return vi.fn(async (input: RequestInfo | URL) => {
      const headers = new Headers();
      if (String(input) === storageRoot) {
        headers.set(
          "Link",
          '<http://www.w3.org/ns/pim/space#Storage>; rel="type"',
        );
      }
      return new Response(null, { status: 200, headers });
    }) as typeof globalThis.fetch;
  }

  it("creates a private index under the storage and links it from the profile", async () => {
    mockDatasets({ [WEBID]: profileDataset() });
    const fetch = storageAwareFetch("https://alice.example/");

    const indexUrl = await createTypeIndex(
      "private",
      WEBID,
      "https://alice.example/solid-memo/main/",
      fetch,
    );

    expect(indexUrl).toBe(PRIVATE_INDEX);
    const [firstSaveUrl, indexDataset] =
      vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(firstSaveUrl).toBe(PRIVATE_INDEX);
    const indexThing = getThing(indexDataset as SolidDataset, PRIVATE_INDEX)!;
    expect(getUrlAll(indexThing, RDF.type)).toEqual([
      SOLID.TypeIndex,
      SOLID.UnlistedDocument,
    ]);

    const [secondSaveUrl, profileSaved] =
      vi.mocked(saveSolidDatasetAt).mock.calls[1];
    expect(secondSaveUrl).toBe(PROFILE_DOC);
    const profileThing = getThing(profileSaved as SolidDataset, WEBID)!;
    expect(getUrl(profileThing, SOLID.privateTypeIndex)).toBe(PRIVATE_INDEX);
  });

  it("creates a public index typed as a ListedDocument", async () => {
    mockDatasets({ [WEBID]: profileDataset() });
    const fetch = storageAwareFetch("https://alice.example/");

    const indexUrl = await createTypeIndex(
      "public",
      WEBID,
      "https://alice.example/solid-memo/main/",
      fetch,
    );

    expect(indexUrl).toBe(PUBLIC_INDEX);
    const [, indexDataset] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    const indexThing = getThing(indexDataset as SolidDataset, PUBLIC_INDEX)!;
    expect(getUrlAll(indexThing, RDF.type)).toContain(SOLID.ListedDocument);
    const [, profileSaved] = vi.mocked(saveSolidDatasetAt).mock.calls[1];
    const profileThing = getThing(profileSaved as SolidDataset, WEBID)!;
    expect(getUrl(profileThing, SOLID.publicTypeIndex)).toBe(PUBLIC_INDEX);
  });

  it("falls back to the origin root when no candidate advertises a storage", async () => {
    mockDatasets({ [WEBID]: profileDataset() });
    const fetch = vi.fn(async () =>
      new Response(null, { status: 200 }),
    ) as typeof globalThis.fetch;

    const indexUrl = await createTypeIndex(
      "private",
      WEBID,
      "https://alice.example/deep/path/main/",
      fetch,
    );
    expect(indexUrl).toBe(PRIVATE_INDEX);
  });

  it("keeps walking when a HEAD request fails", async () => {
    mockDatasets({ [WEBID]: profileDataset() });
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockRejectedValueOnce(new Error("network"))
      .mockImplementation(async (input: RequestInfo | URL) => {
        const headers = new Headers();
        if (String(input) === "https://alice.example/") {
          headers.set(
            "Link",
            '<http://www.w3.org/ns/pim/space#Storage>; rel="type"',
          );
        }
        return new Response(null, { status: 200, headers });
      });

    await expect(
      createTypeIndex("private", WEBID, "https://alice.example/x/", fetch),
    ).resolves.toBe(PRIVATE_INDEX);
  });

  it("throws when the profile has no WebID subject to link from", async () => {
    mockDatasets({ [WEBID]: mockSolidDatasetFrom(PROFILE_DOC) });
    const fetch = storageAwareFetch("https://alice.example/");

    await expect(
      createTypeIndex("private", WEBID, "https://alice.example/x/", fetch),
    ).rejects.toThrow("No subject");
  });
});

describe("ensureTypeIndex", () => {
  it("returns the existing index without creating anything", async () => {
    mockDatasets({
      [WEBID]: profileDataset((t) =>
        t.addIri(SOLID.privateTypeIndex, PRIVATE_INDEX),
      ),
    });
    await expect(
      ensureTypeIndex("private", WEBID, "https://alice.example/x/", noFetch),
    ).resolves.toBe(PRIVATE_INDEX);
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });

  it("returns the existing public index", async () => {
    mockDatasets({
      [WEBID]: profileDataset((t) =>
        t.addIri(SOLID.publicTypeIndex, PUBLIC_INDEX),
      ),
    });
    await expect(
      ensureTypeIndex("public", WEBID, "https://alice.example/x/", noFetch),
    ).resolves.toBe(PUBLIC_INDEX);
  });

  it("creates the index when missing", async () => {
    mockDatasets({ [WEBID]: profileDataset() });
    const fetch = vi.fn(async () =>
      new Response(null, { status: 200 }),
    ) as typeof globalThis.fetch;

    await expect(
      ensureTypeIndex("private", WEBID, "https://alice.example/x/", fetch),
    ).resolves.toBe(PRIVATE_INDEX);
    expect(saveSolidDatasetAt).toHaveBeenCalled();
  });
});

describe("readInstanceRegistrations", () => {
  it("collects sm:Instance registrations, accepting both container and instance predicates", async () => {
    let dataset = mockSolidDatasetFrom(PRIVATE_INDEX);
    dataset = setThing(
      dataset,
      buildThing(createThing({ url: `${PRIVATE_INDEX}#a` }))
        .addIri(RDF.type, SOLID.TypeRegistration)
        .addIri(SOLID.forClass, SM.Instance)
        .addIri(
          SOLID.instanceContainer,
          "https://alice.example/solid-memo/a/",
        )
        .addStringNoLocale(DCTERMS.title, "Deck set A")
        .build(),
    );
    dataset = setThing(
      dataset,
      buildThing(createThing({ url: `${PRIVATE_INDEX}#b` }))
        .addIri(RDF.type, SOLID.TypeRegistration)
        .addIri(SOLID.forClass, SM.Instance)
        .addIri(SOLID.instance, "https://alice.example/solid-memo/b/")
        .build(),
    );
    // Registration for another class: skipped.
    dataset = setThing(
      dataset,
      buildThing(createThing({ url: `${PRIVATE_INDEX}#other` }))
        .addIri(RDF.type, SOLID.TypeRegistration)
        .addIri(SOLID.forClass, "https://schema.org/Recipe")
        .addIri(SOLID.instanceContainer, "https://alice.example/recipes/")
        .build(),
    );
    // Not a registration: skipped.
    dataset = setThing(
      dataset,
      buildThing(createThing({ url: `${PRIVATE_INDEX}#stray` }))
        .addIri(RDF.type, SOLID.TypeIndex)
        .build(),
    );
    // Registration without any target: skipped.
    dataset = setThing(
      dataset,
      buildThing(createThing({ url: `${PRIVATE_INDEX}#empty` }))
        .addIri(RDF.type, SOLID.TypeRegistration)
        .addIri(SOLID.forClass, SM.Instance)
        .build(),
    );
    mockDatasets({ [PRIVATE_INDEX]: dataset });

    await expect(
      readInstanceRegistrations(PRIVATE_INDEX, noFetch),
    ).resolves.toEqual([
      {
        containerUrl: "https://alice.example/solid-memo/a/",
        title: "Deck set A",
      },
      { containerUrl: "https://alice.example/solid-memo/b/", title: null },
    ]);
  });
});

describe("addInstanceRegistration", () => {
  it("adds a titled registration and saves the index", async () => {
    mockDatasets({ [PRIVATE_INDEX]: mockSolidDatasetFrom(PRIVATE_INDEX) });

    await addInstanceRegistration(
      PRIVATE_INDEX,
      {
        id: "sm-inst-123",
        containerUrl: "https://alice.example/solid-memo/main/",
        title: "Main",
      },
      noFetch,
    );

    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(PRIVATE_INDEX);
    const registration = getThing(
      saved as SolidDataset,
      `${PRIVATE_INDEX}#sm-inst-123`,
    )!;
    expect(getUrlAll(registration, RDF.type)).toEqual([
      SOLID.TypeRegistration,
    ]);
    expect(getUrl(registration, SOLID.forClass)).toBe(SM.Instance);
    expect(getUrl(registration, SOLID.instanceContainer)).toBe(
      "https://alice.example/solid-memo/main/",
    );
    expect(getStringNoLocale(registration, DCTERMS.title)).toBe("Main");
  });
});
