import {
  INVALID_DATA_POLICIES,
  STUDY_DIRECTIONS,
  type Concept,
  type ConceptScheme,
} from "./concepts.generated";
import { isDeckDirection, type DeckDirection } from "./deck";
import { isInvalidDataPolicy, type InvalidDataPolicy } from "./invalidDataPolicy";

/** The IRI of a concept of the StudyDirections scheme. */
export type StudyDirectionConcept = (typeof STUDY_DIRECTIONS.concepts)[number]["iri"];

/** The IRI of a concept of the InvalidDataPolicies scheme. */
export type InvalidDataPolicyConcept = (typeof INVALID_DATA_POLICIES.concepts)[number]["iri"];

/**
 * Lookups over Solid Memo's SKOS concept schemes (generated from
 * vocab/v1.ttl and vocab/topics.ttl; see docs/vocab.md). Data names a
 * concept by its IRI; the app's own code, where a scheme predates it,
 * by the concept's notation.
 */

export function conceptByIri(scheme: ConceptScheme, iri: string): Concept | undefined {
  return scheme.concepts.find((concept) => concept.iri === iri);
}

export function conceptByNotation(
  scheme: ConceptScheme,
  notation: string,
): Concept | undefined {
  return scheme.concepts.find((concept) => concept.notation === notation);
}

/** The study direction a concept of the StudyDirections scheme names. */
export function directionOfConcept(iri: string): DeckDirection | undefined {
  const notation = conceptByIri(STUDY_DIRECTIONS, iri)?.notation;
  return notation !== undefined && isDeckDirection(notation) ? notation : undefined;
}

/** The concept of the StudyDirections scheme that names a study direction. */
export function conceptOfDirection(direction: DeckDirection): StudyDirectionConcept {
  return conceptByNotation(STUDY_DIRECTIONS, direction)!.iri as StudyDirectionConcept;
}

/** The policy a concept of the InvalidDataPolicies scheme names. */
export function policyOfConcept(iri: string): InvalidDataPolicy | undefined {
  const notation = conceptByIri(INVALID_DATA_POLICIES, iri)?.notation;
  return notation !== undefined && isInvalidDataPolicy(notation) ? notation : undefined;
}

/** The concept of the InvalidDataPolicies scheme that names a policy. */
export function conceptOfPolicy(policy: InvalidDataPolicy): InvalidDataPolicyConcept {
  return conceptByNotation(INVALID_DATA_POLICIES, policy)!.iri as InvalidDataPolicyConcept;
}
