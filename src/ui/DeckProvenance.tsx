import { licenseLabel } from "../domain/license";
import { ExternalLink } from "./ExternalLink";

/**
 * "By Anton Wiklund · CC0 1.0", and under it the deck's description when
 * it has one: who made a deck, under what terms, and where its content
 * came from. Renders nothing when none is stated, as for most home-made
 * decks. The licence URL and any URL in the description come from deck
 * data, so they go through ExternalLink.
 */
export function DeckProvenance({
  authors,
  license,
  description,
}: {
  authors: string[];
  license?: string;
  description?: string;
}) {
  const hasByline = authors.length > 0 || license !== undefined;
  if (!hasByline && description === undefined) return null;
  return (
    <span class="hint provenance">
      {authors.length > 0 && <span>By {authors.join(", ")}</span>}
      {authors.length > 0 && license !== undefined && " · "}
      {license !== undefined && (
        <ExternalLink url={license}>{licenseLabel(license)}</ExternalLink>
      )}
      {description !== undefined && (
        <span class="deck-description">{linkify(description)}</span>
      )}
    </span>
  );
}

/** A URL in running text, minus any punctuation that closes the sentence. */
const URL_IN_TEXT = /(https?:\/\/[^\s]*[^\s.,;:!?)])/;

/** The text with its web addresses as links, so a source can be visited. */
function linkify(text: string) {
  return text
    .split(URL_IN_TEXT)
    .map((part, i) =>
      i % 2 === 1 ? <ExternalLink key={i} url={part} /> : part,
    );
}
