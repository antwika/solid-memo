import { describe, expect, it } from "vitest";
import { parseTurtle, readTurtleTree } from "@solid-memo/turtle/rdf";
import { VOCAB_ROOT } from "./root.ts";

const SH_MESSAGE = "http://www.w3.org/ns/shacl#message";

/**
 * The app shows a shape's sh:message to the user in their language (see
 * docs/validation.md), so every message comes in English and Swedish,
 * each tagged, one of each.
 */
describe("the shapes' messages", () => {
  it("are each in English and Swedish, tagged", async () => {
    const wrong: string[] = [];
    for (const { path, turtle } of await readTurtleTree(`${VOCAB_ROOT}shapes`)) {
      const bySubject = new Map<string, string[]>();
      for (const q of parseTurtle(turtle, `https://solid-memo.com/shapes/${path}`)) {
        if (q.predicate.value !== SH_MESSAGE) continue;
        const tag = q.object.termType === "Literal" ? q.object.language : "";
        bySubject.set(q.subject.value, [...(bySubject.get(q.subject.value) ?? []), tag || "(untagged)"]);
      }
      for (const [subject, tags] of bySubject) {
        if (tags.sort().join(",") !== "en,sv") wrong.push(`${path} <${subject}>: ${tags.join(", ")}`);
      }
    }
    expect(wrong).toEqual([]);
  });
});
