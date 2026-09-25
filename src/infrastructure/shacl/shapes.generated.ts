/* Generated from shapes/<class>/v<N>.ttl by `npm run generate`. Do not edit: change the source and regenerate. */

import type { ShapeDescriptor } from "./shapeDescriptor";
import type {
  CardV1,
  CardV2,
  DeckV1,
  DeckV2,
  InstanceV1,
  LibraryDeckV1,
  LibraryDeckV2,
  PreferencesV1,
  PreferencesV2,
  ReviewStateV1,
  ReviewStateV2,
} from "../../domain/shapes/generated";

export const CARD_V1: ShapeDescriptor<CardV1> = {
  shape: "card",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Card",
  shapeIri: "https://solid-memo.com/shapes/card/v1.ttl#shape",
  shapeDocument: "card/v1.ttl",
  context: "any",
  fields: [
    { name: "front", predicate: "https://solid-memo.com/vocab/v1#front", kind: "string", cardinality: "one" },
    { name: "back", predicate: "https://solid-memo.com/vocab/v1#back", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
  ],
};

export const CARD_V2: ShapeDescriptor<CardV2> = {
  shape: "card",
  version: 2,
  targetClass: "https://solid-memo.com/vocab/v1#Card",
  shapeIri: "https://solid-memo.com/shapes/card/v2.ttl#shape",
  shapeDocument: "card/v2.ttl",
  context: "any",
  fields: [
    { name: "front", predicate: "https://solid-memo.com/vocab/v1#front", kind: "string", cardinality: "optional" },
    { name: "back", predicate: "https://solid-memo.com/vocab/v1#back", kind: "string", cardinality: "optional" },
    { name: "frontImage", predicate: "https://solid-memo.com/vocab/v1#frontImage", kind: "iri", cardinality: "optional" },
    { name: "backImage", predicate: "https://solid-memo.com/vocab/v1#backImage", kind: "iri", cardinality: "optional" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
  ],
};

export const DECK_V1: ShapeDescriptor<DeckV1> = {
  shape: "deck",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  shapeIri: "https://solid-memo.com/shapes/deck/v1.ttl#inPod",
  shapeDocument: "deck/v1.ttl",
  context: "pod",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "string", cardinality: "many" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "optional" },
    { name: "cardsDocument", predicate: "https://solid-memo.com/vocab/v1#cardsDocument", kind: "iri", cardinality: "one" },
    { name: "reviewsDocument", predicate: "https://solid-memo.com/vocab/v1#reviewsDocument", kind: "iri", cardinality: "one" },
    { name: "source", predicate: "http://purl.org/dc/terms/source", kind: "iri", cardinality: "optional" },
  ],
};

export const DECK_V2: ShapeDescriptor<DeckV2> = {
  shape: "deck",
  version: 2,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  shapeIri: "https://solid-memo.com/shapes/deck/v2.ttl#inPod",
  shapeDocument: "deck/v2.ttl",
  context: "pod",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "string", cardinality: "many" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "optional" },
    { name: "direction", predicate: "https://solid-memo.com/vocab/v1#direction", kind: "enum", cardinality: "one", values: ["front-to-back","back-to-front","bidirectional"] },
    { name: "cardsDocument", predicate: "https://solid-memo.com/vocab/v1#cardsDocument", kind: "iri", cardinality: "one" },
    { name: "reviewsDocument", predicate: "https://solid-memo.com/vocab/v1#reviewsDocument", kind: "iri", cardinality: "one" },
    { name: "source", predicate: "http://purl.org/dc/terms/source", kind: "iri", cardinality: "optional" },
  ],
};

export const INSTANCE_V1: ShapeDescriptor<InstanceV1> = {
  shape: "instance",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Instance",
  shapeIri: "https://solid-memo.com/shapes/instance/v1.ttl#shape",
  shapeDocument: "instance/v1.ttl",
  context: "any",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "one" },
  ],
};

export const LIBRARY_DECK_V1: ShapeDescriptor<LibraryDeckV1> = {
  shape: "libraryDeck",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  shapeIri: "https://solid-memo.com/shapes/deck/v1.ttl#inLibrary",
  shapeDocument: "deck/v1.ttl",
  context: "library",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "string", cardinality: "many" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "optional" },
    { name: "source", predicate: "http://purl.org/dc/terms/source", kind: "iri", cardinality: "many" },
  ],
};

export const LIBRARY_DECK_V2: ShapeDescriptor<LibraryDeckV2> = {
  shape: "libraryDeck",
  version: 2,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  shapeIri: "https://solid-memo.com/shapes/deck/v2.ttl#inLibrary",
  shapeDocument: "deck/v2.ttl",
  context: "library",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "string", cardinality: "many" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "optional" },
    { name: "direction", predicate: "https://solid-memo.com/vocab/v1#direction", kind: "enum", cardinality: "one", values: ["front-to-back","back-to-front","bidirectional"] },
    { name: "source", predicate: "http://purl.org/dc/terms/source", kind: "iri", cardinality: "many" },
  ],
};

export const PREFERENCES_V1: ShapeDescriptor<PreferencesV1> = {
  shape: "preferences",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Preferences",
  shapeIri: "https://solid-memo.com/shapes/preferences/v1.ttl#shape",
  shapeDocument: "preferences/v1.ttl",
  context: "any",
  fields: [
    { name: "newCardsPerDay", predicate: "https://solid-memo.com/vocab/v1#newCardsPerDay", kind: "integer", cardinality: "optional" },
    { name: "maxReviewsPerDay", predicate: "https://solid-memo.com/vocab/v1#maxReviewsPerDay", kind: "integer", cardinality: "optional" },
    { name: "dayBoundaryHour", predicate: "https://solid-memo.com/vocab/v1#dayBoundaryHour", kind: "integer", cardinality: "optional" },
    { name: "answerScale", predicate: "https://solid-memo.com/vocab/v1#answerScale", kind: "enum", cardinality: "optional", values: ["sm2","minimal"] },
    { name: "developerMode", predicate: "https://solid-memo.com/vocab/v1#developerMode", kind: "boolean", cardinality: "optional" },
  ],
};

export const PREFERENCES_V2: ShapeDescriptor<PreferencesV2> = {
  shape: "preferences",
  version: 2,
  targetClass: "https://solid-memo.com/vocab/v1#Preferences",
  shapeIri: "https://solid-memo.com/shapes/preferences/v2.ttl#shape",
  shapeDocument: "preferences/v2.ttl",
  context: "any",
  fields: [
    { name: "newCardsPerDay", predicate: "https://solid-memo.com/vocab/v1#newCardsPerDay", kind: "integer", cardinality: "one" },
    { name: "maxReviewsPerDay", predicate: "https://solid-memo.com/vocab/v1#maxReviewsPerDay", kind: "integer", cardinality: "one" },
    { name: "dayBoundaryHour", predicate: "https://solid-memo.com/vocab/v1#dayBoundaryHour", kind: "integer", cardinality: "one" },
    { name: "answerScale", predicate: "https://solid-memo.com/vocab/v1#answerScale", kind: "enum", cardinality: "one", values: ["sm2","minimal"] },
    { name: "developerMode", predicate: "https://solid-memo.com/vocab/v1#developerMode", kind: "boolean", cardinality: "one" },
  ],
};

export const REVIEW_STATE_V1: ShapeDescriptor<ReviewStateV1> = {
  shape: "reviewState",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#ReviewState",
  shapeIri: "https://solid-memo.com/shapes/review-state/v1.ttl#shape",
  shapeDocument: "review-state/v1.ttl",
  context: "any",
  fields: [
    { name: "easeFactor", predicate: "https://solid-memo.com/vocab/v1#easeFactor", kind: "decimal", cardinality: "one" },
    { name: "intervalDays", predicate: "https://solid-memo.com/vocab/v1#intervalDays", kind: "integer", cardinality: "one" },
    { name: "repetitions", predicate: "https://solid-memo.com/vocab/v1#repetitions", kind: "integer", cardinality: "one" },
    { name: "due", predicate: "https://solid-memo.com/vocab/v1#due", kind: "string", cardinality: "one" },
    { name: "firstReviewedAt", predicate: "https://solid-memo.com/vocab/v1#firstReviewedAt", kind: "dateTime", cardinality: "one" },
    { name: "lastReviewedAt", predicate: "https://solid-memo.com/vocab/v1#lastReviewedAt", kind: "dateTime", cardinality: "one" },
    { name: "previousEaseFactor", predicate: "https://solid-memo.com/vocab/v1#previousEaseFactor", kind: "decimal", cardinality: "optional" },
    { name: "previousIntervalDays", predicate: "https://solid-memo.com/vocab/v1#previousIntervalDays", kind: "integer", cardinality: "optional" },
    { name: "previousRepetitions", predicate: "https://solid-memo.com/vocab/v1#previousRepetitions", kind: "integer", cardinality: "optional" },
    { name: "previousDue", predicate: "https://solid-memo.com/vocab/v1#previousDue", kind: "string", cardinality: "optional" },
    { name: "previousLastReviewedAt", predicate: "https://solid-memo.com/vocab/v1#previousLastReviewedAt", kind: "dateTime", cardinality: "optional" },
  ],
};

export const REVIEW_STATE_V2: ShapeDescriptor<ReviewStateV2> = {
  shape: "reviewState",
  version: 2,
  targetClass: "https://solid-memo.com/vocab/v1#ReviewState",
  shapeIri: "https://solid-memo.com/shapes/review-state/v2.ttl#shape",
  shapeDocument: "review-state/v2.ttl",
  context: "any",
  fields: [
    { name: "easeFactor", predicate: "https://solid-memo.com/vocab/v1#easeFactor", kind: "decimal", cardinality: "one" },
    { name: "intervalDays", predicate: "https://solid-memo.com/vocab/v1#intervalDays", kind: "integer", cardinality: "one" },
    { name: "repetitions", predicate: "https://solid-memo.com/vocab/v1#repetitions", kind: "integer", cardinality: "one" },
    { name: "due", predicate: "https://solid-memo.com/vocab/v1#due", kind: "string", cardinality: "one" },
    { name: "firstReviewedAt", predicate: "https://solid-memo.com/vocab/v1#firstReviewedAt", kind: "dateTime", cardinality: "one" },
    { name: "lastReviewedAt", predicate: "https://solid-memo.com/vocab/v1#lastReviewedAt", kind: "dateTime", cardinality: "one" },
    { name: "previousEaseFactor", predicate: "https://solid-memo.com/vocab/v1#previousEaseFactor", kind: "decimal", cardinality: "optional" },
    { name: "previousIntervalDays", predicate: "https://solid-memo.com/vocab/v1#previousIntervalDays", kind: "integer", cardinality: "optional" },
    { name: "previousRepetitions", predicate: "https://solid-memo.com/vocab/v1#previousRepetitions", kind: "integer", cardinality: "optional" },
    { name: "previousDue", predicate: "https://solid-memo.com/vocab/v1#previousDue", kind: "string", cardinality: "optional" },
    { name: "previousLastReviewedAt", predicate: "https://solid-memo.com/vocab/v1#previousLastReviewedAt", kind: "dateTime", cardinality: "optional" },
  ],
};

/** Every descriptor by kind and version. */
export const SHAPES = {
  card: { 1: CARD_V1, 2: CARD_V2 },
  deck: { 1: DECK_V1, 2: DECK_V2 },
  instance: { 1: INSTANCE_V1 },
  libraryDeck: { 1: LIBRARY_DECK_V1, 2: LIBRARY_DECK_V2 },
  preferences: { 1: PREFERENCES_V1, 2: PREFERENCES_V2 },
  reviewState: { 1: REVIEW_STATE_V1, 2: REVIEW_STATE_V2 },
} as const;

/** Every descriptor, for selection by class, version and context. */
export const ALL_SHAPES: readonly ShapeDescriptor[] = [
  CARD_V1,
  CARD_V2,
  DECK_V1,
  DECK_V2,
  INSTANCE_V1,
  LIBRARY_DECK_V1,
  LIBRARY_DECK_V2,
  PREFERENCES_V1,
  PREFERENCES_V2,
  REVIEW_STATE_V1,
  REVIEW_STATE_V2,
];
