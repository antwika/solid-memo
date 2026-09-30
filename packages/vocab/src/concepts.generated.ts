/* Generated from vocab/v1.ttl, vocab/topics.ttl by `npm run generate`. Do not edit: change the source and regenerate. */

/** A concept of one of Solid Memo's SKOS concept schemes (see docs/vocab.md). */
export interface Concept {
  readonly iri: string;
  readonly label: string;
  readonly definition: string;
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
      label: "Front to back",
      definition: "Each card is shown by its front and answered with its back.",
      notation: "front-to-back",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#backToFront",
      label: "Back to front",
      definition: "Each card is shown by its back and answered with its front.",
      notation: "back-to-front",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#bidirectional",
      label: "Both ways",
      definition: "Each card is asked both ways, each way scheduled on its own.",
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
      label: "Block the instance",
      definition: "Any invalid data stops the app from using the instance until it is repaired. The default.",
      notation: "block-instance",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#blockSubject",
      label: "Set invalid data aside",
      definition: "Decks with invalid data are set aside until they are repaired; everything else keeps working.",
      notation: "block-subject",
    },
    {
      iri: "https://solid-memo.com/vocab/v1#warnOnly",
      label: "Warn only",
      definition: "Invalid data is reported, and the app keeps working with it.",
      notation: "warn-only",
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
      label: "Languages",
      definition: "Vocabulary and grammar of human languages.",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#swedish",
      label: "Swedish",
      definition: "The Swedish language.",
      broader: "https://solid-memo.com/vocab/topics#languages",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#geography",
      label: "Geography",
      definition: "Countries, capitals, flags and the places of the world.",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#computing",
      label: "Computing",
      definition: "Computers, software and the protocols of the web.",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#science",
      label: "Science",
      definition: "The natural sciences.",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#chemistry",
      label: "Chemistry",
      definition: "Elements, compounds and their reactions.",
      broader: "https://solid-memo.com/vocab/topics#science",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#art",
      label: "Art",
      definition: "Paintings, artists and the history of art.",
    },
    {
      iri: "https://solid-memo.com/vocab/topics#labour-market",
      label: "Labour market",
      definition: "Occupations, work and the labour market.",
    },
  ],
} as const satisfies ConceptScheme;
