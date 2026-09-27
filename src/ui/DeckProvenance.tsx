import type { ComponentChildren } from "preact";
import { licenseLabel } from "../domain/license";
import { AuthorNames } from "./AuthorName";
import { ExternalLink } from "./ExternalLink";
import { formatDate } from "./formatDate";
import { linkify } from "./linkify";

/**
 * "By Anton Wiklund · CC0 1.0 · Updated September 27, 2026", and under
 * it the deck's description when it has one: who made a deck, under what
 * terms, when it last changed, and where its content came from. Renders
 * nothing when none is stated, as for most home-made decks. The licence
 * URL and any URL in the description come from deck data, so they go
 * through ExternalLink.
 */
export function DeckProvenance({
  authors,
  license,
  modifiedAt,
  description,
}: {
  authors: string[];
  license?: string;
  /** ISO dateTime of the deck's last change, when it says. */
  modifiedAt?: string;
  description?: string;
}) {
  const parts: ComponentChildren[] = [];
  if (authors.length > 0) {
    parts.push(
      <span>
        By <AuthorNames authors={authors} />
      </span>,
    );
  }
  if (license !== undefined) {
    parts.push(<ExternalLink url={license}>{licenseLabel(license)}</ExternalLink>);
  }
  if (modifiedAt !== undefined) {
    parts.push(<span>Updated {formatDate(modifiedAt)}</span>);
  }
  if (parts.length === 0 && description === undefined) return null;
  return (
    <span class="hint provenance">
      {parts.map((part, i) => (
        <>
          {i > 0 && " · "}
          {part}
        </>
      ))}
      {description !== undefined && (
        <span class="deck-description">{linkify(description)}</span>
      )}
    </span>
  );
}
