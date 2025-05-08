import useDatasets from "@hooks/useDatasets";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import useSWR from "swr";
import { multiFetcher } from "@lib/utils";

vi.mock("swr", () => ({
  default: vi.fn(),
}));

vi.mock("@lib/utils", () => ({
  multiFetcher: vi.fn(),
}));

describe("useDatasets (function) (default export)", () => {
  let mockData = {};
  let mockMutate = vi.fn();

  beforeEach(() => {
    mockData = {};
    mockMutate = vi.fn();

    vi.mocked(useSWR, { partial: true }).mockReturnValue({
      data: mockData,
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  test("when the 'iris' argument is undefined, then it passes undefined forward as the first argument to the call to the useSWR", () => {
    useDatasets(undefined);
    expect(useSWR).toHaveBeenCalledWith(undefined, expect.anything());
  });

  test("when the 'iris' argument is an empty 'string', then it wraps it into an array before passing it forward as the first argument to the call to the useSWR", () => {
    useDatasets("");
    expect(useSWR).toHaveBeenCalledWith([""], expect.anything());
  });

  test("when the 'iris' argument is a populated 'string', then it wraps it into an array before passing it forward as the first argument to the call to the useSWR", () => {
    useDatasets("foo");
    expect(useSWR).toHaveBeenCalledWith(["foo"], expect.anything());
  });

  test("when the 'iris' argument is a populated 'string[]', then it passes it forward as the first argument to the call to the useSWR", () => {
    useDatasets(["foo"]);
    expect(useSWR).toHaveBeenCalledWith(["foo"], expect.anything());
  });

  test("when the 'iris' argument is an empty 'string[]', then it passes it forward as the first argument to the call to the useSWR", () => {
    useDatasets([]);
    expect(useSWR).toHaveBeenCalledWith([], expect.anything());
  });

  it("passes the 'multiFetcher' dependency forward as the second argument to the useSWR function", () => {
    useDatasets(undefined);
    expect(useSWR).toHaveBeenCalledWith(undefined, multiFetcher);
  });

  it("returns the 'data' property that useSWR returns with no further processing", () => {
    expect(useDatasets(undefined).data).toBe(mockData);
  });

  it("returns the 'mutate' property that useSWR returns with no further processing", () => {
    expect(useDatasets(undefined).mutate).toBe(mockMutate);
  });
});
