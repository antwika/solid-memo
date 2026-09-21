/**
 * The user's Solid account as discovered after login. Everything beyond
 * the WebID comes from the WebID profile and may be absent.
 */
export interface SolidAccount {
  webId: string;
  /** Root of the user's Pod (first storage the profile advertises). */
  podUrl?: string;
  /** Identity provider the profile declares via solid:oidcIssuer. */
  oidcIssuer?: string;
}
