/** An authenticated session with a Solid identity provider. */
export interface Session {
  webId: string;
}

/**
 * How a session came about: "login" when the user just completed the
 * login redirect, "restored" when an earlier session was silently resumed.
 */
export type SessionOrigin = "login" | "restored";

/** A session together with how it was established. */
export interface EstablishedSession {
  session: Session;
  origin: SessionOrigin;
}
