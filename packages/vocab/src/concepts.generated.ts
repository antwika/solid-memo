/* Generated from vocab/v1.ttl, vocab/topics.ttl by `npm run generate`. Do not edit: change the source and regenerate. */

/** Text by language tag (lower case), one of them English. */
export type ConceptText = Readonly<Record<string, string>>;

/** A concept of one of Solid Memo's SKOS concept schemes (see docs/vocab.md). */
export interface Concept {
  readonly iri: string;
  /** skos:prefLabel, in every language of the scheme. */
  readonly label: ConceptText;
  /** skos:definition, in every language of the scheme. */
  readonly definition: ConceptText;
  /** skos:notation: the concept's code, where the scheme gives one. */
  readonly notation?: string;
  /** skos:broader: the concept above this one, for a concept below the top. */
  readonly broader?: string;
}

export interface ConceptScheme {
  readonly iri: string;
  readonly title: string;
  readonly concepts: readonly Concept[];
}

/** The ways a deck can be studied. */
export const STUDY_DIRECTIONS = {
  iri: "https://solid-memo.com/vocab/v1#StudyDirections",
  title: "Study directions",
  concepts: [
    {
      iri: "https://solid-memo.com/vocab/v1#frontToBack",
      label: { en: "Front to back" },
      definition: { en: "Each card is shown by its front and answered with its back." },
      notation: "front-to-back",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#backToFront",
      label: { en: "Back to front" },
      definition: { en: "Each card is shown by its back and answered with its front." },
      notation: "back-to-front",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#bidirectional",
      label: { en: "Both ways" },
      definition: { en: "Each card is asked both ways, each way scheduled on its own." },
      notation: "bidirectional",
    },
  ],
} as const satisfies ConceptScheme;

/** What the app does when data in an instance does not conform to its shapes. */
export const INVALID_DATA_POLICIES = {
  iri: "https://solid-memo.com/vocab/v1#InvalidDataPolicies",
  title: "Invalid data policies",
  concepts: [
    {
      iri: "https://solid-memo.com/vocab/v1#blockInstance",
      label: { en: "Block the instance" },
      definition: { en: "Any invalid data stops the app from using the instance until it is repaired. The default." },
      notation: "block-instance",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#blockSubject",
      label: { en: "Set invalid data aside" },
      definition: { en: "Decks with invalid data are set aside until they are repaired; everything else keeps working." },
      notation: "block-subject",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#warnOnly",
      label: { en: "Warn only" },
      definition: { en: "Invalid data is reported, and the app keeps working with it." },
      notation: "warn-only",
    },
  ],
} as const satisfies ConceptScheme;

/** The algorithms that can decide when a prompt is next due. */
export const SCHEDULERS = {
  iri: "https://solid-memo.com/vocab/v1#Schedulers",
  title: "Schedulers",
  concepts: [
    {
      iri: "https://solid-memo.com/vocab/v1#sm2",
      label: { en: "SM-2" },
      definition: { en: "SuperMemo 2 (Wozniak, 1990): the interval grows by an ease factor that each grade adjusts." },
      notation: "sm2",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#fsrs",
      label: { en: "FSRS" },
      definition: { en: "The Free Spaced Repetition Scheduler, FSRS-7: the interval is the time until the predicted probability of recall falls to the desired retention." },
      notation: "fsrs",
    },
  ],
} as const satisfies ConceptScheme;

/** What a deck of flashcards is about. */
export const TOPICS = {
  iri: "https://solid-memo.com/vocab/topics",
  title: "Solid Memo topics",
  concepts: [
    {
      iri: "https://solid-memo.com/vocab/topics#languages",
      label: { en: "Languages", sv: "Språk" },
      definition: { en: "Vocabulary and grammar of human languages.", sv: "Ordförråd och grammatik i mänskliga språk." },
    },
    {
      iri: "https://solid-memo.com/vocab/topics#swedish",
      label: { en: "Swedish", sv: "Svenska" },
      definition: { en: "The Swedish language.", sv: "Det svenska språket." },
      broader: "https://solid-memo.com/vocab/topics#languages",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#geography",
      label: { en: "Geography", sv: "Geografi" },
      definition: { en: "Countries, capitals, flags and the places of the world.", sv: "Länder, huvudstäder, flaggor och världens platser." },
    },
    {
      iri: "https://solid-memo.com/vocab/topics#computing",
      label: { en: "Computing", sv: "Datorer" },
      definition: { en: "Computers, software and the protocols of the web.", sv: "Datorer, mjukvara och webbens protokoll." },
    },
    {
      iri: "https://solid-memo.com/vocab/topics#science",
      label: { en: "Science", sv: "Naturvetenskap" },
      definition: { en: "The natural sciences.", sv: "Naturvetenskaperna." },
    },
    {
      iri: "https://solid-memo.com/vocab/topics#chemistry",
      label: { en: "Chemistry", sv: "Kemi" },
      definition: { en: "Elements, compounds and their reactions.", sv: "Grundämnen, föreningar och deras reaktioner." },
      broader: "https://solid-memo.com/vocab/topics#science",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#art",
      label: { en: "Art", sv: "Konst" },
      definition: { en: "Paintings, artists and the history of art.", sv: "Målningar, konstnärer och konstens historia." },
    },
    {
      iri: "https://solid-memo.com/vocab/topics#labour-market",
      label: { en: "Labour market", sv: "Arbetsmarknad" },
      definition: { en: "Occupations, work and the labour market.", sv: "Yrken, arbete och arbetsmarknaden." },
    },
  ],
} as const satisfies ConceptScheme;
