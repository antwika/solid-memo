import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPodUrlAll } from "@inrupt/solid-client";
import {
  candidateStorageUrls,
  createSolidStorageGateway,
  hasStorageLink,
} from "./solidStorageGateway";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@inrupt/solid-client")>();
  return { ...actual, getPodUrlAll: vi.fn() };
});

const WEBID = "https://alice.example/profile/card#me";
const STORAGE_LINK =
  '<http://www.w3.org/ns/pim/space#Storage>; rel="type"';

function headResponse(linkHeader?: string): Response {
  const headers = new Headers();
  if (linkHeader !== undefined) {
    headers.set("Link", linkHeader);
  }
  return new Response(null, { status: 200, headers });
}

describe("candidateStorageUrls", () => {
  it("lists the document and each ancestor container up to the root", () => {
    expect(candidateStorageUrls(WEBID)).toEqual([
      "https://alice.example/profile/card",
      "https://alice.example/profile/",
      "https://alice.example/",
    ]);
  });
});

describe("hasStorageLink", () => {
  it("is false without a Link header", () => {
    expect(hasStorageLink(null)).toBe(false);
  });

  it("recognizes a storage type link among several links", () => {
    expect(
      hasStorageLink(
        `<http://www.w3.org/ns/ldp#Container>; rel="type", ${STORAGE_LINK}`,
      ),
    ).toBe(true);
  });

  it("requires rel=type, not just the Storage IRI", () => {
    expect(
      hasStorageLink(
        '<http://www.w3.org/ns/pim/space#Storage>; rel="describedby"',
      ),
    ).toBe(false);
  });
});

describe("createSolidStorageGateway", () => {
  beforeEach(() => {
    vi.mocked(getPodUrlAll).mockReset();
  });

  describe("discoverStorages", () => {
    it("returns profile storages when pim:storage triples exist", async () => {
      vi.mocked(getPodUrlAll).mockResolvedValue([
        "https://alice.example/",
        "https://backup.example/",
      ]);
      const fetch = vi.fn();
      const gateway = createSolidStorageGateway({ fetch });

      await expect(gateway.discoverStorages(WEBID)).resolves.toEqual([
        { url: "https://alice.example/", source: "profile" },
        { url: "https://backup.example/", source: "profile" },
      ]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("falls back to the Link-header walk-up when the profile has none", async () => {
      vi.mocked(getPodUrlAll).mockResolvedValue([]);
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(headResponse())
        .mockResolvedValueOnce(headResponse())
        .mockResolvedValueOnce(headResponse(STORAGE_LINK));
      const gateway = createSolidStorageGateway({ fetch });

      await expect(gateway.discoverStorages(WEBID)).resolves.toEqual([
        { url: "https://alice.example/", source: "linkHeader" },
      ]);
      expect(fetch).toHaveBeenCalledWith("https://alice.example/profile/card", {
        method: "HEAD",
      });
    });

    it("skips candidates whose HEAD request fails", async () => {
      vi.mocked(getPodUrlAll).mockResolvedValue([]);
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockRejectedValueOnce(new Error("network"))
        .mockResolvedValueOnce(headResponse(STORAGE_LINK));
      const gateway = createSolidStorageGateway({ fetch });

      await expect(gateway.discoverStorages(WEBID)).resolves.toEqual([
        { url: "https://alice.example/profile/", source: "linkHeader" },
      ]);
    });

    it("returns an empty list when nothing advertises a storage", async () => {
      vi.mocked(getPodUrlAll).mockResolvedValue([]);
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValue(headResponse());
      const gateway = createSolidStorageGateway({ fetch });

      await expect(gateway.discoverStorages(WEBID)).resolves.toEqual([]);
    });
  });

  describe("probeStorage", () => {
    it("normalizes the URL with a trailing slash and accepts a 200", async () => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValue(headResponse());
      const gateway = createSolidStorageGateway({ fetch });

      await expect(
        gateway.probeStorage("https://pod.example"),
      ).resolves.toEqual({ url: "https://pod.example/", source: "manual" });
      expect(fetch).toHaveBeenCalledWith("https://pod.example/", {
        method: "HEAD",
      });
    });

    it("keeps an existing trailing slash", async () => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValue(headResponse());
      const gateway = createSolidStorageGateway({ fetch });

      await expect(gateway.probeStorage("https://pod.example/")).resolves.toEqual(
        { url: "https://pod.example/", source: "manual" },
      );
    });

    it("rejects when the storage is not reachable", async () => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValue(new Response(null, { status: 403 }));
      const gateway = createSolidStorageGateway({ fetch });

      await expect(
        gateway.probeStorage("https://pod.example/"),
      ).rejects.toThrow("HTTP 403");
    });
  });
});
