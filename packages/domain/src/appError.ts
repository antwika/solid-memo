/**
 * Errors the user may see, each named by a code, so the app can show it in
 * the reader's language: the message catalogues hold every code under
 * `errors.<code>` (apps/web/src/i18n), the English one exactly as here, which
 * a test holds them to. An error's `message` is the English text with its
 * values filled in, for logs and tests. Errors only a programming mistake
 * can cause stay plain Errors.
 */

/** An error's text, or one per plural category, chosen by its `count`. */
export type ErrorTemplate = string | { one: string; other: string };

/** Values for an error text's `{name}` placeholders. */
export type ErrorVars = Readonly<Record<string, string | number>>;

export const ERROR_TEMPLATES = {
  cardFrontImageNotWebUrl: "The front image must be an http(s) URL.",
  cardBackImageNotWebUrl: "The back image must be an http(s) URL.",
  cardFrontEmpty: "The front needs text or an image.",
  cardBackEmpty: "The back needs text or an image.",
  deckNeedsDescription: "A deck needs a description.",
  dailyLimitInvalid: "A daily limit is a whole number, 0 or more.",
  webIdEmpty: "Enter your WebID.",
  webIdInvalidUrl: "That is not a valid URL. A WebID looks like https://you.example/profile/card#me.",
  webIdNotHttps: "A WebID must start with https://.",
  webIdWithCredentials: "A WebID must not contain a username or password.",
  providerNotHttps: "An identity provider must be an https:// URL.",
  webIdNoSubject: "No subject <{webId}> found in the WebID document.",
  webIdNoIssuer: "The WebID document does not declare a solid:oidcIssuer for <{webId}>.",
  webIdIssuerNotHttps: "The solid:oidcIssuer declared for <{webId}> is not a valid https:// URL.",
  profileNoSubject: "No subject <{webId}> found in the profile document.",
  privateTypeIndexNotLinked: "Could not link the private type index <{index}> from any profile document:\n{failures}",
  publicTypeIndexNotLinked: "Could not link the public type index <{index}> from any profile document:\n{failures}",
  storageInaccessible: "Cannot access <{url}> (HTTP {status}).",
  notAnInstanceNoMeta: "<{url}> is not a Solid Memo instance (no readable meta.ttl).",
  notAnInstanceNoSubject: "<{url}> is not a Solid Memo instance (meta.ttl has no #it subject).",
  notRegistered: "<{url}> is registered in no type index; there is nothing to switch.",
  noMetaToUpdate: "<{url}> has no meta document to update.",
  noBackup: "{instance} has no backup to restore.",
  updatedCopyInvalid: {
    one: "The updated copy does not conform to Solid Memo's shapes ({count} violation); your data is left as it was.",
    other: "The updated copy does not conform to Solid Memo's shapes ({count} violations); your data is left as it was.",
  },
  movedCopyInvalid: {
    one: "The copy in your pod does not conform to Solid Memo's shapes ({count} violation); your study is left as it was.",
    other: "The copy in your pod does not conform to Solid Memo's shapes ({count} violations); your study is left as it was.",
  },
  guestUrlsLeft: "<{url}> still names the guest's pod after the move; your study is left as it was.",
  instanceChangedDuringCopy: "The instance changed while it was being copied (in another tab or app?); try again.",
  resourceChangedDuringCopy: "<{url}> changed while it was being copied (in another tab or app?); try again.",
  instanceBeingUpdated:
    "Solid Memo is updating the instance at {container} and writes nothing to it until the update is over (refused: {method} {url}).",
  deckChangedSinceOffer:
    "The deck changed since the update was offered (in another tab or app?); nothing was changed. Look at the offer again.",
  upgradedCardsDiffer:
    "The pod does not hold the new cards as Solid Memo wrote them to <{url}>.",
  upgradedReviewsDiffer:
    "The pod does not hold the review states as Solid Memo wrote them to <{url}>.",
  deckChangedDuringUpgrade:
    "<{url}> changed while the deck was being updated (in another tab or app?).",
  deckBeingUpgraded:
    "Solid Memo is updating the deck in {document} and writes nothing to it until the update is over (refused: {method} {url}).",
  changedElsewhere:
    "{url} was changed elsewhere (in another tab or app?) since Solid Memo read it, so nothing was saved. Reload and try again.",
  createdElsewhere:
    "{url} was created elsewhere (in another tab or app?) while Solid Memo was about to create it, so nothing was saved. Reload and try again.",
  alreadyExists: "<{url}> already exists.",
  cannotCheck: "Could not check <{url}>: {status}.",
  accessControlUnknown: "The pod does not say where the access control of <{url}> goes.",
  dataNotConforming: "Solid Memo did not save data that does not conform to its shapes:\n  {problems}",
  deckGone: "The deck <{deck}> no longer exists.",
  cardsDocumentGone: "The cards document of <{deck}> no longer exists.",
  cardGone: "Card <{card}> no longer exists.",
  notADeck: "<{url}> is not a Solid Memo deck.",
  libraryDeckTooNew: "<{url}> is in deck format {version}, newer than this app supports ({latest}).",
  libraryCardTooNew: "<{card}> in <{url}> is in card format {version}, newer than this app supports ({latest}).",
} as const satisfies Record<string, ErrorTemplate>;

export type ErrorCode = keyof typeof ERROR_TEMPLATES;

const PLACEHOLDER = /\{(\w+)\}/g;

/** An error text with its values filled in, in English (plural by `count`, 1 being singular). */
export function fillTemplate(template: ErrorTemplate, vars: ErrorVars): string {
  const text = typeof template === "string" ? template : vars.count === 1 ? template.one : template.other;
  return text.replace(PLACEHOLDER, (whole, name: string) => (name in vars ? String(vars[name]) : whole));
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly vars: ErrorVars;

  constructor(code: ErrorCode, vars: ErrorVars = {}) {
    super(fillTemplate(ERROR_TEMPLATES[code], vars));
    this.name = "AppError";
    this.code = code;
    this.vars = vars;
  }
}
