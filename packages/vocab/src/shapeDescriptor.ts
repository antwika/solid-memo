import type { ShapeName } from "./types.generated.ts";

/**
 * What a shape says about a class at one version, in the form the generic
 * reader and writer (infrastructure/solid/records.ts) and the validators
 * work from. Instances are generated from shapes/**.ttl into
 * shapes.generated.ts; see docs/shapes.md.
 */

/** How a field's RDF term is read and written. */
export type TermKind =
  | "string"
  | "integer"
  | "decimal"
  | "dateTime"
  | "boolean"
  | "iri"
  | "enum"
  /** An IRI from a fixed list (sh:in over IRIs): a concept of a SKOS scheme. */
  | "iriEnum"
  /** Language-tagged literals (rdf:langString), at most one per language: a LangText. */
  | "text"
  /**
   * Untagged text (xsd:string), its language unknown, or language-tagged
   * text, at most one per language, never both: a LangText whose empty
   * tag ("") holds the untagged text.
   */
  | "anyText";

/** "one" = exactly one; "optional" = at most one; "many" = any number. */
export type Cardinality = "one" | "optional" | "many";

export interface FieldDescriptor {
  /** Property name on the generated record type. */
  name: string;
  /** Predicate IRI. */
  predicate: string;
  kind: TermKind;
  cardinality: Cardinality;
  /** kind "enum" and "iriEnum" only: the allowed literals or IRIs, in shape order. */
  values?: readonly string[];
}

/** Where a subject of the shape's class lives; "any" fits both. */
export type ShapeContext = "pod" | "library" | "any";

export interface ShapeDescriptor<T = unknown> {
  shape: ShapeName;
  version: number;
  /** The rdf:type a conforming subject has, by which its shape is picked. */
  targetClass: string;
  /** Further rdf:types a conforming subject has, which the writer adds. */
  additionalTypes: readonly string[];
  /** Predicates a conforming subject never has, which the writer removes. */
  absent: readonly string[];
  /** Absolute IRI of the sh:NodeShape. */
  shapeIri: string;
  /** Path of the shape document under the published shapes/ folder. */
  shapeDocument: string;
  context: ShapeContext;
  fields: readonly FieldDescriptor[];
  /** Phantom: ties the descriptor to its record type. Never set. */
  readonly __record?: T;
}
