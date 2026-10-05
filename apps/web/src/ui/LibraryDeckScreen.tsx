import { licenseLabel } from "@solid-memo/domain/license";
import { keywordsIn } from "@solid-memo/domain/keywords";
import { topicLabels, type LibraryDeck, type LibrarySource } from "@solid-memo/domain/library";
import type { DeckStats } from "@solid-memo/domain/libraryStats";
import { AuthorNames } from "./AuthorName";
import { ErrorMessage } from "./ErrorMessage";
import { ExternalLink } from "./ExternalLink";
import { useI18n, type ErrorText } from "./i18n";
import { HeartIcon, LibraryIcon } from "./icons";
import { linkify } from "./linkify";
import { ReaderText, ReaderTexts } from "./ReaderText";

/**
 * One library deck in full — its blurb, what it is about (its keywords
 * only those in the reader's language), who made it
 * and under what terms, when it was made and last changed, which
 * release it is and what changed in it, and what it was compiled from —
 * with a look at its cards and an import button for this deck alone;
 * how many have imported and like it, once the library has counted
 * them; and a like button, for a user logged in with a pod.
 * Everything shown comes from the library index, so any link in it goes
 * through ExternalLink.
 */
export function LibraryDeckScreen({
  deck,
  browseHref,
  previewHref,
  imported,
  busy,
  error,
  onImport,
  stats,
  like,
}: {
  deck: LibraryDeck;
  /** URL of the deck's card list. */
  browseHref: string;
  /** URL of the deck's preview, which tries its cards before import. */
  previewHref: string;
  /** The instance already holds a copy; a second one is still allowed. */
  imported: boolean;
  /** The import is in progress. */
  busy: boolean;
  error: ErrorText | null;
  onImport: () => void;
  /** The deck's counts and when they were counted; absent until the library has counted any. */
  stats?: DeckStats & { countedAt: string };
  /**
   * Whether the user likes the deck, and the toggle; "guest" for a guest,
   * who has no WebID to like as.
   */
  like:
    | "guest"
    | { liked: boolean; busy: boolean; error: ErrorText | null; onToggle: () => void };
}) {
  const { t, locale, readerText, readerLang, formatDate, directionLabel } = useI18n();
  const topics = topicLabels(deck.themes);
  /** Only those in the reader's language: none in it, no keywords shown. */
  const keywords = keywordsIn(deck.keywords, locale);
  const current = deck.releases.find((release) => release.url === deck.url);
  return (
    <section>
      <header>
        <h2>
          <LibraryIcon />
          <ReaderText text={deck.title} />
        </h2>
        <a class="button" href={browseHref}>
          {t("libraryDeck.browseCards")}
        </a>
      </header>
      {deck.description !== undefined && (
        <p class="deck-description" lang={readerLang(deck.description)}>
          {linkify(readerText(deck.description))}
        </p>
      )}
      <dl class="facts">
        <dt>{t("libraryDeck.size")}</dt>
        <dd>{t("common.cardCount", { count: deck.cardCount })}</dd>
        <dt>{t("libraryDeck.studied")}</dt>
        <dd>
          {deck.direction === "bidirectional"
            ? t("libraryDeck.bothWays", { direction: directionLabel(deck.direction) })
            : directionLabel(deck.direction)}
        </dd>
        {topics.length > 0 && (
          <>
            <dt>{t("libraryDeck.topics", { count: topics.length })}</dt>
            <dd>
              <ReaderTexts texts={topics} />
            </dd>
          </>
        )}
        {keywords.length > 0 && (
          <>
            <dt>{t("libraryDeck.keywords")}</dt>
            <dd>{keywords.join(", ")}</dd>
          </>
        )}
        {stats !== undefined && (
          <>
            <dt>{t("libraryDeck.downloads")}</dt>
            <dd>{t("libraryDeck.countAsOf", { count: stats.downloads, date: formatDate(stats.countedAt) })}</dd>
            <dt>{t("libraryDeck.likes")}</dt>
            <dd>{t("libraryDeck.countAsOf", { count: stats.likes, date: formatDate(stats.countedAt) })}</dd>
          </>
        )}
        <dt>{t("libraryDeck.release")}</dt>
        <dd>
          {current?.issued === undefined
            ? t("libraryDeck.version", { version: deck.version })
            : t("libraryDeck.versionReleased", {
                version: deck.version,
                date: formatDate(current.issued),
              })}
        </dd>
        {deck.versionNotes !== undefined && (
          <>
            <dt>{t("libraryDeck.releaseNotes")}</dt>
            <dd>{deck.versionNotes}</dd>
          </>
        )}
        {deck.authors.length > 0 && (
          <>
            <dt>{t("libraryDeck.authors", { count: deck.authors.length })}</dt>
            <dd>
              <AuthorNames authors={deck.authors} />
            </dd>
          </>
        )}
        {deck.license !== undefined && (
          <>
            <dt>{t("libraryDeck.licence")}</dt>
            <dd>
              <ExternalLink url={deck.license}>
                {licenseLabel(deck.license)}
              </ExternalLink>
            </dd>
          </>
        )}
        {deck.createdAt !== undefined && (
          <>
            <dt>{t("libraryDeck.created")}</dt>
            <dd>{formatDate(deck.createdAt)}</dd>
          </>
        )}
        {deck.modifiedAt !== undefined && (
          <>
            <dt>{t("libraryDeck.updated")}</dt>
            <dd>{formatDate(deck.modifiedAt)}</dd>
          </>
        )}
        {deck.sources.length > 0 && (
          <>
            <dt>{t("libraryDeck.sources", { count: deck.sources.length })}</dt>
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
          {busy ? t("libraryDeck.importing") : t("libraryDeck.import")}
        </button>
        <a class="button" href={previewHref}>
          {t("libraryDeck.preview")}
        </a>
        {like !== "guest" && (
          // Only aria-disabled while it saves, so it keeps the focus.
          <button
            class="library-like"
            aria-pressed={like.liked}
            aria-disabled={like.busy}
            onClick={() => {
              if (!like.busy) like.onToggle();
            }}
          >
            <HeartIcon filled={like.liked} />
            {like.busy ? t("libraryDeck.liking") : t("libraryDeck.like")}
          </button>
        )}
        {imported && (
          <span class="hint library-imported">{t("libraryDeck.alreadyImported")}</span>
        )}
      </div>
      {like === "guest" ? (
        <p class="hint">{t("libraryDeck.likeGuest")}</p>
      ) : (
        like.liked && <p class="hint">{t("libraryDeck.likedNote")}</p>
      )}
      <ErrorMessage error={error} />
      {like !== "guest" && <ErrorMessage error={like.error} />}
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
