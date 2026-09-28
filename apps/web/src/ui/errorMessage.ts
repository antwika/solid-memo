/** Human-readable message from an unknown thrown value; null when no error. */
export function errorMessage(error: unknown): string | null {
  if (error === null || error === undefined) return null;
  return error instanceof Error ? error.message : String(error);
}
