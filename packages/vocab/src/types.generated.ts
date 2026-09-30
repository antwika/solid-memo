/* Generated from shapes/<class>/v<N>.ttl by `npm run generate`. Do not edit: change the source and regenerate. */

/**
 * A text in one or more languages (rdf:langString values): language tag,
 * lower case ("en", "sv", "en-gb"), to the text in that language.
 */
export type LangText = Readonly<Record<string, string>>;

/** The record kinds the shapes describe (see docs/shapes.md). */
export type ShapeName = "agent" | "card" | "catalog" | "deck" | "distribution" | "instance" | "libraryDeck" | "libraryDeckSeries" | "preferences" | "reviewState";

/** The shape version this app writes for each kind. */
export const LATEST_VERSION = {
  agent: 1,
  card: 2,
  catalog: 1,
  deck: 4,
  distribution: 1,
  instance: 2,
  libraryDeck: 4,
  libraryDeckSeries: 2,
  preferences: 3,
  reviewState: 2,
} as const;

/** A creator or publisher: a foaf:Agent with a name. */
export interface AgentV1 {
  readonly name: string;
  readonly mbox?: string;
}

/** Card format 1: front and back text, both required. */
export interface CardV1 {
  readonly front: string;
  readonly back: string;
  readonly created?: string;
}

/** Card format 2: each side has text, a picture or both; a picture is always an IRI. */
export interface CardV2 {
  readonly front?: string;
  readonly back?: string;
  readonly frontImage?: string;
  readonly backImage?: string;
  readonly created?: string;
}

/** A catalogue of decks: a dcat:Catalog. */
export interface CatalogV1 {
  readonly title: string;
  readonly description: string;
  readonly publisher: string;
  readonly license?: string;
  readonly modified?: string;
  readonly themeTaxonomy: readonly string[];
  readonly dataset: readonly string[];
}

/** Deck format 1 as a catalog entry in a pod. */
export interface DeckV1 {
  readonly title: string;
  readonly created?: string;
  readonly creator: readonly string[];
  readonly license?: string;
  readonly description?: string;
  readonly cardsDocument: string;
  readonly reviewsDocument: string;
  readonly source?: string;
}

/** Deck format 2 as a catalog entry in a pod. */
export interface DeckV2 {
  readonly title: string;
  readonly created?: string;
  readonly modified?: string;
  readonly creator: readonly string[];
  readonly license?: string;
  readonly description?: string;
  readonly direction: "front-to-back" | "back-to-front" | "bidirectional";
  readonly cardsDocument: string;
  readonly reviewsDocument: string;
  readonly source?: string;
}

/** Deck format 3 as a catalog entry in a pod: a dcat:Dataset. */
export interface DeckV3 {
  readonly title: string;
  readonly description: string;
  readonly created?: string;
  readonly modified?: string;
  readonly creator: readonly string[];
  readonly license?: string;
  readonly studyDirection: "https://solid-memo.com/vocab/v1#frontToBack" | "https://solid-memo.com/vocab/v1#backToFront" | "https://solid-memo.com/vocab/v1#bidirectional";
  readonly theme: readonly string[];
  readonly keyword: readonly string[];
  readonly distribution: readonly string[];
  readonly cardsDocument: string;
  readonly reviewsDocument: string;
  readonly source?: string;
  readonly newCardsPerDay?: number;
  readonly maxReviewsPerDay?: number;
}

/** Deck format 4 as a catalog entry in a pod: a dcat:Dataset. */
export interface DeckV4 {
  readonly title: LangText;
  readonly description: LangText;
  readonly created?: string;
  readonly modified?: string;
  readonly creator: readonly string[];
  readonly license?: string;
  readonly studyDirection: "https://solid-memo.com/vocab/v1#frontToBack" | "https://solid-memo.com/vocab/v1#backToFront" | "https://solid-memo.com/vocab/v1#bidirectional";
  readonly theme: readonly string[];
  readonly keyword: readonly string[];
  readonly distribution: readonly string[];
  readonly cardsDocument: string;
  readonly reviewsDocument: string;
  readonly source?: string;
  readonly newCardsPerDay?: number;
  readonly maxReviewsPerDay?: number;
}

/** A deck's cards as a file: a dcat:Distribution. */
export interface DistributionV1 {
  readonly accessUrl: string;
  readonly downloadUrl?: string;
  readonly mediaType?: string;
  readonly format?: string;
}

/** Instance format 1: a title and a creation time. */
export interface InstanceV1 {
  readonly title: string;
  readonly created: string;
}

/** Instance format 2: a title, a creation time and, for an updated copy, the instance it replaces. */
export interface InstanceV2 {
  readonly title: string;
  readonly created: string;
  readonly replaces?: string;
  readonly modified?: string;
}

/** Deck format 1 as a deck-library document. */
export interface LibraryDeckV1 {
  readonly title: string;
  readonly created?: string;
  readonly creator: readonly string[];
  readonly license?: string;
  readonly description?: string;
  readonly source: readonly string[];
}

/** Deck format 2 as a deck-library document. */
export interface LibraryDeckV2 {
  readonly title: string;
  readonly created?: string;
  readonly modified?: string;
  readonly creator: readonly string[];
  readonly license?: string;
  readonly description?: string;
  readonly direction: "front-to-back" | "back-to-front" | "bidirectional";
  readonly source: readonly string[];
}

/** Deck format 3 as a deck-library document: one release of a deck, a dcat:Dataset in the deck's series. */
export interface LibraryDeckV3 {
  readonly title: string;
  readonly description: string;
  readonly created?: string;
  readonly modified?: string;
  readonly issued?: string;
  readonly creator: readonly string[];
  readonly publisher: string;
  readonly license?: string;
  readonly studyDirection: "https://solid-memo.com/vocab/v1#frontToBack" | "https://solid-memo.com/vocab/v1#backToFront" | "https://solid-memo.com/vocab/v1#bidirectional";
  readonly theme: readonly string[];
  readonly keyword: readonly string[];
  readonly language: readonly string[];
  readonly version: string;
  readonly versionNotes?: string;
  readonly inSeries: string;
  readonly isVersionOf: string;
  readonly prev?: string;
  readonly previousVersion?: string;
  readonly distribution: readonly string[];
  readonly wasDerivedFrom: readonly string[];
}

/** Deck format 4 as a deck-library document: one release of a deck, a dcat:Dataset in the deck's series. */
export interface LibraryDeckV4 {
  readonly title: LangText;
  readonly description: LangText;
  readonly created?: string;
  readonly modified?: string;
  readonly issued?: string;
  readonly creator: readonly string[];
  readonly publisher: string;
  readonly license?: string;
  readonly studyDirection: "https://solid-memo.com/vocab/v1#frontToBack" | "https://solid-memo.com/vocab/v1#backToFront" | "https://solid-memo.com/vocab/v1#bidirectional";
  readonly theme: readonly string[];
  readonly keyword: readonly string[];
  readonly language: readonly string[];
  readonly version: string;
  readonly versionNotes?: string;
  readonly inSeries: string;
  readonly isVersionOf: string;
  readonly prev?: string;
  readonly previousVersion?: string;
  readonly distribution: readonly string[];
  readonly wasDerivedFrom: readonly string[];
}

/** A library deck across its releases: a dcat:DatasetSeries. */
export interface LibraryDeckSeriesV1 {
  readonly title: string;
  readonly description: string;
  readonly publisher: string;
  readonly theme: readonly string[];
  readonly keyword: readonly string[];
  readonly first: string;
  readonly last: string;
  readonly hasVersion: readonly string[];
  readonly hasCurrentVersion: string;
}

/** A library deck across its releases: a dcat:DatasetSeries. */
export interface LibraryDeckSeriesV2 {
  readonly title: LangText;
  readonly description: LangText;
  readonly publisher: string;
  readonly theme: readonly string[];
  readonly keyword: readonly string[];
  readonly first: string;
  readonly last: string;
  readonly hasVersion: readonly string[];
  readonly hasCurrentVersion: string;
}

/** Preferences format 1: every field optional. */
export interface PreferencesV1 {
  readonly newCardsPerDay?: number;
  readonly maxReviewsPerDay?: number;
  readonly dayBoundaryHour?: number;
  readonly answerScale?: "sm2" | "minimal";
  readonly developerMode?: boolean;
}

/** Preferences format 2: every field required. */
export interface PreferencesV2 {
  readonly newCardsPerDay: number;
  readonly maxReviewsPerDay: number;
  readonly dayBoundaryHour: number;
  readonly answerScale: "sm2" | "minimal";
  readonly developerMode: boolean;
}

/** Preferences format 3: every field required, the invalid data policy among them. */
export interface PreferencesV3 {
  readonly newCardsPerDay: number;
  readonly maxReviewsPerDay: number;
  readonly dayBoundaryHour: number;
  readonly answerScale: "sm2" | "minimal";
  readonly developerMode: boolean;
  readonly invalidDataPolicy: "https://solid-memo.com/vocab/v1#blockInstance" | "https://solid-memo.com/vocab/v1#blockSubject" | "https://solid-memo.com/vocab/v1#warnOnly";
}

/** Review-state format 1: the SM-2 fields; the previous* snapshot is admitted. */
export interface ReviewStateV1 {
  readonly easeFactor: number;
  readonly intervalDays: number;
  readonly repetitions: number;
  readonly due: string;
  readonly firstReviewedAt: string;
  readonly lastReviewedAt: string;
  readonly previousEaseFactor?: number;
  readonly previousIntervalDays?: number;
  readonly previousRepetitions?: number;
  readonly previousDue?: string;
  readonly previousLastReviewedAt?: string;
}

/** Review-state format 2: SM-2 fields, an all-or-nothing previous* snapshot, per-direction subjects. */
export interface ReviewStateV2 {
  readonly easeFactor: number;
  readonly intervalDays: number;
  readonly repetitions: number;
  readonly due: string;
  readonly firstReviewedAt: string;
  readonly lastReviewedAt: string;
  readonly previousEaseFactor?: number;
  readonly previousIntervalDays?: number;
  readonly previousRepetitions?: number;
  readonly previousDue?: string;
  readonly previousLastReviewedAt?: string;
}

export type AgentRecord = { version: 1; data: AgentV1 };
export type CardRecord = { version: 1; data: CardV1 } | { version: 2; data: CardV2 };
export type CatalogRecord = { version: 1; data: CatalogV1 };
export type DeckRecord = { version: 1; data: DeckV1 } | { version: 2; data: DeckV2 } | { version: 3; data: DeckV3 } | { version: 4; data: DeckV4 };
export type DistributionRecord = { version: 1; data: DistributionV1 };
export type InstanceRecord = { version: 1; data: InstanceV1 } | { version: 2; data: InstanceV2 };
export type LibraryDeckRecord = { version: 1; data: LibraryDeckV1 } | { version: 2; data: LibraryDeckV2 } | { version: 3; data: LibraryDeckV3 } | { version: 4; data: LibraryDeckV4 };
export type LibraryDeckSeriesRecord = { version: 1; data: LibraryDeckSeriesV1 } | { version: 2; data: LibraryDeckSeriesV2 };
export type PreferencesRecord = { version: 1; data: PreferencesV1 } | { version: 2; data: PreferencesV2 } | { version: 3; data: PreferencesV3 };
export type ReviewStateRecord = { version: 1; data: ReviewStateV1 } | { version: 2; data: ReviewStateV2 };

/** A record of any version, by kind. */
export type VersionedRecord = {
  agent: AgentRecord;
  card: CardRecord;
  catalog: CatalogRecord;
  deck: DeckRecord;
  distribution: DistributionRecord;
  instance: InstanceRecord;
  libraryDeck: LibraryDeckRecord;
  libraryDeckSeries: LibraryDeckSeriesRecord;
  preferences: PreferencesRecord;
  reviewState: ReviewStateRecord;
};

/** The latest record of each kind: what this app writes. */
export type LatestRecord = {
  agent: AgentV1;
  card: CardV2;
  catalog: CatalogV1;
  deck: DeckV4;
  distribution: DistributionV1;
  instance: InstanceV2;
  libraryDeck: LibraryDeckV4;
  libraryDeckSeries: LibraryDeckSeriesV2;
  preferences: PreferencesV3;
  reviewState: ReviewStateV2;
};
