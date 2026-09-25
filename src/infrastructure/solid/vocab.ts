/**
 * Solid Memo's own vocabulary is generated from vocab/v1.ttl (see
 * docs/vocab.md); the external vocabularies below are not ours to
 * publish and stay hand-written.
 */
export { SM, SM_NS } from "./vocab.generated";

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
  /**
   * On an imported deck: the library document it was copied from. In the
   * library index: the resources a deck was compiled from.
   */
  source: "http://purl.org/dc/terms/source",
  /** A deck's author (one triple per name). */
  creator: "http://purl.org/dc/terms/creator",
  /** The licence URL a deck's content is offered under. */
  license: "http://purl.org/dc/terms/license",
  /** A deck's blurb: what it covers, where its content came from. */
  description: "http://purl.org/dc/terms/description",
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
