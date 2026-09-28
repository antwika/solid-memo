import { describe, expect, it } from "vitest";
import { agentToRecord, agentUrlOf, authorFromAgentRecord } from "./agentRecord";

const CATALOG = "https://pod.example/solid-memo/a/catalog.ttl";

describe("agentUrlOf", () => {
  it("names the agent after the author, in the subject's document", () => {
    expect(agentUrlOf(`${CATALOG}#deck-1`, "Anton Wiklund <anton@example.com>")).toBe(
      `${CATALOG}#agent-anton-wiklund-anton-example-com`,
    );
    expect(agentUrlOf(CATALOG, "  Åsa Öberg  ")).toBe(`${CATALOG}#agent-asa-oberg`);
  });

  it("names an author without letters or digits by a placeholder", () => {
    expect(agentUrlOf(`${CATALOG}#deck-1`, "—")).toBe(`${CATALOG}#agent-unnamed`);
  });
});

describe("agent records", () => {
  it("round-trip a name and an address", () => {
    expect(agentToRecord("Anton <anton@example.com>")).toEqual({
      name: "Anton",
      mbox: "mailto:anton@example.com",
    });
    expect(authorFromAgentRecord(agentToRecord("Anton <anton@example.com>"))).toBe(
      "Anton <anton@example.com>",
    );
    expect(agentToRecord("A friend")).toEqual({ name: "A friend" });
    expect(authorFromAgentRecord({ name: "A friend" })).toBe("A friend");
  });

  it("show only the name for a mailbox that is not a mailto: IRI", () => {
    expect(authorFromAgentRecord({ name: "Anton", mbox: "https://example.com/" })).toBe("Anton");
  });
});
