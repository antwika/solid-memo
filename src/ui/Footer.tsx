/** Site-wide attribution and build version, shown under every screen. */
export function Footer({
  /** Full commit hash of the build; the line is left out when unknown. */
  commitSha = __COMMIT_SHA__,
}: {
  commitSha?: string | null;
}) {
  return (
    <footer class="site-footer">
      <p>
        Created by{" "}
        <a href="https://github.com/antwika" target="_blank" rel="noopener noreferrer">
          antwika
        </a>
      </p>
      {commitSha !== null && (
        <p>
          Version{" "}
          <a
            href={`https://github.com/antwika/solid-memo/commit/${commitSha}`}
            title={commitSha}
            target="_blank"
            rel="noopener noreferrer"
          >
            {commitSha.slice(0, 7)}
          </a>
        </p>
      )}
    </footer>
  );
}
