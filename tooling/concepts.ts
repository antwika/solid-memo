import { RDF_TYPE, localName, objectsOf, parseTurtle, subjectsOfType } from "./rdf.ts";
import { escapeHtml, GENERATED_HEADER } from "./vocab.ts";

/**
 * Solid Memo's SKOS concept schemes (the study directions and invalid
 * data policies in vocab/v1.ttl, the topics in vocab/topics.ttl) as the
 * generator sees them, and the domain module rendered from them: each
 * scheme as a constant the app can list, label and map to and from
 * (see docs/vocab.md).
 */

const SKOS = "http://www.w3.org/2004/02/skos/core#";
const DCTERMS = "http://purl.org/dc/terms/";

export interface ConceptModel {
  iri: string;
  label: string;
  definition: string;
  notation?: string;
  broader?: string;
}

export interface SchemeModel {
  /** The constant's name, e.g. "STUDY_DIRECTIONS". */
  name: string;
  iri: string;
  title: string;
  definition: string;
  concepts: ConceptModel[];
}

/** Every concept scheme of one Turtle document, its concepts in document order. */
export function parseConceptSchemes(turtle: string, baseIri: string): SchemeModel[] {
  const quads = parseTurtle(turtle, baseIri);
  const english = (subject: string, predicate: string): string => {
    const value = objectsOf(quads, subject, predicate).find(
      (o) => o.termType === "Literal" && o.language === "en",
    )?.value;
    if (value === undefined) {
      throw new Error(`${baseIri}: <${subject}> has no English ${localName(predicate)}.`);
    }
    return value;
  };
  const concepts = subjectsOfType(quads, `${SKOS}Concept`);
  return subjectsOfType(quads, `${SKOS}ConceptScheme`).map((iri): SchemeModel => ({
    name: localName(iri)
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .toUpperCase(),
    iri,
    title: english(iri, `${DCTERMS}title`),
    definition: english(iri, `${SKOS}definition`),
    concepts: concepts
      .filter((concept) =>
        objectsOf(quads, concept, `${SKOS}inScheme`).some((s) => s.value === iri),
      )
      .map((concept): ConceptModel => {
        const notation = objectsOf(quads, concept, `${SKOS}notation`)[0]?.value;
        const broader = objectsOf(quads, concept, `${SKOS}broader`)[0]?.value;
        return {
          iri: concept,
          label: english(concept, `${SKOS}prefLabel`),
          definition: english(concept, `${SKOS}definition`),
          ...(notation === undefined ? {} : { notation }),
          ...(broader === undefined ? {} : { broader }),
        };
      }),
  }));
}

/** Throws unless every concept of the documents belongs to one of their schemes. */
export function checkEveryConceptInAScheme(
  documents: readonly { turtle: string; baseIri: string }[],
  schemes: readonly SchemeModel[],
): void {
  const placed = new Set(schemes.flatMap((s) => s.concepts.map((c) => c.iri)));
  for (const { turtle, baseIri } of documents) {
    const quads = parseTurtle(turtle, baseIri);
    for (const q of quads) {
      if (
        q.predicate.value === RDF_TYPE &&
        q.object.value === `${SKOS}Concept` &&
        !placed.has(q.subject.value)
      ) {
        throw new Error(`${baseIri}: <${q.subject.value}> is in none of the concept schemes.`);
      }
    }
  }
}

/** The domain module: one constant per scheme. */
export function renderConcepts(sources: readonly string[], schemes: readonly SchemeModel[]): string {
  const lines = [
    GENERATED_HEADER(sources.join(", ")),
    "/** A concept of one of Solid Memo's SKOS concept schemes (see docs/vocab.md). */",
    "export interface Concept {",
    "  readonly iri: string;",
    "  readonly label: string;",
    "  readonly definition: string;",
    "  /** skos:notation: the concept's code, where the scheme gives one. */",
    "  readonly notation?: string;",
    "  /** skos:broader: the concept above this one, for a concept below the top. */",
    "  readonly broader?: string;",
    "}",
    "",
    "export interface ConceptScheme {",
    "  readonly iri: string;",
    "  readonly title: string;",
    "  readonly concepts: readonly Concept[];",
    "}",
    "",
  ];
  for (const scheme of schemes) {
    lines.push(`/** ${scheme.definition} */`);
    lines.push(`export const ${scheme.name} = {`);
    lines.push(`  iri: ${JSON.stringify(scheme.iri)},`);
    lines.push(`  title: ${JSON.stringify(scheme.title)},`);
    lines.push("  concepts: [");
    for (const concept of scheme.concepts) {
      const parts = [
        `iri: ${JSON.stringify(concept.iri)}`,
        `label: ${JSON.stringify(concept.label)}`,
        `definition: ${JSON.stringify(concept.definition)}`,
        ...(concept.notation === undefined ? [] : [`notation: ${JSON.stringify(concept.notation)}`]),
        ...(concept.broader === undefined ? [] : [`broader: ${JSON.stringify(concept.broader)}`]),
      ];
      lines.push("    {");
      for (const part of parts) lines.push(`      ${part},`);
      lines.push("    },");
    }
    lines.push("  ],", "} as const satisfies ConceptScheme;", "");
  }
  return lines.join("\n");
}

/**
 * The HTML page published at a scheme's IRI (e.g. vocab/topics/), so a
 * concept IRI such as …/vocab/topics#geography lands on its row; it
 * links to the Turtle as the machine-readable form.
 */
export function renderSchemePage(scheme: SchemeModel, turtleHref: string): string {
  const labelOf = new Map(scheme.concepts.map((c) => [c.iri, c.label]));
  const rows = scheme.concepts
    .map((concept) => {
      const id = concept.iri.slice(concept.iri.lastIndexOf("#") + 1);
      const broader =
        concept.broader === undefined ? "" : (labelOf.get(concept.broader) ?? concept.broader);
      return `<tr id="${escapeHtml(id)}"><td><code>${escapeHtml(id)}</code></td><td>${escapeHtml(concept.label)}</td><td>${escapeHtml(concept.definition)}</td><td>${escapeHtml(broader)}</td></tr>`;
    })
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(scheme.title)}</title>
<link rel="alternate" type="text/turtle" href="${escapeHtml(turtleHref)}">
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:60rem;margin:2rem auto;padding:0 1rem}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:.4rem .6rem;vertical-align:top}code{white-space:nowrap}</style>
</head>
<body>
<h1>${escapeHtml(scheme.title)}</h1>
<p>${escapeHtml(scheme.definition)}</p>
<p>SKOS concept scheme <code>${escapeHtml(scheme.iri)}</code>. Machine-readable form: <a href="${escapeHtml(turtleHref)}">Turtle</a>.</p>
<table>
<thead><tr><th>Concept</th><th>Label</th><th>Definition</th><th>Broader</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
</body>
</html>
`;
}
