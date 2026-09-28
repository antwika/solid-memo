/** "September 22, 2026" — the day a deck says it was made or changed. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en", {
    dateStyle: "long",
    timeZone: "UTC",
  });
}
