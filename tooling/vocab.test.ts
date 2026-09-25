import { describe, expect, it } from "vitest";
import {
  parseVocab,
  renderVocabConstants,
  renderVocabPage,
  SM_NS,
} from "./vocab.ts";

const HEAD = `
@prefix sm:      <https://solid-memo.com/vocab/v1#> .
@prefix owl:     <http://www.w3.org/2002/07/owl#> .
@prefix rdfs:    <http://www.w3.org/2000/01/rdf-schema#> .
@prefix skos:    <http://www.w3.org/2004/02/skos/core#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .
`;
const ONTOLOGY = `<> a owl:Ontology ; dcterms:title "Test <vocab>" ; dcterms:description "A test." ;
  owl:versionInfo "1.1" ; skos:changeNote "1.0: Deck. 1.1: front, image." .`;
const TERMS = `
sm:Deck a owl:Class ; rdfs:label "Deck" ; rdfs:comment "A deck." ; skos:historyNote "Since 1.0." .
sm:front a owl:DatatypeProperty ; rdfs:label "front" ; rdfs:comment "Front \\"text\\"." ;
  rdfs:domain sm:Deck ; rdfs:range xsd:string ; skos:historyNote "Added in 1.1." .
sm:image a owl:ObjectProperty ; rdfs:label "image" ; rdfs:comment "A picture." ;
  rdfs:range rdfs:Resource ; skos:historyNote "Added in 1.1." .
`;

describe("parseVocab", () => {
  it("reads the ontology and every term in document order", () => {
    expect(parseVocab(`${HEAD}${ONTOLOGY}${TERMS}`)).toEqual({
      title: "Test <vocab>",
      description: "A test.",
      version: "1.1",
      changeNote: "1.0: Deck. 1.1: front, image.",
      terms: [
        { name: "Deck", iri: `${SM_NS}Deck`, kind: "class", label: "Deck", comment: "A deck.", history: "Since 1.0." },
        { name: "front", iri: `${SM_NS}front`, kind: "property", label: "front", comment: 'Front "text".', range: "http://www.w3.org/2001/XMLSchema#string", domain: `${SM_NS}Deck`, history: "Added in 1.1." },
        { name: "image", iri: `${SM_NS}image`, kind: "property", label: "image", comment: "A picture.", range: "http://www.w3.org/2000/01/rdf-schema#Resource", history: "Added in 1.1." },
      ],
    });
  });

  it("rejects a term without its annotations", () => {
    expect(() =>
      parseVocab(`${HEAD}${ONTOLOGY} sm:x a owl:Class ; rdfs:label "x" ; rdfs:comment "x" .`),
    ).toThrow("vocab: <https://solid-memo.com/vocab/v1#x> has no historyNote.");
  });

  it("requires a range on every property", () => {
    expect(() =>
      parseVocab(`${HEAD}${ONTOLOGY} sm:x a owl:DatatypeProperty ; rdfs:label "x" ; rdfs:comment "x" ; skos:historyNote "x" .`),
    ).toThrow("vocab: <https://solid-memo.com/vocab/v1#x> has no range.");
  });

  it("rejects a term outside the namespace", () => {
    expect(() =>
      parseVocab(`${HEAD}${ONTOLOGY} <https://other.example/#x> a owl:Class .`),
    ).toThrow("vocab: <https://other.example/#x> is outside the namespace");
  });

  it("requires the ontology subject", () => {
    expect(() => parseVocab(`${HEAD}${TERMS}`)).toThrow(
      "vocab: expected <https://solid-memo.com/vocab/v1> to be the owl:Ontology.",
    );
  });
});

describe("renderVocabConstants", () => {
  it("renders one constant per term with its comment and history", () => {
    expect(renderVocabConstants(parseVocab(`${HEAD}${ONTOLOGY}${TERMS}`))).toBe(
      `/* Generated from vocab/v1.ttl by \`npm run generate\`. Do not edit: change the source and regenerate. */

/** Solid Memo's own vocabulary, version 1.1 (see docs/vocab.md). */
export const SM_NS = "https://solid-memo.com/vocab/v1#";

export const SM = {
  /** A deck. (Since 1.0.) */
  Deck: \`\${SM_NS}Deck\`,
  /** Front "text". (Added in 1.1.) */
  front: \`\${SM_NS}front\`,
  /** A picture. (Added in 1.1.) */
  image: \`\${SM_NS}image\`,
} as const;
`,
    );
  });
});

describe("renderVocabPage", () => {
  const page = renderVocabPage(parseVocab(`${HEAD}${ONTOLOGY}${TERMS}`));

  it("anchors every term and links the Turtle", () => {
    expect(page).toContain('<link rel="alternate" type="text/turtle" href="../v1.ttl">');
    expect(page).toContain('<tr id="Deck"><td><code>sm:Deck</code></td><td>Deck</td><td>A deck. <em>Since 1.0.</em></td><td>class</td></tr>');
    expect(page).toContain("<td>property, range string, domain Deck</td>");
    expect(page).toContain("<td>property, range Resource</td>");
  });

  it("escapes HTML in the text", () => {
    expect(page).toContain("<title>Test &lt;vocab&gt;</title>");
    expect(page).toContain("Front &quot;text&quot;.");
  });
});
