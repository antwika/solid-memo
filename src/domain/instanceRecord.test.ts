import { describe, expect, it } from "vitest";
import { instanceMetaFromRecord, instanceMetaToRecord } from "./instanceRecord";

describe("instance meta records", () => {
  it("round-trip the name and creation time, keeping the stored version", () => {
    const meta = { name: "Main", createdAt: "2026-09-21T10:00:00.000Z", formatVersion: 1 };
    expect(instanceMetaToRecord(meta)).toEqual({ title: "Main", created: meta.createdAt });
    expect(instanceMetaFromRecord(1, instanceMetaToRecord(meta))).toEqual(meta);
  });
});
