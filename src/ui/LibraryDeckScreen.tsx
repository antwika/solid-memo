import { licenseLabel } from "../domain/license";
import type { LibraryDeck, LibrarySource } from "../domain/library";
import { AuthorNames } from "./AuthorName";
import { DIRECTION_LABELS } from "./direction";
import { ExternalLink } from "./ExternalLink";
import { LibraryIcon } from "./icons";
import { linkify } from "./linkify";
import { cardCount } from "./studyCounts";

/** "September 22, 2026" — the day the deck says it was made. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en", {
    dateStyle: "long",
    timeZone: "UTC",
  });
}

/**
 * One library deck in full — its blurb, who made it and under what
 * terms, when, and what it was compiled from — with a look at its cards
 * and an import button for this deck alone. Everything shown comes from
 * the library index, so any link in it goes through ExternalLink.
 */
export function LibraryDeckScreen({
  deck,
  deckHref,
  imported,
  busy,
  error,
  onBrowse,
  onImport,
}: {
  deck: LibraryDeck;
  /** URL of this page; the heading links here like every screen's. */
  deckHref: string;
  /** The instance already holds a copy; a second one is still allowed. */
  imported: boolean;
  /** The import is in progress. */
  busy: boolean;
  error: string | null;
  /** Open the deck's card list. */
  onBrowse: () => void;
  onImport: () => void;
}) {
  return (
    <section>
      <header>
        <h2>
          <a href={deckHref}>
            <LibraryIcon />
            {deck.name}
          </a>
        </h2>
        <button onClick={onBrowse}>Browse cards</button>
      </header>
      {deck.description !== undefined && (
        <p class="deck-description">{linkify(deck.description)}</p>
      )}
      <dl class="facts">
        <dt>Size</dt>
        <dd>{cardCount(deck.cardCount)}</dd>
        <dt>Studied</dt>
        <dd>
          {DIRECTION_LABELS[deck.direction]}
          {deck.direction === "bidirectional" &&
            " — every card is asked both ways; change it after importing"}
        </dd>
        {deck.authors.length > 0 && (
          <>
            <dt>{deck.authors.length === 1 ? "Author" : "Authors"}</dt>
            <dd>
              <AuthorNames authors={deck.authors} />
            </dd>
          </>
        )}
        {deck.license !== undefined && (
          <>
            <dt>Licence</dt>
            <dd>
              <ExternalLink url={deck.license}>
                {licenseLabel(deck.license)}
              </ExternalLink>
            </dd>
          </>
        )}
        {deck.createdAt !== undefined && (
          <>
            <dt>Created</dt>
            <dd>{formatDate(deck.createdAt)}</dd>
          </>
        )}
        {deck.sources.length > 0 && (
          <>
            <dt>{deck.sources.length === 1 ? "Source" : "Sources"}</dt>
            <dd>
              <ul class="sources">
                {deck.sources.map((source) => (
                  <li key={source.url}>
                    <SourceLine source={source} />
                  </li>
                ))}
              </ul>
            </dd>
          </>
        )}
      </dl>
      <div class="actions">
        <button class="primary" onClick={onImport} disabled={busy}>
          {busy ? "Importing…" : "Import this deck"}
        </button>
        {imported && (
          <span class="hint library-imported">Already imported</span>
        )}
      </div>
      {error && <p class="error">{error}</p>}
    </section>
  );
}

/**
 * "List of national capitals — Wikipedia contributors · CC BY-SA 4.0":
 * the source, linked, and its own authors and licence when the deck
 * states them.
 */
function SourceLine({ source }: { source: LibrarySource }) {
  const hasAuthors = source.authors.length > 0;
  const hasLicense = source.license !== undefined;
  return (
    <>
      <ExternalLink url={source.url}>{source.title ?? source.url}</ExternalLink>
      {(hasAuthors || hasLicense) && (
        <span class="hint">
          {" — "}
          {hasAuthors && <AuthorNames authors={source.authors} />}
          {hasAuthors && hasLicense && " · "}
          {hasLicense && (
            <ExternalLink url={source.license!}>
              {licenseLabel(source.license!)}
            </ExternalLink>
          )}
        </span>
      )}
    </>
  );
}
