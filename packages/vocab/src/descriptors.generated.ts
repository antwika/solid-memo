/* Generated from shapes/<class>/v<N>.ttl by `npm run generate`. Do not edit: change the source and regenerate. */

import type { ShapeDescriptor } from "./shapeDescriptor.ts";
import type {
  AgentV1,
  CardV1,
  CardV2,
  CatalogV1,
  DeckV1,
  DeckV2,
  DeckV3,
  DistributionV1,
  InstanceV1,
  InstanceV2,
  LibraryDeckV1,
  LibraryDeckV2,
  LibraryDeckV3,
  LibraryDeckSeriesV1,
  PreferencesV1,
  PreferencesV2,
  PreferencesV3,
  ReviewStateV1,
  ReviewStateV2,
} from "./types.generated.ts";

export const AGENT_V1: ShapeDescriptor<AgentV1> = {
  shape: "agent",
  version: 1,
  targetClass: "http://xmlns.com/foaf/0.1/Agent",
  additionalTypes: [],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/agent/v1.ttl#shape",
  shapeDocument: "agent/v1.ttl",
  context: "any",
  fields: [
    { name: "name", predicate: "http://xmlns.com/foaf/0.1/name", kind: "string", cardinality: "one" },
    { name: "mbox", predicate: "http://xmlns.com/foaf/0.1/mbox", kind: "iri", cardinality: "optional" },
  ],
};

export const CARD_V1: ShapeDescriptor<CardV1> = {
  shape: "card",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Card",
  additionalTypes: [],
  absent: [],
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
  additionalTypes: [],
  absent: [],
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

export const CATALOG_V1: ShapeDescriptor<CatalogV1> = {
  shape: "catalog",
  version: 1,
  targetClass: "http://www.w3.org/ns/dcat#Catalog",
  additionalTypes: [],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/catalog/v1.ttl#shape",
  shapeDocument: "catalog/v1.ttl",
  context: "any",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "one" },
    { name: "publisher", predicate: "http://purl.org/dc/terms/publisher", kind: "iri", cardinality: "one" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "modified", predicate: "http://purl.org/dc/terms/modified", kind: "dateTime", cardinality: "optional" },
    { name: "themeTaxonomy", predicate: "http://www.w3.org/ns/dcat#themeTaxonomy", kind: "iri", cardinality: "many" },
    { name: "dataset", predicate: "http://www.w3.org/ns/dcat#dataset", kind: "iri", cardinality: "many" },
  ],
};

export const DECK_V1: ShapeDescriptor<DeckV1> = {
  shape: "deck",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  additionalTypes: [],
  absent: [],
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
  additionalTypes: [],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/deck/v2.ttl#inPod",
  shapeDocument: "deck/v2.ttl",
  context: "pod",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "modified", predicate: "http://purl.org/dc/terms/modified", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "string", cardinality: "many" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "optional" },
    { name: "direction", predicate: "https://solid-memo.com/vocab/v1#direction", kind: "enum", cardinality: "one", values: ["front-to-back","back-to-front","bidirectional"] },
    { name: "cardsDocument", predicate: "https://solid-memo.com/vocab/v1#cardsDocument", kind: "iri", cardinality: "one" },
    { name: "reviewsDocument", predicate: "https://solid-memo.com/vocab/v1#reviewsDocument", kind: "iri", cardinality: "one" },
    { name: "source", predicate: "http://purl.org/dc/terms/source", kind: "iri", cardinality: "optional" },
  ],
};

export const DECK_V3: ShapeDescriptor<DeckV3> = {
  shape: "deck",
  version: 3,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  additionalTypes: ["http://www.w3.org/ns/dcat#Dataset"],
  absent: ["https://solid-memo.com/vocab/v1#direction","http://purl.org/dc/terms/source"],
  shapeIri: "https://solid-memo.com/shapes/deck/v3.ttl#inPod",
  shapeDocument: "deck/v3.ttl",
  context: "pod",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "modified", predicate: "http://purl.org/dc/terms/modified", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "iri", cardinality: "many" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "studyDirection", predicate: "https://solid-memo.com/vocab/v1#studyDirection", kind: "iriEnum", cardinality: "one", values: ["https://solid-memo.com/vocab/v1#frontToBack","https://solid-memo.com/vocab/v1#backToFront","https://solid-memo.com/vocab/v1#bidirectional"] },
    { name: "theme", predicate: "http://www.w3.org/ns/dcat#theme", kind: "iri", cardinality: "many" },
    { name: "keyword", predicate: "http://www.w3.org/ns/dcat#keyword", kind: "string", cardinality: "many" },
    { name: "distribution", predicate: "http://www.w3.org/ns/dcat#distribution", kind: "iri", cardinality: "many" },
    { name: "cardsDocument", predicate: "https://solid-memo.com/vocab/v1#cardsDocument", kind: "iri", cardinality: "one" },
    { name: "reviewsDocument", predicate: "https://solid-memo.com/vocab/v1#reviewsDocument", kind: "iri", cardinality: "one" },
    { name: "source", predicate: "http://www.w3.org/ns/prov#wasDerivedFrom", kind: "iri", cardinality: "optional" },
  ],
};

export const DISTRIBUTION_V1: ShapeDescriptor<DistributionV1> = {
  shape: "distribution",
  version: 1,
  targetClass: "http://www.w3.org/ns/dcat#Distribution",
  additionalTypes: [],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/distribution/v1.ttl#shape",
  shapeDocument: "distribution/v1.ttl",
  context: "any",
  fields: [
    { name: "accessUrl", predicate: "http://www.w3.org/ns/dcat#accessURL", kind: "iri", cardinality: "one" },
    { name: "downloadUrl", predicate: "http://www.w3.org/ns/dcat#downloadURL", kind: "iri", cardinality: "optional" },
    { name: "mediaType", predicate: "http://www.w3.org/ns/dcat#mediaType", kind: "iri", cardinality: "optional" },
    { name: "format", predicate: "http://purl.org/dc/terms/format", kind: "iri", cardinality: "optional" },
  ],
};

export const INSTANCE_V1: ShapeDescriptor<InstanceV1> = {
  shape: "instance",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Instance",
  additionalTypes: [],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/instance/v1.ttl#shape",
  shapeDocument: "instance/v1.ttl",
  context: "any",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "one" },
  ],
};

export const INSTANCE_V2: ShapeDescriptor<InstanceV2> = {
  shape: "instance",
  version: 2,
  targetClass: "https://solid-memo.com/vocab/v1#Instance",
  additionalTypes: [],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/instance/v2.ttl#shape",
  shapeDocument: "instance/v2.ttl",
  context: "any",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "one" },
    { name: "replaces", predicate: "http://purl.org/dc/terms/replaces", kind: "iri", cardinality: "optional" },
    { name: "modified", predicate: "http://purl.org/dc/terms/modified", kind: "dateTime", cardinality: "optional" },
  ],
};

export const LIBRARY_DECK_V1: ShapeDescriptor<LibraryDeckV1> = {
  shape: "libraryDeck",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  additionalTypes: [],
  absent: ["https://solid-memo.com/vocab/v1#cardsDocument","https://solid-memo.com/vocab/v1#reviewsDocument"],
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
  additionalTypes: [],
  absent: ["https://solid-memo.com/vocab/v1#cardsDocument","https://solid-memo.com/vocab/v1#reviewsDocument"],
  shapeIri: "https://solid-memo.com/shapes/deck/v2.ttl#inLibrary",
  shapeDocument: "deck/v2.ttl",
  context: "library",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "modified", predicate: "http://purl.org/dc/terms/modified", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "string", cardinality: "many" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "optional" },
    { name: "direction", predicate: "https://solid-memo.com/vocab/v1#direction", kind: "enum", cardinality: "one", values: ["front-to-back","back-to-front","bidirectional"] },
    { name: "source", predicate: "http://purl.org/dc/terms/source", kind: "iri", cardinality: "many" },
  ],
};

export const LIBRARY_DECK_V3: ShapeDescriptor<LibraryDeckV3> = {
  shape: "libraryDeck",
  version: 3,
  targetClass: "https://solid-memo.com/vocab/v1#Deck",
  additionalTypes: ["http://www.w3.org/ns/dcat#Dataset"],
  absent: ["https://solid-memo.com/vocab/v1#direction","https://solid-memo.com/vocab/v1#cardsDocument","https://solid-memo.com/vocab/v1#reviewsDocument","http://purl.org/dc/terms/source"],
  shapeIri: "https://solid-memo.com/shapes/deck/v3.ttl#inLibrary",
  shapeDocument: "deck/v3.ttl",
  context: "library",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "one" },
    { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
    { name: "modified", predicate: "http://purl.org/dc/terms/modified", kind: "dateTime", cardinality: "optional" },
    { name: "issued", predicate: "http://purl.org/dc/terms/issued", kind: "dateTime", cardinality: "optional" },
    { name: "creator", predicate: "http://purl.org/dc/terms/creator", kind: "iri", cardinality: "many" },
    { name: "publisher", predicate: "http://purl.org/dc/terms/publisher", kind: "iri", cardinality: "one" },
    { name: "license", predicate: "http://purl.org/dc/terms/license", kind: "iri", cardinality: "optional" },
    { name: "studyDirection", predicate: "https://solid-memo.com/vocab/v1#studyDirection", kind: "iriEnum", cardinality: "one", values: ["https://solid-memo.com/vocab/v1#frontToBack","https://solid-memo.com/vocab/v1#backToFront","https://solid-memo.com/vocab/v1#bidirectional"] },
    { name: "theme", predicate: "http://www.w3.org/ns/dcat#theme", kind: "iri", cardinality: "many" },
    { name: "keyword", predicate: "http://www.w3.org/ns/dcat#keyword", kind: "string", cardinality: "many" },
    { name: "language", predicate: "http://purl.org/dc/terms/language", kind: "iri", cardinality: "many" },
    { name: "version", predicate: "http://www.w3.org/ns/dcat#version", kind: "string", cardinality: "one" },
    { name: "versionNotes", predicate: "http://www.w3.org/ns/adms#versionNotes", kind: "string", cardinality: "optional" },
    { name: "inSeries", predicate: "http://www.w3.org/ns/dcat#inSeries", kind: "iri", cardinality: "one" },
    { name: "isVersionOf", predicate: "http://www.w3.org/ns/dcat#isVersionOf", kind: "iri", cardinality: "one" },
    { name: "prev", predicate: "http://www.w3.org/ns/dcat#prev", kind: "iri", cardinality: "optional" },
    { name: "previousVersion", predicate: "http://www.w3.org/ns/dcat#previousVersion", kind: "iri", cardinality: "optional" },
    { name: "distribution", predicate: "http://www.w3.org/ns/dcat#distribution", kind: "iri", cardinality: "many" },
    { name: "wasDerivedFrom", predicate: "http://www.w3.org/ns/prov#wasDerivedFrom", kind: "iri", cardinality: "many" },
  ],
};

export const LIBRARY_DECK_SERIES_V1: ShapeDescriptor<LibraryDeckSeriesV1> = {
  shape: "libraryDeckSeries",
  version: 1,
  targetClass: "http://www.w3.org/ns/dcat#DatasetSeries",
  additionalTypes: ["http://www.w3.org/ns/dcat#Dataset"],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/deck-series/v1.ttl#inLibrary",
  shapeDocument: "deck-series/v1.ttl",
  context: "library",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
    { name: "description", predicate: "http://purl.org/dc/terms/description", kind: "string", cardinality: "one" },
    { name: "publisher", predicate: "http://purl.org/dc/terms/publisher", kind: "iri", cardinality: "one" },
    { name: "theme", predicate: "http://www.w3.org/ns/dcat#theme", kind: "iri", cardinality: "many" },
    { name: "keyword", predicate: "http://www.w3.org/ns/dcat#keyword", kind: "string", cardinality: "many" },
    { name: "first", predicate: "http://www.w3.org/ns/dcat#first", kind: "iri", cardinality: "one" },
    { name: "last", predicate: "http://www.w3.org/ns/dcat#last", kind: "iri", cardinality: "one" },
    { name: "hasVersion", predicate: "http://www.w3.org/ns/dcat#hasVersion", kind: "iri", cardinality: "many" },
    { name: "hasCurrentVersion", predicate: "http://www.w3.org/ns/dcat#hasCurrentVersion", kind: "iri", cardinality: "one" },
  ],
};

export const PREFERENCES_V1: ShapeDescriptor<PreferencesV1> = {
  shape: "preferences",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Preferences",
  additionalTypes: [],
  absent: [],
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
  additionalTypes: [],
  absent: [],
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

export const PREFERENCES_V3: ShapeDescriptor<PreferencesV3> = {
  shape: "preferences",
  version: 3,
  targetClass: "https://solid-memo.com/vocab/v1#Preferences",
  additionalTypes: [],
  absent: [],
  shapeIri: "https://solid-memo.com/shapes/preferences/v3.ttl#shape",
  shapeDocument: "preferences/v3.ttl",
  context: "any",
  fields: [
    { name: "newCardsPerDay", predicate: "https://solid-memo.com/vocab/v1#newCardsPerDay", kind: "integer", cardinality: "one" },
    { name: "maxReviewsPerDay", predicate: "https://solid-memo.com/vocab/v1#maxReviewsPerDay", kind: "integer", cardinality: "one" },
    { name: "dayBoundaryHour", predicate: "https://solid-memo.com/vocab/v1#dayBoundaryHour", kind: "integer", cardinality: "one" },
    { name: "answerScale", predicate: "https://solid-memo.com/vocab/v1#answerScale", kind: "enum", cardinality: "one", values: ["sm2","minimal"] },
    { name: "developerMode", predicate: "https://solid-memo.com/vocab/v1#developerMode", kind: "boolean", cardinality: "one" },
    { name: "invalidDataPolicy", predicate: "https://solid-memo.com/vocab/v1#invalidDataPolicy", kind: "iriEnum", cardinality: "one", values: ["https://solid-memo.com/vocab/v1#blockInstance","https://solid-memo.com/vocab/v1#blockSubject","https://solid-memo.com/vocab/v1#warnOnly"] },
  ],
};

export const REVIEW_STATE_V1: ShapeDescriptor<ReviewStateV1> = {
  shape: "reviewState",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#ReviewState",
  additionalTypes: [],
  absent: [],
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
  additionalTypes: [],
  absent: [],
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
  agent: { 1: AGENT_V1 },
  card: { 1: CARD_V1, 2: CARD_V2 },
  catalog: { 1: CATALOG_V1 },
  deck: { 1: DECK_V1, 2: DECK_V2, 3: DECK_V3 },
  distribution: { 1: DISTRIBUTION_V1 },
  instance: { 1: INSTANCE_V1, 2: INSTANCE_V2 },
  libraryDeck: { 1: LIBRARY_DECK_V1, 2: LIBRARY_DECK_V2, 3: LIBRARY_DECK_V3 },
  libraryDeckSeries: { 1: LIBRARY_DECK_SERIES_V1 },
  preferences: { 1: PREFERENCES_V1, 2: PREFERENCES_V2, 3: PREFERENCES_V3 },
  reviewState: { 1: REVIEW_STATE_V1, 2: REVIEW_STATE_V2 },
} as const;

/** Every descriptor, for selection by class, version and context. */
export const ALL_SHAPES: readonly ShapeDescriptor[] = [
  AGENT_V1,
  CARD_V1,
  CARD_V2,
  CATALOG_V1,
  DECK_V1,
  DECK_V2,
  DECK_V3,
  DISTRIBUTION_V1,
  INSTANCE_V1,
  INSTANCE_V2,
  LIBRARY_DECK_V1,
  LIBRARY_DECK_V2,
  LIBRARY_DECK_V3,
  LIBRARY_DECK_SERIES_V1,
  PREFERENCES_V1,
  PREFERENCES_V2,
  PREFERENCES_V3,
  REVIEW_STATE_V1,
  REVIEW_STATE_V2,
];
