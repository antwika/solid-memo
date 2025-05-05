import { cn, fetcher, multiFetcher } from "@lib/utils";
import { describe, expect, it, vi } from "vitest";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  responseToSolidDataset,
  type SolidDataset,
} from "@inrupt/solid-client";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

vi.mock("clsx", () => ({ clsx: vi.fn() }));
vi.mock("tailwind-merge", () => ({ twMerge: vi.fn() }));
vi.mock("@inrupt/solid-client", () => ({ responseToSolidDataset: vi.fn() }));
vi.mock("@inrupt/solid-client-authn-browser", () => ({
  getDefaultSession: vi.fn(),
}));

describe("cn", () => {
  it("invokes passes the input arguments directly to clsx", () => {
    vi.mocked(clsx).mockReturnValue("mock-clsx-return-value");
    vi.mocked(twMerge).mockReturnValue("mock-twMerge-return-value");
    const result = cn("foo", "bar");
    expect(clsx).toHaveBeenCalledWith(["foo", "bar"]);
    expect(twMerge).toHaveBeenCalledWith("mock-clsx-return-value");
    expect(result).toStrictEqual("mock-twMerge-return-value");
  });
});

describe("fetcher", () => {
  it("uses the current session's 'fetch'-method to retrieve a solid dataset from a url", async () => {
    const mockFetch = vi.fn();
    const mockResponse = { testId: "foo" } as Partial<Response>;
    const mockDataset = { testId: "bar" } as Partial<SolidDataset>;

    vi.mocked(getDefaultSession, { partial: true }).mockReturnValueOnce({
      fetch: mockFetch,
    });

    vi.mocked(responseToSolidDataset, { partial: true }).mockResolvedValueOnce(
      mockDataset
    );

    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await fetcher("mock-url");

    expect(mockFetch).toHaveBeenCalledWith("mock-url");
    expect(responseToSolidDataset).toHaveBeenCalledWith(mockResponse);
    expect(result).toStrictEqual(mockDataset);
  });
});

describe("multiFetcher", () => {
  it("uses the current session's 'fetch'-method to retrieve multiple solid datasets from an array of urls", async () => {
    const mockFetch = vi.fn();
    const mockResponse = { testId: "foo" } as Partial<Response>;
    const mockDataset = { testId: "bar" } as Partial<SolidDataset>;

    vi.mocked(getDefaultSession, { partial: true }).mockReturnValueOnce({
      fetch: mockFetch,
    });

    vi.mocked(responseToSolidDataset, { partial: true }).mockResolvedValueOnce(
      mockDataset
    );

    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await multiFetcher(["mock-url"]);

    expect(mockFetch).toHaveBeenCalledWith("mock-url");
    expect(responseToSolidDataset).toHaveBeenCalledWith(mockResponse);
    expect(result).toStrictEqual([mockDataset]);
  });
});
