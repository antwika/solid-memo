/* Generated from shapes/<class>/v<N>.ttl by `npm run generate`. Do not edit: change the source and regenerate. */

/** The record kinds the shapes describe (see docs/shapes.md). */
export type ShapeName = "card" | "deck" | "instance" | "libraryDeck" | "preferences" | "reviewState";

/** The shape version this app writes for each kind. */
export const LATEST_VERSION = {
  card: 2,
  deck: 2,
  instance: 1,
  libraryDeck: 2,
  preferences: 2,
  reviewState: 2,
} as const;

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
  readonly creator: readonly string[];
  readonly license?: string;
  readonly description?: string;
  readonly direction: "front-to-back" | "back-to-front" | "bidirectional";
  readonly cardsDocument: string;
  readonly reviewsDocument: string;
  readonly source?: string;
}

/** Instance format 1: a title and a creation time. */
export interface InstanceV1 {
  readonly title: string;
  readonly created: string;
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
  readonly creator: readonly string[];
  readonly license?: string;
  readonly description?: string;
  readonly direction: "front-to-back" | "back-to-front" | "bidirectional";
  readonly source: readonly string[];
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

export type CardRecord = { version: 1; data: CardV1 } | { version: 2; data: CardV2 };
export type DeckRecord = { version: 1; data: DeckV1 } | { version: 2; data: DeckV2 };
export type InstanceRecord = { version: 1; data: InstanceV1 };
export type LibraryDeckRecord = { version: 1; data: LibraryDeckV1 } | { version: 2; data: LibraryDeckV2 };
export type PreferencesRecord = { version: 1; data: PreferencesV1 } | { version: 2; data: PreferencesV2 };
export type ReviewStateRecord = { version: 1; data: ReviewStateV1 } | { version: 2; data: ReviewStateV2 };

/** A record of any version, by kind. */
export type VersionedRecord = {
  card: CardRecord;
  deck: DeckRecord;
  instance: InstanceRecord;
  libraryDeck: LibraryDeckRecord;
  preferences: PreferencesRecord;
  reviewState: ReviewStateRecord;
};

/** The latest record of each kind: what this app writes. */
export type LatestRecord = {
  card: CardV2;
  deck: DeckV2;
  instance: InstanceV1;
  libraryDeck: LibraryDeckV2;
  preferences: PreferencesV2;
  reviewState: ReviewStateV2;
};
