import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildThing,
  createContainerAt,
  createThing,
  deleteContainer,
  deleteFile,
  getFile,
  getSolidDataset,
  getThing,
  getUrl,
  getUrlAll,
  getDatetime,
  mockContainerFrom,
  mockSolidDatasetFrom,
  overwriteFile,
  saveSolidDatasetAt,
  setThing,
  type SolidDataset,
} from "@inrupt/solid-client";
import { getSolidDatasetOrNull } from "./datasets";
import { createSolidInstanceCopier, linkedUrl } from "./solidInstanceCopier";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@inrupt/solid-client")>();
  return {
    ...actual,
    createContainerAt: vi.fn(),
    deleteContainer: vi.fn(),
    deleteFile: vi.fn(),
    getFile: vi.fn(),
    getSolidDataset: vi.fn(),
    overwriteFile: vi.fn(),
    saveSolidDatasetAt: vi.fn(),
  };
});
vi.mock("./datasets");

const FROM = "https://pod.example/solid-memo/main/";
const TO = "https://pod.example/solid-memo/main-0f3a/";
const MOVE = { from: FROM, to: TO };
const SM = "https://solid-memo.com/vocab/v1#";
const LDP_CONTAINS = "http://www.w3.org/ns/ldp#contains";

/** A fetch that answers HEAD and GET requests from a table of URL → response parts. */
function fetchOf(responses: Record<string, { status?: number; headers?: Record<string, string>; body?: string }>) {
  return vi.fn(async (input: RequestInfo | URL) => {
    const response = responses[String(input)] ?? { status: 404 };
    return new Response(response.body ?? null, { status: response.status ?? 200, headers: response.headers });
  }) as unknown as typeof fetch;
}

function copier(fetch = fetchOf({})) {
  return createSolidInstanceCopier({ fetch });
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("linkedUrl", () => {
  it("finds the link of a relation, resolved against the resource", () => {
    const link = '<http://www.w3.org/ns/ldp#Resource>; rel="type", <main/.acl>; rel="acl describedby"';
    expect(linkedUrl(link, "acl", "https://pod.example/solid-memo/")).toBe("https://pod.example/solid-memo/main/.acl");
    expect(linkedUrl("<x.acr>; rel=acl", "acl", "https://pod.example/y")).toBe("https://pod.example/x.acr");
    expect(linkedUrl('<x>; title="no rel"', "acl", "https://pod.example/")).toBeNull();
    expect(linkedUrl(null, "acl", "https://pod.example/")).toBeNull();
  });
});

describe("ensureAbsent", () => {
  it("passes when nothing is there, and refuses a URL in use or unreadable", async () => {
    await expect(copier().ensureAbsent(TO)).resolves.toBeUndefined();
    await expect(copier(fetchOf({ [TO]: {} })).ensureAbsent(TO)).rejects.toThrow(`<${TO}> already exists.`);
    await expect(copier(fetchOf({ [TO]: { status: 403 } })).ensureAbsent(TO)).rejects.toThrow(
      `Could not check <${TO}>: 403.`,
    );
  });
});

describe("copyResource", () => {
  it("creates a container for a container, and for the new instance itself", async () => {
    await copier().copyResource(`${FROM}decks/`, `${TO}decks/`, MOVE);
    expect(createContainerAt).toHaveBeenCalledWith(`${TO}decks/`, expect.anything());
    await copier().createContainer(TO);
    expect(createContainerAt).toHaveBeenLastCalledWith(TO, expect.anything());
  });

  it("copies a Turtle document with every IRI under the old container moved, and nothing else", async () => {
    vi.mocked(getSolidDataset).mockResolvedValue(
      setThing(
        mockSolidDatasetFrom(`${FROM}catalog.ttl`),
        buildThing(createThing({ url: `${FROM}catalog.ttl#deck-1` }))
          .addIri(`${SM}cardsDocument`, `${FROM}decks/deck-1.ttl`)
          .addIri("http://www.w3.org/ns/prov#wasDerivedFrom", "https://solid-memo.com/decks/capitals/1.ttl")
          .addDatetime("http://purl.org/dc/terms/created", new Date("2026-09-21T10:00:00.000Z"))
          .build(),
      ) as never,
    );
    const fetch = fetchOf({ [`${FROM}catalog.ttl`]: { headers: { "Content-Type": "text/turtle; charset=utf-8" } } });
    await copier(fetch).copyResource(`${FROM}catalog.ttl`, `${TO}catalog.ttl`, MOVE);
    const [url, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(url).toBe(`${TO}catalog.ttl`);
    expect(getThing(saved as SolidDataset, `${FROM}catalog.ttl#deck-1`)).toBeNull();
    const deck = getThing(saved as SolidDataset, `${TO}catalog.ttl#deck-1`)!;
    expect(getUrl(deck, `${SM}cardsDocument`)).toBe(`${TO}decks/deck-1.ttl`);
    expect(getUrl(deck, "http://www.w3.org/ns/prov#wasDerivedFrom")).toBe("https://solid-memo.com/decks/capitals/1.ttl");
    expect(getDatetime(deck, "http://purl.org/dc/terms/created")?.toISOString()).toBe("2026-09-21T10:00:00.000Z");
  });

  it("copies any other file byte for byte, with its content type", async () => {
    const picture = new Blob(["png"], { type: "image/png" });
    vi.mocked(getFile).mockResolvedValue(picture as never);
    const fetch = fetchOf({ [`${FROM}flag.png`]: { headers: { "Content-Type": "image/png" } } });
    await copier(fetch).copyResource(`${FROM}flag.png`, `${TO}flag.png`, MOVE);
    expect(overwriteFile).toHaveBeenCalledWith(`${TO}flag.png`, picture, expect.objectContaining({ contentType: "image/png" }));
    await copier(fetchOf({ [`${FROM}x`]: {} })).copyResource(`${FROM}x`, `${TO}x`, MOVE);
    expect(overwriteFile).toHaveBeenLastCalledWith(`${TO}x`, picture, expect.objectContaining({ contentType: "image/png" }));
  });
});

describe("copyAccessControl", () => {
  const acl = `${FROM}.acl`;

  it("copies a resource's own access control to the new resource's, its targets moved", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      setThing(
        mockSolidDatasetFrom(acl),
        buildThing(createThing({ url: `${acl}#owner` }))
          .addIri("http://www.w3.org/ns/auth/acl#accessTo", FROM)
          .addIri("http://www.w3.org/ns/auth/acl#default", FROM)
          .addIri("http://www.w3.org/ns/auth/acl#agent", "https://alice.example/profile/card#me")
          .build(),
      ) as never,
    );
    const fetch = fetchOf({
      [FROM]: { headers: { Link: '<.acl>; rel="acl"' } },
      [TO]: { headers: { Link: '<.acl>; rel="acl"' } },
    });
    await expect(copier(fetch).copyAccessControl(FROM, TO, MOVE)).resolves.toBe(true);
    const [url, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(url).toBe(`${TO}.acl`);
    const rule = getThing(saved as SolidDataset, `${TO}.acl#owner`)!;
    expect(getUrlAll(rule, "http://www.w3.org/ns/auth/acl#accessTo")).toEqual([TO]);
    expect(getUrlAll(rule, "http://www.w3.org/ns/auth/acl#agent")).toEqual(["https://alice.example/profile/card#me"]);
  });

  it("copies nothing for a resource that inherits its access control", async () => {
    await expect(copier().copyAccessControl(FROM, TO, MOVE)).resolves.toBe(false);
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    const fetch = fetchOf({ [FROM]: { headers: { Link: '<.acl>; rel="acl"' } } });
    await expect(copier(fetch).copyAccessControl(FROM, TO, MOVE)).resolves.toBe(false);
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });

  it("refuses when the pod does not say where the new resource's access control goes", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(mockSolidDatasetFrom(acl) as never);
    const fetch = fetchOf({ [FROM]: { headers: { Link: '<.acl>; rel="acl"' } }, [TO]: {} });
    await expect(copier(fetch).copyAccessControl(FROM, TO, MOVE)).rejects.toThrow(
      `The pod does not say where the access control of <${TO}> goes.`,
    );
  });
});

describe("fingerprint", () => {
  it("is the ETag, else Last-Modified, else a hash of the content", async () => {
    await expect(copier(fetchOf({ [FROM]: { headers: { ETag: '"v1"' } } })).fingerprint(FROM)).resolves.toBe('"v1"');
    await expect(
      copier(fetchOf({ [FROM]: { headers: { "Last-Modified": "Mon, 28 Sep 2026 10:00:00 GMT" } } })).fingerprint(FROM),
    ).resolves.toBe("Mon, 28 Sep 2026 10:00:00 GMT");
    const hash = await copier(fetchOf({ [FROM]: { body: "abc" } })).fingerprint(FROM);
    expect(hash).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
});

describe("listResources and deleteRecursively", () => {
  function container(url: string, children: string[]) {
    let thing = buildThing(createThing({ url }));
    for (const child of children) thing = thing.addIri(LDP_CONTAINS, child);
    return setThing(mockContainerFrom(url), thing.build());
  }
  const tree: Record<string, SolidDataset> = {
    // The listing also names the container itself and a stranger outside it: neither is followed.
    [FROM]: container(FROM, [`${FROM}meta.ttl`, `${FROM}decks/`, `${FROM}catalog.ttl`, FROM, `${TO}elsewhere.ttl`]),
    [`${FROM}decks/`]: container(`${FROM}decks/`, [`${FROM}decks/deck-1.ttl`]),
  };

  it("list everything below the container, depth first, and nothing for a container that is gone", async () => {
    vi.mocked(getSolidDatasetOrNull).mockImplementation((async (url: string) => tree[url] ?? null) as never);
    await expect(copier().listResources(FROM)).resolves.toEqual([
      `${FROM}catalog.ttl`,
      `${FROM}decks/`,
      `${FROM}decks/deck-1.ttl`,
      `${FROM}meta.ttl`,
    ]);
    await expect(copier().listResources(TO)).resolves.toEqual([]);
  });

  it("delete everything below the container, then the container", async () => {
    vi.mocked(getSolidDatasetOrNull).mockImplementation((async (url: string) => tree[url] ?? null) as never);
    await copier().deleteRecursively(FROM);
    expect(vi.mocked(deleteFile).mock.calls.map((c) => c[0])).toEqual([
      `${FROM}decks/deck-1.ttl`,
      `${FROM}catalog.ttl`,
      `${FROM}meta.ttl`,
    ]);
    expect(vi.mocked(deleteContainer).mock.calls.map((c) => c[0])).toEqual([`${FROM}decks/`, FROM]);
  });
});
