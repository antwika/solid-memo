import { mapArrayToRecord, preferFragment } from "@lib/utils";
import { deepEqual, strictEqual } from "assert";
import it, { describe } from "node:test";

describe("preferFragment", () => {
  it("returns the full url if there is no fragment part", () => {
    strictEqual(preferFragment("http://foo.bar"), "http://foo.bar");
  });

  it("returns the fragment part of a url", () => {
    strictEqual(preferFragment("http://foo.bar#baz"), "baz");
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

    deepEqual(record, {
      1: { id: "1", foo: "bar" },
      2: { id: "2", foo: "baz" },
    });
  });
});
