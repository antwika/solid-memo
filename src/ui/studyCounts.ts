/**
 * Short summary of what a deck has left to study today, e.g. "12 due",
 * "12 due · 5 new" or "5 new"; null when there is nothing to study.
 */
export function studyCountsSummary(counts: {
  dueCount: number;
  newCount: number;
}): string | null {
  const parts: string[] = [];
  if (counts.dueCount > 0) parts.push(`${counts.dueCount} due`);
  if (counts.newCount > 0) parts.push(`${counts.newCount} new`);
  return parts.length === 0 ? null : parts.join(" · ");
}

/** "1 card" / "n cards". */
export function cardCount(count: number): string {
  return count === 1 ? "1 card" : `${count} cards`;
}
