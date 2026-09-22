/** Solid Memo's own vocabulary (see docs/data-model.md). */
const SM_NS = "https://solid-memo.com/vocab/v1#";
export const SM = {
  Instance: `${SM_NS}Instance`,
  Deck: `${SM_NS}Deck`,
  Card: `${SM_NS}Card`,
  ReviewState: `${SM_NS}ReviewState`,
  Preferences: `${SM_NS}Preferences`,
  formatVersion: `${SM_NS}formatVersion`,
  cardsDocument: `${SM_NS}cardsDocument`,
  reviewsDocument: `${SM_NS}reviewsDocument`,
  front: `${SM_NS}front`,
  back: `${SM_NS}back`,
  easeFactor: `${SM_NS}easeFactor`,
  intervalDays: `${SM_NS}intervalDays`,
  repetitions: `${SM_NS}repetitions`,
  due: `${SM_NS}due`,
  firstReviewedAt: `${SM_NS}firstReviewedAt`,
  lastReviewedAt: `${SM_NS}lastReviewedAt`,
  previousEaseFactor: `${SM_NS}previousEaseFactor`,
  previousIntervalDays: `${SM_NS}previousIntervalDays`,
  previousRepetitions: `${SM_NS}previousRepetitions`,
  previousDue: `${SM_NS}previousDue`,
  previousLastReviewedAt: `${SM_NS}previousLastReviewedAt`,
  newCardsPerDay: `${SM_NS}newCardsPerDay`,
  maxReviewsPerDay: `${SM_NS}maxReviewsPerDay`,
  dayBoundaryHour: `${SM_NS}dayBoundaryHour`,
  answerScale: `${SM_NS}answerScale`,
  developerMode: `${SM_NS}developerMode`,
  /** Library index only: how many cards a listed deck document holds. */
  cardCount: `${SM_NS}cardCount`,
} as const;

const SOLID_NS = "http://www.w3.org/ns/solid/terms#";
export const SOLID = {
  oidcIssuer: `${SOLID_NS}oidcIssuer`,
  publicTypeIndex: `${SOLID_NS}publicTypeIndex`,
  privateTypeIndex: `${SOLID_NS}privateTypeIndex`,
  TypeIndex: `${SOLID_NS}TypeIndex`,
  ListedDocument: `${SOLID_NS}ListedDocument`,
  UnlistedDocument: `${SOLID_NS}UnlistedDocument`,
  TypeRegistration: `${SOLID_NS}TypeRegistration`,
  forClass: `${SOLID_NS}forClass`,
  instance: `${SOLID_NS}instance`,
  instanceContainer: `${SOLID_NS}instanceContainer`,
} as const;

export const PIM = {
  preferencesFile: "http://www.w3.org/ns/pim/space#preferencesFile",
  storage: "http://www.w3.org/ns/pim/space#storage",
  Storage: "http://www.w3.org/ns/pim/space#Storage",
} as const;

export const DCTERMS = {
  title: "http://purl.org/dc/terms/title",
  created: "http://purl.org/dc/terms/created",
  /** On an imported deck: the library document it was copied from. */
  source: "http://purl.org/dc/terms/source",
  /** A deck's author (one triple per name). */
  creator: "http://purl.org/dc/terms/creator",
  /** The licence URL a deck's content is offered under. */
  license: "http://purl.org/dc/terms/license",
} as const;

export const RDF = {
  type: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
} as const;

export const RDFS = {
  seeAlso: "http://www.w3.org/2000/01/rdf-schema#seeAlso",
} as const;

export const FOAF = {
  isPrimaryTopicOf: "http://xmlns.com/foaf/0.1/isPrimaryTopicOf",
} as const;
