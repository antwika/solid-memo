/* Generated from vocab/v1.ttl by `npm run generate`. Do not edit: change the source and regenerate. */

/** Solid Memo's own vocabulary, version 1.5 (see docs/vocab.md). */
export const SM_NS = "https://solid-memo.com/vocab/v1#";

export const SM = {
  /** One Solid Memo data location: a container in a pod holding decks, cards, review state and preferences. Described by the container's meta document. (Since 1.0.) */
  Instance: `${SM_NS}Instance`,
  /** A named set of cards studied together. In a pod, a subject of the instance's catalog document; in the deck library, the document itself. (Since 1.0.) */
  Deck: `${SM_NS}Deck`,
  /** A flashcard: a front and a back, each text, a picture, or both. (Since 1.0.) */
  Card: `${SM_NS}Card`,
  /** SM-2 scheduling state of one card in one study direction. Its subject is named after the card: #<cardId> for front-to-back, #<cardId>@back-to-front for the other way. (Since 1.0.) */
  ReviewState: `${SM_NS}ReviewState`,
  /** Study preferences of one instance: daily caps, the day boundary, the answer scale and developer mode. (Since 1.0.) */
  Preferences: `${SM_NS}Preferences`,
  /** Which version of its class's shape the subject conforms to. Absent means 1, the format that predates the field. Every subject Solid Memo writes carries it. (Since 1.0.) */
  formatVersion: `${SM_NS}formatVersion`,
  /** The document holding the deck's cards, one sm:Card per hash fragment. (Since 1.0.) */
  cardsDocument: `${SM_NS}cardsDocument`,
  /** The document holding the deck's review states, joined to its cards by fragment id. (Since 1.0.) */
  reviewsDocument: `${SM_NS}reviewsDocument`,
  /** How the deck is studied: "front-to-back", "back-to-front" or "bidirectional" (every card asked both ways, each way scheduled on its own). Absent means front-to-back. (Added in 1.5 for deck format 2.) */
  direction: `${SM_NS}direction`,
  /** In the deck library's index only: how many cards a listed deck document holds. (Added in 1.4 for the library index.) */
  cardCount: `${SM_NS}cardCount`,
  /** Text on the front of the card. (Since 1.0.) */
  front: `${SM_NS}front`,
  /** Text on the back of the card. (Since 1.0.) */
  back: `${SM_NS}back`,
  /** A picture on the front of the card, shown above any text. Always an IRI, never a string literal. (Added in 1.3 for card format 2.) */
  frontImage: `${SM_NS}frontImage`,
  /** A picture on the back of the card, shown above any text. Always an IRI, never a string literal. (Added in 1.3 for card format 2.) */
  backImage: `${SM_NS}backImage`,
  /** SM-2 easiness factor, never below 1.3. (Since 1.0.) */
  easeFactor: `${SM_NS}easeFactor`,
  /** Days between the last review and the next due day. (Since 1.0.) */
  intervalDays: `${SM_NS}intervalDays`,
  /** Successful reviews in a row. (Since 1.0.) */
  repetitions: `${SM_NS}repetitions`,
  /** The study day the card becomes due, as a plain "YYYY-MM-DD" string: a study day is a calendar label, not an instant, and an xsd:date would risk timezone shifts. (Since 1.0.) */
  due: `${SM_NS}due`,
  /** When the card was first reviewed in this direction (its introduction). (Since 1.0.) */
  firstReviewedAt: `${SM_NS}firstReviewedAt`,
  /** When the card was most recently reviewed in this direction. (Since 1.0.) */
  lastReviewedAt: `${SM_NS}lastReviewedAt`,
  /** Snapshot: the ease factor before the first review of the study day of lastReviewedAt. The five previous* terms are written all together or not at all; resetting the day restores them. (Added in 1.2 for resetting the study day.) */
  previousEaseFactor: `${SM_NS}previousEaseFactor`,
  /** Snapshot: the interval before the first review of the study day. (Added in 1.2 for resetting the study day.) */
  previousIntervalDays: `${SM_NS}previousIntervalDays`,
  /** Snapshot: the repetition count before the first review of the study day. (Added in 1.2 for resetting the study day.) */
  previousRepetitions: `${SM_NS}previousRepetitions`,
  /** Snapshot: the due day before the first review of the study day. (Added in 1.2 for resetting the study day.) */
  previousDue: `${SM_NS}previousDue`,
  /** Snapshot: lastReviewedAt before the first review of the study day. (Added in 1.2 for resetting the study day.) */
  previousLastReviewedAt: `${SM_NS}previousLastReviewedAt`,
  /** Maximum unseen cards introduced per study day. (Since 1.0.) */
  newCardsPerDay: `${SM_NS}newCardsPerDay`,
  /** Maximum due-card reviews per study day. (Since 1.0.) */
  maxReviewsPerDay: `${SM_NS}maxReviewsPerDay`,
  /** Local hour (0-23) at which the study day rolls over: with 4, reviewing at 03:00 still counts as the previous day. (Since 1.0.) */
  dayBoundaryHour: `${SM_NS}dayBoundaryHour`,
  /** Which grading buttons a study session shows: "sm2" (the six SM-2 grades) or "minimal". (Since 1.0.) */
  answerScale: `${SM_NS}answerScale`,
  /** Whether the instance shows developer tools (the raw WebID document, shape validation). Absent means off. (Added in 1.1.) */
  developerMode: `${SM_NS}developerMode`,
} as const;
