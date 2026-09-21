import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildThing,
  createThing,
  deleteContainer,
  deleteSolidDataset,
  getInteger,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  mockSolidDatasetFrom,
  saveSolidDatasetAt,
  setThing,
  type SolidDataset,
} from "@inrupt/solid-client";
import { createSolidInstanceRepository } from "./solidInstanceRepository";
import {
  addInstanceRegistration,
  ensureTypeIndex,
  locateTypeIndexes,
  readInstanceRegistrations,
} from "./typeIndex";
import { DCTERMS, SM } from "./vocab";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@inrupt/solid-client")>();
  return {
    ...actual,
    getSolidDataset: vi.fn(),
    saveSolidDatasetAt: vi.fn(),
    deleteSolidDataset: vi.fn(),
    deleteContainer: vi.fn(),
  };
});
vi.mock("./typeIndex");

const WEBID = "https://alice.example/profile/card#me";
const PRIVATE_INDEX = "https://alice.example/settings/privateTypeIndex.ttl";
const CONTAINER = "https://alice.example/solid-memo/main/";

function makeRepository() {
  return createSolidInstanceRepository({
    fetch: vi.fn() as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-09-21T10:00:00.000Z"),
    randomId: () => "fixed-id",
  });
}

beforeEach(() => {
  vi.mocked(getSolidDataset).mockReset();
  vi.mocked(saveSolidDatasetAt).mockReset();
  vi.mocked(deleteSolidDataset).mockReset();
  vi.mocked(deleteContainer).mockReset();
  vi.mocked(locateTypeIndexes).mockReset();
  vi.mocked(ensureTypeIndex).mockReset();
  vi.mocked(readInstanceRegistrations).mockReset();
  vi.mocked(addInstanceRegistration).mockReset();
});

describe("listInstances", () => {
  it("merges registrations from both indexes, deduplicating by container", async () => {
    vi.mocked(locateTypeIndexes).mockResolvedValue({
      privateIndexUrl: PRIVATE_INDEX,
      publicIndexUrl: "https://alice.example/settings/publicTypeIndex.ttl",
    });
    vi.mocked(readInstanceRegistrations)
      .mockResolvedValueOnce([
        { containerUrl: CONTAINER, title: "Main" },
        { containerUrl: "https://alice.example/solid-memo/other", title: null },
      ])
      .mockResolvedValueOnce([
        { containerUrl: CONTAINER, title: "Duplicate" },
      ]);

    await expect(makeRepository().listInstances(WEBID)).resolves.toEqual([
      { url: CONTAINER, name: "Main" },
      { url: "https://alice.example/solid-memo/other/", name: "other" },
    ]);
  });

  it("skips missing indexes and tolerates unreadable ones", async () => {
    vi.mocked(locateTypeIndexes).mockResolvedValue({
      privateIndexUrl: PRIVATE_INDEX,
      publicIndexUrl: null,
    });
    vi.mocked(readInstanceRegistrations).mockRejectedValue(
      new Error("403 Forbidden"),
    );

    await expect(makeRepository().listInstances(WEBID)).resolves.toEqual([]);
  });
});

describe("getRegistrationOptions", () => {
  it("maps index locations to existence flags", async () => {
    vi.mocked(locateTypeIndexes).mockResolvedValue({
      privateIndexUrl: null,
      publicIndexUrl: "https://alice.example/settings/publicTypeIndex.ttl",
    });
    await expect(
      makeRepository().getRegistrationOptions(WEBID),
    ).resolves.toEqual({
      privateIndexExists: false,
      publicIndexExists: true,
    });
  });
});

describe("createInstance", () => {
  it("writes meta.ttl, registers the container, and returns the instance", async () => {
    vi.mocked(ensureTypeIndex).mockResolvedValue(PRIVATE_INDEX);

    const instance = await makeRepository().createInstance({
      webId: WEBID,
      containerUrl: "https://alice.example/solid-memo/main",
      name: "Main",
      registrationTarget: "private",
    });

    expect(instance).toEqual({ url: CONTAINER, name: "Main" });

    const [metaUrl, metaDataset] =
      vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(metaUrl).toBe(`${CONTAINER}meta.ttl`);
    const meta = getThing(
      metaDataset as SolidDataset,
      `${CONTAINER}meta.ttl#it`,
    )!;
    expect(getStringNoLocale(meta, DCTERMS.title)).toBe("Main");
    expect(getInteger(meta, SM.formatVersion)).toBe(1);

    expect(ensureTypeIndex).toHaveBeenCalledWith(
      "private",
      WEBID,
      CONTAINER,
      expect.anything(),
    );
    expect(addInstanceRegistration).toHaveBeenCalledWith(
      PRIVATE_INDEX,
      { id: "sm-inst-fixed-id", containerUrl: CONTAINER, title: "Main" },
      expect.anything(),
    );
  });

  it("cleans up the container and rethrows when registration fails", async () => {
    vi.mocked(ensureTypeIndex).mockRejectedValue(
      new Error("cannot create index"),
    );

    await expect(
      makeRepository().createInstance({
        webId: WEBID,
        containerUrl: CONTAINER,
        name: "Main",
        registrationTarget: "private",
      }),
    ).rejects.toThrow("cannot create index");

    expect(deleteSolidDataset).toHaveBeenCalledWith(
      `${CONTAINER}meta.ttl`,
      expect.anything(),
    );
    expect(deleteContainer).toHaveBeenCalledWith(
      CONTAINER,
      expect.anything(),
    );
  });

  it("rethrows the original error even when cleanup fails too", async () => {
    vi.mocked(ensureTypeIndex).mockRejectedValue(new Error("original"));
    vi.mocked(deleteSolidDataset).mockRejectedValue(new Error("cleanup"));

    await expect(
      makeRepository().createInstance({
        webId: WEBID,
        containerUrl: CONTAINER,
        name: "Main",
        registrationTarget: "private",
      }),
    ).rejects.toThrow("original");
  });
});

describe("attachInstance", () => {
  function metaDataset(withTitle: boolean) {
    let thing = buildThing(
      createThing({ url: `${CONTAINER}meta.ttl#it` }),
    ).addIri(
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
      SM.Instance,
    );
    if (withTitle) {
      thing = thing.addStringNoLocale(DCTERMS.title, "Attached");
    }
    return setThing(
      mockSolidDatasetFrom(`${CONTAINER}meta.ttl`),
      thing.build(),
    );
  }

  it("registers an existing instance and returns its name", async () => {
    vi.mocked(getSolidDataset).mockResolvedValue(metaDataset(true));
    vi.mocked(ensureTypeIndex).mockResolvedValue(PRIVATE_INDEX);
    vi.mocked(readInstanceRegistrations).mockResolvedValue([]);

    await expect(
      makeRepository().attachInstance({
        webId: WEBID,
        instanceUrl: "https://alice.example/solid-memo/main",
        registrationTarget: "public",
      }),
    ).resolves.toEqual({ url: CONTAINER, name: "Attached" });

    expect(addInstanceRegistration).toHaveBeenCalledWith(
      PRIVATE_INDEX,
      { id: "sm-inst-fixed-id", containerUrl: CONTAINER, title: "Attached" },
      expect.anything(),
    );
  });

  it("is idempotent when the container is already registered", async () => {
    vi.mocked(getSolidDataset).mockResolvedValue(metaDataset(true));
    vi.mocked(ensureTypeIndex).mockResolvedValue(PRIVATE_INDEX);
    vi.mocked(readInstanceRegistrations).mockResolvedValue([
      { containerUrl: CONTAINER, title: "Attached" },
    ]);

    await makeRepository().attachInstance({
      webId: WEBID,
      instanceUrl: CONTAINER,
      registrationTarget: "private",
    });
    expect(addInstanceRegistration).not.toHaveBeenCalled();
  });

  it("falls back to the container slug when meta.ttl has no title", async () => {
    vi.mocked(getSolidDataset).mockResolvedValue(metaDataset(false));
    vi.mocked(ensureTypeIndex).mockResolvedValue(PRIVATE_INDEX);
    vi.mocked(readInstanceRegistrations).mockResolvedValue([]);

    await expect(
      makeRepository().attachInstance({
        webId: WEBID,
        instanceUrl: CONTAINER,
        registrationTarget: "private",
      }),
    ).resolves.toEqual({ url: CONTAINER, name: "main" });
  });

  it("rejects a container without a readable meta.ttl", async () => {
    vi.mocked(getSolidDataset).mockRejectedValue(new Error("404"));

    await expect(
      makeRepository().attachInstance({
        webId: WEBID,
        instanceUrl: CONTAINER,
        registrationTarget: "private",
      }),
    ).rejects.toThrow("not a Solid Memo instance");
  });

  it("rejects a meta.ttl without the #it subject", async () => {
    vi.mocked(getSolidDataset).mockResolvedValue(
      mockSolidDatasetFrom(`${CONTAINER}meta.ttl`),
    );

    await expect(
      makeRepository().attachInstance({
        webId: WEBID,
        instanceUrl: CONTAINER,
        registrationTarget: "private",
      }),
    ).rejects.toThrow("no #it subject");
  });
});
