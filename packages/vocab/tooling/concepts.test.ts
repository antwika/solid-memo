import { describe, expect, it } from "vitest";
import {
  checkEveryConceptInAScheme,
  parseConceptSchemes,
  renderConcepts,
  renderSchemePage,
} from "./concepts.ts";

const BASE = "https://example.com/vocab/colours";
const HEAD = `
@prefix c:       <${BASE}#> .
@prefix skos:    <http://www.w3.org/2004/02/skos/core#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
`;
const SCHEME = `${HEAD}
<> a skos:ConceptScheme ; dcterms:title "Colours"@en, "Färger"@sv ; skos:definition "Colours <&> \\"hues\\"."@en .
c:red a skos:Concept ; skos:prefLabel "Röd"@sv, "Red"@en ; skos:definition "Blood."@en, "Blod."@sv ; skos:notation "r" ; skos:inScheme <> .
c:crimson a skos:Concept ; skos:prefLabel "Crimson"@en, "Karmosin"@sv, "Crimson"@en-gb ; skos:definition "Dark red."@en, "Mörkröd."@sv ; skos:broader c:red ; skos:inScheme <> .
`;

describe("parseConceptSchemes", () => {
  it("reads each scheme and its concepts in document order, English first", () => {
    expect(parseConceptSchemes(SCHEME, BASE)).toEqual([
      {
        name: "COLOURS",
        iri: BASE,
        title: "Colours",
        definition: 'Colours <&> "hues".',
        concepts: [
          {
            iri: `${BASE}#red`,
            label: { en: "Red", sv: "Röd" },
            definition: { en: "Blood.", sv: "Blod." },
            notation: "r",
          },
          {
            iri: `${BASE}#crimson`,
            label: { en: "Crimson", "en-gb": "Crimson", sv: "Karmosin" },
            definition: { en: "Dark red.", sv: "Mörkröd." },
            broader: `${BASE}#red`,
          },
        ],
      },
    ]);
  });

  it("names a camel-case scheme in upper snake case", () => {
    const turtle = `${HEAD} c:StudyDirections a skos:ConceptScheme ; dcterms:title "S"@en ; skos:definition "S"@en .`;
    expect(parseConceptSchemes(turtle, BASE)[0].name).toBe("STUDY_DIRECTIONS");
  });

  it("requires English labels", () => {
    const turtle = `${HEAD} <> a skos:ConceptScheme ; dcterms:title "Färger"@sv ; skos:definition "x"@en .`;
    expect(() => parseConceptSchemes(turtle, BASE)).toThrow(
      `${BASE}: <${BASE}> has no English title.`,
    );
  });

  it("requires a concept's label and definition in every language of the scheme's title, untagged text not counting", () => {
    const turtle = `${HEAD} <> a skos:ConceptScheme ; dcterms:title "Colours"@en, "Färger"@sv ; skos:definition "x"@en .
c:red a skos:Concept ; skos:prefLabel "Red"@en, "Röd" ; skos:definition "Blood."@en, "Blod."@sv ; skos:inScheme <> .`;
    expect(() => parseConceptSchemes(turtle, BASE)).toThrow(`${BASE}: <${BASE}#red> has no prefLabel in sv.`);
  });
});

describe("checkEveryConceptInAScheme", () => {
  it("accepts concepts that belong to a scheme and rejects strays", () => {
    const schemes = parseConceptSchemes(SCHEME, BASE);
    expect(() => checkEveryConceptInAScheme([{ turtle: SCHEME, baseIri: BASE }], schemes)).not.toThrow();
    const stray = `${SCHEME} c:blue a skos:Concept ; skos:prefLabel "Blue"@en .`;
    expect(() => checkEveryConceptInAScheme([{ turtle: stray, baseIri: BASE }], schemes)).toThrow(
      `${BASE}: <${BASE}#blue> is in none of the concept schemes.`,
    );
  });
});

describe("renderConcepts", () => {
  it("renders one constant per scheme", () => {
    expect(renderConcepts(["vocab/colours.ttl"], parseConceptSchemes(SCHEME, BASE))).toContain(
      `/** Colours <&> "hues". */
export const COLOURS = {
  iri: "${BASE}",
  title: "Colours",
  concepts: [
    {
      iri: "${BASE}#red",
      label: { en: "Red", sv: "Röd" },
      definition: { en: "Blood.", sv: "Blod." },
      notation: "r",
    },
    {
      iri: "${BASE}#crimson",
      label: { en: "Crimson", "en-gb": "Crimson", sv: "Karmosin" },
      definition: { en: "Dark red.", sv: "Mörkröd." },
      broader: "${BASE}#red",
    },
  ],
} as const satisfies ConceptScheme;
`,
    );
  });
});

describe("renderSchemePage", () => {
  it("anchors every concept, names its broader concept and escapes HTML", () => {
    const [scheme] = parseConceptSchemes(SCHEME, BASE);
    const page = renderSchemePage(scheme, "../colours.ttl");
    expect(page).toContain('<link rel="alternate" type="text/turtle" href="../colours.ttl">');
    expect(page).toContain('<tr id="red"><td><code>red</code></td><td><span lang="en">Red</span><br><span lang="sv">Röd</span></td><td><span lang="en">Blood.</span><br><span lang="sv">Blod.</span></td><td></td></tr>');
    expect(page).toContain('<td><span lang="en">Dark red.</span><br><span lang="sv">Mörkröd.</span></td><td>Red</td></tr>');
    expect(page).toContain("Colours &lt;&amp;&gt; &quot;hues&quot;.");
  });

  it("names a broader concept outside the scheme by its IRI", () => {
    const [scheme] = parseConceptSchemes(SCHEME, BASE);
    const page = renderSchemePage(
      { ...scheme, concepts: [{ ...scheme.concepts[1], broader: "https://other.example/#x" }] },
      "x.ttl",
    );
    expect(page).toContain("<td>https://other.example/#x</td>");
  });
});
