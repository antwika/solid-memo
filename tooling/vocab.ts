import { RDF_TYPE, localName, objectsOf, parseTurtle, subjectsOfType } from "./rdf.ts";

/**
 * The vocabulary document (vocab/v1.ttl) as the generators see it: the
 * ontology's version and change note, and every term with its
 * annotations, in document order.
 */

export const VOCAB_IRI = "https://solid-memo.com/vocab/v1";
export const SM_NS = `${VOCAB_IRI}#`;
const OWL = "http://www.w3.org/2002/07/owl#";
const RDFS = "http://www.w3.org/2000/01/rdf-schema#";
const SKOS = "http://www.w3.org/2004/02/skos/core#";
const DCTERMS = "http://purl.org/dc/terms/";
const TERM_TYPES = [
  `${OWL}Class`,
  `${OWL}DatatypeProperty`,
  `${OWL}ObjectProperty`,
];

export interface VocabTerm {
  /** Local name, e.g. "frontImage". */
  name: string;
  iri: string;
  kind: "class" | "property";
  label: string;
  comment: string;
  /** rdfs:range for a property: an xsd datatype or rdfs:Resource. */
  range?: string;
  /** rdfs:domain for a property, when it has one class. */
  domain?: string;
  /** When the term arrived (skos:historyNote). */
  history: string;
}

export interface Vocab {
  title: string;
  description: string;
  version: string;
  changeNote: string;
  terms: VocabTerm[];
}

export function parseVocab(turtle: string): Vocab {
  const quads = parseTurtle(turtle, VOCAB_IRI);
  const literal = (subject: string, predicate: string): string | undefined =>
    objectsOf(quads, subject, predicate).find((o) => o.termType === "Literal")
      ?.value;
  const required = (subject: string, predicate: string): string => {
    const value = literal(subject, predicate);
    if (value === undefined) {
      throw new Error(`vocab: <${subject}> has no ${localName(predicate)}.`);
    }
    return value;
  };
  const terms = quads
    .filter(
      (q) =>
        q.predicate.value === RDF_TYPE && TERM_TYPES.includes(q.object.value),
    )
    .map((q): VocabTerm => {
      const iri = q.subject.value;
      if (!iri.startsWith(SM_NS)) {
        throw new Error(`vocab: <${iri}> is outside the namespace ${SM_NS}.`);
      }
      const kind = q.object.value === `${OWL}Class` ? "class" : "property";
      const range = objectsOf(quads, iri, `${RDFS}range`)[0]?.value;
      if (kind === "property" && range === undefined) {
        throw new Error(`vocab: <${iri}> has no range.`);
      }
      const domain = objectsOf(quads, iri, `${RDFS}domain`)[0]?.value;
      return {
        name: iri.slice(SM_NS.length),
        iri,
        kind,
        label: required(iri, `${RDFS}label`),
        comment: required(iri, `${RDFS}comment`),
        ...(range === undefined ? {} : { range }),
        ...(domain === undefined ? {} : { domain }),
        history: required(iri, `${SKOS}historyNote`),
      };
    });
  if (subjectsOfType(quads, `${OWL}Ontology`)[0] !== VOCAB_IRI) {
    throw new Error(`vocab: expected <${VOCAB_IRI}> to be the owl:Ontology.`);
  }
  return {
    title: required(VOCAB_IRI, `${DCTERMS}title`),
    description: required(VOCAB_IRI, `${DCTERMS}description`),
    version: required(VOCAB_IRI, `${OWL}versionInfo`),
    changeNote: required(VOCAB_IRI, `${SKOS}changeNote`),
    terms,
  };
}

export const GENERATED_HEADER = (source: string): string =>
  `/* Generated from ${source} by \`npm run generate\`. Do not edit: change the source and regenerate. */\n`;

/** The TypeScript module of `SM` constants the app reads and writes with. */
export function renderVocabConstants(vocab: Vocab): string {
  const lines = [
    GENERATED_HEADER("vocab/v1.ttl"),
    `/** Solid Memo's own vocabulary, version ${vocab.version} (see docs/vocab.md). */`,
    `export const SM_NS = ${JSON.stringify(SM_NS)};`,
    "",
    "export const SM = {",
  ];
  for (const term of vocab.terms) {
    lines.push(`  /** ${term.comment} (${term.history}) */`);
    lines.push(`  ${term.name}: \`\${SM_NS}${term.name}\`,`);
  }
  lines.push("} as const;", "");
  return lines.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * The HTML page published at the namespace IRI (vocab/v1/), so that a
 * term IRI such as …/vocab/v1#Deck lands on its row; it links to the
 * Turtle as the machine-readable form.
 */
export function renderVocabPage(vocab: Vocab): string {
  const rows = vocab.terms
    .map((term) => {
      const facts = [
        term.range === undefined ? "class" : `property, range ${localName(term.range)}`,
        ...(term.domain === undefined ? [] : [`domain ${localName(term.domain)}`]),
      ];
      return `<tr id="${escapeHtml(term.name)}"><td><code>sm:${escapeHtml(term.name)}</code></td><td>${escapeHtml(term.label)}</td><td>${escapeHtml(term.comment)} <em>${escapeHtml(term.history)}</em></td><td>${escapeHtml(facts.join(", "))}</td></tr>`;
    })
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(vocab.title)}</title>
<link rel="alternate" type="text/turtle" href="../v1.ttl">
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:60rem;margin:2rem auto;padding:0 1rem}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:.4rem .6rem;vertical-align:top}code{white-space:nowrap}</style>
</head>
<body>
<h1>${escapeHtml(vocab.title)}</h1>
<p>${escapeHtml(vocab.description)}</p>
<p>Namespace <code>${escapeHtml(SM_NS)}</code>, version ${escapeHtml(vocab.version)}. Machine-readable form: <a href="../v1.ttl">v1.ttl</a>.</p>
<p>${escapeHtml(vocab.changeNote)}</p>
<table>
<thead><tr><th>Term</th><th>Label</th><th>Meaning</th><th>Facts</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
</body>
</html>
`;
}
