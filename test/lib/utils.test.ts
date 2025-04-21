import { mapArrayToRecord } from "@lib/utils";
import { deepEqual } from "assert";
import it, { describe } from "node:test";

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
