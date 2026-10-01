import { useI18n } from "./i18n";

/** Site-wide attribution and build version, shown under every screen. */
export function Footer({
  /** Full commit hash of the build; the line is left out when unknown. */
  commitSha = __COMMIT_SHA__,
}: {
  commitSha?: string | null;
}) {
  const { tx } = useI18n();
  return (
    <footer class="site-footer">
      <p>
        {tx("footer.createdBy", {
          author: (
            <a href="https://github.com/antwika" target="_blank" rel="noopener noreferrer">
              antwika
            </a>
          ),
        })}
      </p>
      {commitSha !== null && (
        <p>
          {tx("footer.version", {
            version: (
              <a
                href={`https://github.com/antwika/solid-memo/commit/${commitSha}`}
                title={commitSha}
                target="_blank"
                rel="noopener noreferrer"
              >
                {commitSha.slice(0, 7)}
              </a>
            ),
          })}
        </p>
      )}
    </footer>
  );
}
