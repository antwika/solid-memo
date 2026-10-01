/**
 * What a server does that the tests depend on, asked of it rather than
 * assumed (docs/testing.md).
 */

/** The reason a test is skipped on a server whose ETag outlives an edit. */
export const ETAG_OUTLIVES_EDITS =
  "this server's ETag does not change on an edit made in the same second (Community Solid Server 6 stamps whole seconds), so a changed document can look unchanged";

/**
 * Whether the server's ETag changes on every edit, however soon after a
 * read: a document is written, read, edited at once and read again.
 * Community Solid Server 6 builds its ETag from the modification time in
 * whole seconds, so an edit in the same second keeps it. False too for a
 * server that gives no ETag.
 */
export async function etagMarksEveryEdit(server: string): Promise<boolean> {
  const url = new URL(`etag-probe-${crypto.randomUUID()}.ttl`, server).href;
  await fetch(url, { method: "PUT", headers: { "content-type": "text/turtle" }, body: `<#a> <#b> "1" .` });
  const before = (await fetch(url)).headers.get("etag");
  await fetch(url, {
    method: "PATCH",
    headers: { "content-type": "application/sparql-update" },
    body: `INSERT DATA { <#c> <#d> "2" . };`,
  });
  const after = (await fetch(url)).headers.get("etag");
  return before !== null && before !== after;
}
