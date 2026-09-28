/**
 * Short summary of what a deck has left to study today, e.g. "12 to
 * review": due and new in one number, since the row only needs to say
 * how much; null when there is nothing to study.
 */
export function studyCountsSummary(counts: {
  dueCount: number;
  newCount: number;
}): string | null {
  const total = counts.dueCount + counts.newCount;
  return total === 0 ? null : `${total} to review`;
}

/** "1 card" / "n cards". */
export function cardCount(count: number): string {
  return count === 1 ? "1 card" : `${count} cards`;
}
