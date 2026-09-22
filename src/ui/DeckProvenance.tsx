import { licenseLabel } from "../domain/license";
import { ExternalLink } from "./ExternalLink";

/**
 * "By Anton Wiklund · CC0 1.0": who made a deck and under what terms.
 * Renders nothing when neither is stated, as for most home-made decks.
 * The licence URL comes from deck data, so it goes through ExternalLink.
 */
export function DeckProvenance({
  authors,
  license,
}: {
  authors: string[];
  license?: string;
}) {
  if (authors.length === 0 && license === undefined) return null;
  return (
    <span class="hint provenance">
      {authors.length > 0 && <span>By {authors.join(", ")}</span>}
      {authors.length > 0 && license !== undefined && " · "}
      {license !== undefined && (
        <ExternalLink url={license}>{licenseLabel(license)}</ExternalLink>
      )}
    </span>
  );
}
