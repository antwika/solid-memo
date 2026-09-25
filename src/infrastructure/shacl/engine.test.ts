import { describe, expect, it } from "vitest";
import { datasetFromTurtle } from "../../test/turtle";
import { createEngine } from "./engine";

const SHAPES = `
@prefix sh:  <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix ex:  <https://example.com/ns#> .
<#shape> a sh:NodeShape ;
    sh:property <#name>, <#age>, <#note> ;
    sh:pattern "^https://" .
<#either> a sh:NodeShape ;
    sh:pattern "^https://" ;
    sh:xone ( [ sh:property [ sh:path ex:age ; sh:minCount 1 ] ] [ sh:property [ sh:path ex:note ; sh:minCount 1 ] ] ) .
<#name> sh:path ex:name ; sh:datatype xsd:string ; sh:minCount 1 ; sh:maxCount 1 ;
    sh:message "One name, as text." .
<#age> sh:path ex:age ; sh:datatype xsd:integer ; sh:severity sh:Warning .
<#note> sh:path ex:note ; sh:maxCount 1 ; sh:severity sh:Info .
`;
const SHAPES_URL = "https://example.com/shapes.ttl";
const DATA_URL = "https://example.com/data.ttl";

async function engine() {
  return createEngine(await datasetFromTurtle(SHAPES, SHAPES_URL));
}

describe("createEngine", () => {
  it("returns no violations for a conforming node", async () => {
    const data = await datasetFromTurtle(
      `<#a> <https://example.com/ns#name> "Ann" .`,
      DATA_URL,
    );
    expect(
      await (await engine()).validateNode(data, `${DATA_URL}#a`, `${SHAPES_URL}#shape`),
    ).toEqual([]);
  });

  it("maps path, value, message and severity, sorted by path then message", async () => {
    const data = await datasetFromTurtle(
      `@prefix ex: <https://example.com/ns#> .
       <#a> ex:name "Ann", "Anne" ; ex:age "young" ; ex:note "x", "y" .`,
      DATA_URL,
    );
    expect(
      await (await engine()).validateNode(data, `${DATA_URL}#a`, `${SHAPES_URL}#shape`),
    ).toEqual([
      {
        path: "https://example.com/ns#age",
        message: 'Value does not have datatype <http://www.w3.org/2001/XMLSchema#integer>',
        value: "young",
        severity: "warning",
        constraint: "Datatype",
      },
      {
        path: "https://example.com/ns#name",
        message: "One name, as text.",
        severity: "violation",
        constraint: "MaxCount",
      },
      {
        path: "https://example.com/ns#note",
        message: "More than 1 values",
        severity: "info",
        constraint: "MaxCount",
      },
    ]);
  });

  it("reports a constraint on the subject itself without a path", async () => {
    const data = await datasetFromTurtle(
      `<http://example.com/plain> <https://example.com/ns#name> "Ann" .`,
      DATA_URL,
    );
    expect(
      await (await engine()).validateNode(data, "http://example.com/plain", `${SHAPES_URL}#shape`),
    ).toEqual([
      {
        message: 'Value does not match pattern "^https://"',
        value: "http://example.com/plain",
        severity: "violation",
        constraint: "Pattern",
      },
    ]);
  });

  it("names the constraint when the engine has no message for it, sorting pathless results by message", async () => {
    const data = await datasetFromTurtle(
      `<http://example.com/plain> <https://example.com/ns#name> "Ann" .`,
      DATA_URL,
    );
    expect(
      await (await engine()).validateNode(data, "http://example.com/plain", `${SHAPES_URL}#either`),
    ).toEqual([
      {
        message: 'Value does not match pattern "^https://"',
        value: "http://example.com/plain",
        severity: "violation",
        constraint: "Pattern",
      },
      {
        message: "Xone constraint failed.",
        value: "http://example.com/plain",
        severity: "violation",
        constraint: "Xone",
      },
    ]);
  });

  it("starts every check afresh", async () => {
    const e = await engine();
    const bad = await datasetFromTurtle(`<#a> <https://example.com/ns#age> "x" .`, DATA_URL);
    const good = await datasetFromTurtle(`<#a> <https://example.com/ns#name> "Ann" .`, DATA_URL);
    expect(await e.validateNode(bad, `${DATA_URL}#a`, `${SHAPES_URL}#shape`)).toHaveLength(2);
    expect(await e.validateNode(good, `${DATA_URL}#a`, `${SHAPES_URL}#shape`)).toEqual([]);
  });
});
