import { describe, expect, it } from "vitest";
import {
  parseShapes,
  renderDescriptors,
  renderDomainTypes,
  type ShapeModel,
} from "./shapes.ts";

const HEAD = `
@prefix sh:      <http://www.w3.org/ns/shacl#> .
@prefix sm:      <https://solid-memo.com/vocab/v1#> .
@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix rdfs:    <http://www.w3.org/2000/01/rdf-schema#> .
`;
const V1_VERSION = `<#formatVersion> a sh:PropertyShape ; sh:path sm:formatVersion ;
  sh:datatype xsd:integer ; sh:maxCount 1 ; sh:in ( 1 ) .`;
const V2_VERSION = `<#formatVersion> a sh:PropertyShape ; sh:path sm:formatVersion ;
  sh:datatype xsd:integer ; sh:minCount 1 ; sh:maxCount 1 ; sh:hasValue 2 .`;

const THING_V1 = `${HEAD}
<#shape> a sh:NodeShape ; sh:name "ThingV1" ; rdfs:comment "Thing one." ;
  sh:nodeKind sh:IRI ; sh:class sm:Thing ;
  sh:property <#formatVersion>, <#title>, <#count>, <#weight>, <#when>, <#flag>, <#link>,
    <#mode>, <#tags>, <#modes>, <#gone> .
${V1_VERSION}
<#title> a sh:PropertyShape ; sh:path dcterms:title ; sh:datatype xsd:string ; sh:minCount 1 ; sh:maxCount 1 .
<#count> a sh:PropertyShape ; sh:path sm:count ; sh:datatype xsd:integer ; sh:maxCount 1 .
<#weight> a sh:PropertyShape ; sh:path sm:weight ; sh:datatype xsd:decimal ; sh:maxCount 1 ; sh:name "mass" .
<#when> a sh:PropertyShape ; sh:path dcterms:created ; sh:datatype xsd:dateTime ; sh:maxCount 1 .
<#flag> a sh:PropertyShape ; sh:path sm:flag ; sh:datatype xsd:boolean ; sh:minCount 1 ; sh:maxCount 1 .
<#link> a sh:PropertyShape ; sh:path sm:link ; sh:nodeKind sh:IRI ; sh:maxCount 1 .
<#mode> a sh:PropertyShape ; sh:path sm:mode ; sh:datatype xsd:string ; sh:maxCount 1 ; sh:in ( "a" "b" ) .
<#tags> a sh:PropertyShape ; sh:path sm:tag ; sh:datatype xsd:string .
<#modes> a sh:PropertyShape ; sh:path sm:modes ; sh:datatype xsd:string ; sh:in ( "x" ) .
<#gone> a sh:PropertyShape ; sh:path sm:gone ; sh:maxCount 0 .
`;

const THING_V2 = `${HEAD}
<#inPod> a sh:NodeShape ; sh:name "ThingV2" ; sh:class sm:Thing ; sh:property <#formatVersion>, <#title> .
<#inLibrary> a sh:NodeShape ; sh:name "LibraryThingV2" ; sh:class sm:Thing ; sh:property <#formatVersion> .
${V2_VERSION}
<#title> a sh:PropertyShape ; sh:path dcterms:title ; sh:datatype xsd:string ; sh:minCount 1 ; sh:maxCount 1 .
`;

const THING_V2_PLAIN = `${HEAD}
<#shape> a sh:NodeShape ; sh:name "ThingV2" ; sh:class sm:Thing ; sh:property <#formatVersion>, <#title> .
${V2_VERSION}
<#title> a sh:PropertyShape ; sh:path dcterms:title ; sh:datatype xsd:string ; sh:minCount 1 ; sh:maxCount 1 .
`;

const files = (...entries: [string, string][]) =>
  entries.map(([path, turtle]) => ({ path, turtle }));

describe("parseShapes", () => {
  it("maps every property kind and cardinality, skipping validation-only ones", () => {
    const [model] = parseShapes(files(["thing/v1.ttl", THING_V1]));
    expect(model).toEqual({
      name: "ThingV1",
      shape: "thing",
      version: 1,
      targetClass: "https://solid-memo.com/vocab/v1#Thing",
      shapeIri: "https://solid-memo.com/shapes/thing/v1.ttl#shape",
      shapeDocument: "thing/v1.ttl",
      context: "any",
      comment: "Thing one.",
      fields: [
        { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },
        { name: "count", predicate: "https://solid-memo.com/vocab/v1#count", kind: "integer", cardinality: "optional" },
        { name: "mass", predicate: "https://solid-memo.com/vocab/v1#weight", kind: "decimal", cardinality: "optional" },
        { name: "created", predicate: "http://purl.org/dc/terms/created", kind: "dateTime", cardinality: "optional" },
        { name: "flag", predicate: "https://solid-memo.com/vocab/v1#flag", kind: "boolean", cardinality: "one" },
        { name: "link", predicate: "https://solid-memo.com/vocab/v1#link", kind: "iri", cardinality: "optional" },
        { name: "mode", predicate: "https://solid-memo.com/vocab/v1#mode", kind: "enum", cardinality: "optional", values: ["a", "b"] },
        { name: "tag", predicate: "https://solid-memo.com/vocab/v1#tag", kind: "string", cardinality: "many" },
        { name: "modes", predicate: "https://solid-memo.com/vocab/v1#modes", kind: "enum", cardinality: "many", values: ["x"] },
      ],
    });
  });

  it("tells pod and library shapes apart and sorts by kind then version", () => {
    const models = parseShapes(files(["thing/v2.ttl", THING_V2], ["thing/v1.ttl", THING_V1]));
    expect(models.map((m) => [m.name, m.shape, m.version, m.context, m.comment])).toEqual([
      ["LibraryThingV2", "libraryThing", 2, "library", ""],
      ["ThingV1", "thing", 1, "any", "Thing one."],
      ["ThingV2", "thing", 2, "pod", ""],
    ]);
  });

  const rejects = (path: string, turtle: string, message: string) =>
    expect(() => parseShapes(files([path, turtle]))).toThrow(message);

  it("rejects files and names that do not follow the conventions", () => {
    rejects("thing.ttl", THING_V1, "shapes/thing.ttl: expected a path like <class>/v<N>.ttl.");
    rejects(
      "thing/v1.ttl",
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "thing" ; sh:class sm:Thing ; sh:property <#formatVersion> . ${V1_VERSION}`,
      'sh:name "thing" is not <Kind>V<N>.',
    );
    rejects("thing/v2.ttl", THING_V1, '"ThingV1" does not match the file\'s version 2.');
    rejects(
      "thing/v1.ttl",
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "ThingV1" ; sh:property <#formatVersion> . ${V1_VERSION}`,
      '"ThingV1" needs an sh:class in the Solid Memo vocabulary.',
    );
    rejects(
      "thing/v1.ttl",
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "ThingV1" ; sh:class sm:Thing ; sh:property <#p> .
       <#p> a sh:PropertyShape ; sh:path ( sm:a sm:b ) .`,
      "<https://solid-memo.com/shapes/thing/v1.ttl#p> has no sh:path IRI.",
    );
    rejects(
      "thing/v1.ttl",
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "ThingV1" ; sh:class sm:Thing ; sh:property <#p> .
       <#p> a sh:PropertyShape ; sh:path sm:p ; sh:datatype xsd:string .`,
      '"ThingV1" does not assert sm:formatVersion.',
    );
  });

  it("rejects a wrong version assertion", () => {
    rejects(
      "thing/v1.ttl",
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "ThingV1" ; sh:class sm:Thing ; sh:property <#formatVersion> . ${V2_VERSION}`,
      "format 1 asserts its version with sh:in ( 1 ).",
    );
    rejects(
      "thing/v2.ttl",
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "ThingV2" ; sh:class sm:Thing ; sh:property <#formatVersion> . ${V1_VERSION}`,
      "format 2 asserts its version with sh:hasValue 2.",
    );
  });

  it("rejects unsupported property shapes", () => {
    const shape = (property: string) =>
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "ThingV1" ; sh:class sm:Thing ; sh:property <#formatVersion>, <#p> .
       ${V1_VERSION} <#p> a sh:PropertyShape ; sh:path sm:p ; ${property} .`;
    rejects("thing/v1.ttl", shape("sh:datatype xsd:date"), "<https://solid-memo.com/shapes/thing/v1.ttl#p> has no supported sh:datatype or sh:nodeKind sh:IRI.");
    rejects("thing/v1.ttl", shape("sh:nodeKind sh:Literal"), "has no supported sh:datatype");
    rejects("thing/v1.ttl", shape("sh:datatype xsd:integer ; sh:in ( 1 2 )"), "uses sh:in, which is only supported for xsd:string.");
    rejects("thing/v1.ttl", shape("sh:datatype xsd:integer"), "<https://solid-memo.com/shapes/thing/v1.ttl#p> repeats a integer; only strings and IRIs may repeat.");
  });

  it("rejects duplicate field names and duplicate shape names", () => {
    rejects(
      "thing/v1.ttl",
      `${HEAD} <#shape> a sh:NodeShape ; sh:name "ThingV1" ; sh:class sm:Thing ; sh:property <#formatVersion>, <#p>, <#q> .
       ${V1_VERSION}
       <#p> a sh:PropertyShape ; sh:path sm:p ; sh:datatype xsd:string ; sh:name "same" .
       <#q> a sh:PropertyShape ; sh:path sm:q ; sh:datatype xsd:string ; sh:name "same" .`,
      '"ThingV1" has two fields named "same".',
    );
    expect(() =>
      parseShapes(files(["thing/v1.ttl", THING_V1], ["other/v1.ttl", THING_V1])),
    ).toThrow('shapes: "ThingV1" is defined twice.');
  });

  it("requires versions to run without gaps when rendering", () => {
    const models = parseShapes(files(["thing/v2.ttl", THING_V2]));
    expect(() => renderDomainTypes(models)).toThrow(
      'shapes: "libraryThing" versions must run 1, 2, … without gaps; found 2.',
    );
    expect(() => renderDescriptors(models)).toThrow("without gaps");
  });
});

describe("renderers", () => {
  const models: ShapeModel[] = parseShapes(
    files(["thing/v1.ttl", THING_V1], ["thing/v2.ttl", THING_V2_PLAIN]),
  );

  it("renders the record types and unions", () => {
    expect(renderDomainTypes(models)).toBe(`/* Generated from shapes/<class>/v<N>.ttl by \`npm run generate\`. Do not edit: change the source and regenerate. */

/** The record kinds the shapes describe (see docs/shapes.md). */
export type ShapeName = "thing";

/** The shape version this app writes for each kind. */
export const LATEST_VERSION = {
  thing: 2,
} as const;

/** Thing one. */
export interface ThingV1 {
  readonly title: string;
  readonly count?: number;
  readonly mass?: number;
  readonly created?: string;
  readonly flag: boolean;
  readonly link?: string;
  readonly mode?: "a" | "b";
  readonly tag: readonly string[];
  readonly modes: readonly ("x")[];
}

/**  */
export interface ThingV2 {
  readonly title: string;
}

export type ThingRecord = { version: 1; data: ThingV1 } | { version: 2; data: ThingV2 };

/** A record of any version, by kind. */
export type VersionedRecord = {
  thing: ThingRecord;
};

/** The latest record of each kind: what this app writes. */
export type LatestRecord = {
  thing: ThingV2;
};
`);
  });

  it("renders the descriptors and the registry", () => {
    const text = renderDescriptors(models);
    expect(text).toContain(`export const THING_V1: ShapeDescriptor<ThingV1> = {
  shape: "thing",
  version: 1,
  targetClass: "https://solid-memo.com/vocab/v1#Thing",
  shapeIri: "https://solid-memo.com/shapes/thing/v1.ttl#shape",
  shapeDocument: "thing/v1.ttl",
  context: "any",
  fields: [
    { name: "title", predicate: "http://purl.org/dc/terms/title", kind: "string", cardinality: "one" },`);
    expect(text).toContain(
      `    { name: "mode", predicate: "https://solid-memo.com/vocab/v1#mode", kind: "enum", cardinality: "optional", values: ["a","b"] },`,
    );
    expect(text).toContain("export const SHAPES = {\n  thing: { 1: THING_V1, 2: THING_V2 },\n} as const;");
    expect(text).toContain("export const ALL_SHAPES: readonly ShapeDescriptor[] = [\n  THING_V1,\n  THING_V2,\n];");
  });
});
