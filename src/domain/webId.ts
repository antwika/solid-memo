/** Outcome of validating user input as a WebID. */
export type WebIdValidation =
  | { ok: true; webId: string }
  | { ok: false; error: string };

function parseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function hasCredentials(url: URL): boolean {
  return url.username !== "" || url.password !== "";
}

/**
 * True for an absolute https: URL without embedded credentials. Every
 * URL that steers authentication (WebID, OIDC issuer) must pass this
 * before it is used.
 */
export function isSecureUrl(value: string): boolean {
  const url = parseUrl(value);
  return url !== null && url.protocol === "https:" && !hasCredentials(url);
}

const LINKABLE_PROTOCOLS = ["https:", "http:", "mailto:"];

/**
 * True when a value read from a pod may be used as a link target. Pod data
 * is untrusted: anything else (javascript:, data:, …) must stay plain text.
 */
export function isLinkableUrl(value: string): boolean {
  const url = parseUrl(value);
  return url !== null && LINKABLE_PROTOCOLS.includes(url.protocol);
}

/**
 * Validate user input as a WebID: an absolute https: URL. Returns the
 * normalized WebID, or a message suitable for showing next to the field.
 */
export function validateWebId(input: string): WebIdValidation {
  const trimmed = input.trim();
  if (trimmed === "") {
    return { ok: false, error: "Enter your WebID." };
  }
  const url = parseUrl(trimmed);
  if (url === null) {
    return {
      ok: false,
      error:
        "That is not a valid URL. A WebID looks like https://you.example/profile/card#me.",
    };
  }
  if (url.protocol !== "https:") {
    return { ok: false, error: "A WebID must start with https://." };
  }
  if (hasCredentials(url)) {
    return {
      ok: false,
      error: "A WebID must not contain a username or password.",
    };
  }
  return { ok: true, webId: url.href };
}
