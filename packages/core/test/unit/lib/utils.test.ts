import {
  ensureTrailingSlash,
  mapArrayToRecord,
  preferFragment,
} from "../../../src/lib/utils";
import { describe, expect, it } from "vitest";

describe("preferFragment", () => {
  it("returns the full url if there is no fragment part", () => {
    expect(preferFragment("http://foo.bar")).toStrictEqual("http://foo.bar");
  });

  it("returns the fragment part of a url", () => {
    expect(preferFragment("http://foo.bar#baz")).toStrictEqual("baz");
  });
});

describe("mapArrayToRecord", () => {
  it("maps each element of an array to a record", () => {
    const record = mapArrayToRecord(
      [
        { id: "1", foo: "bar" },
        { id: "2", foo: "baz" },
      ],
      "id"
    );

    expect(record).toStrictEqual({
      1: { id: "1", foo: "bar" },
      2: { id: "2", foo: "baz" },
    });
  });
});

describe("ensureTrailingSlash", () => {
  it("simply returns a slash the the provided url is an empty string", () => {
    expect(ensureTrailingSlash("")).toBe("/");
  });

  it("appends a slash to the provided url if there is none", () => {
    expect(ensureTrailingSlash("foo")).toBe("foo/");
  });

  it("does not append anything if the provided url already ends with a slash", () => {
    expect(ensureTrailingSlash("foo/")).toBe("foo/");
  });
});
