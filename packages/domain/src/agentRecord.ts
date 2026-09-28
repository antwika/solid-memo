import { parseAuthor } from "./author";
import type { AgentV1 } from "@solid-memo/vocab/types.generated";
import { documentUrlOf } from "./subjectUrl";

/**
 * Who made a deck, between the "Name <email>" strings the app shows and
 * the foaf:Agent nodes deck format 3 names as its creators (see
 * docs/data-model.md). An agent is written beside what it made, in the
 * same document, named after the author: the same author is one node.
 */

const MAILTO = "mailto:";

/** The agent node for an author, in the document of `subjectUrl`. */
export function agentUrlOf(subjectUrl: string, author: string): string {
  const slug = author
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${documentUrlOf(subjectUrl)}#agent-${slug === "" ? "unnamed" : slug}`;
}

export function agentToRecord(author: string): AgentV1 {
  const { name, email } = parseAuthor(author);
  return { name, ...(email === undefined ? {} : { mbox: `${MAILTO}${email}` }) };
}

export function authorFromAgentRecord(record: AgentV1): string {
  return record.mbox?.startsWith(MAILTO)
    ? `${record.name} <${record.mbox.slice(MAILTO.length)}>`
    : record.name;
}
