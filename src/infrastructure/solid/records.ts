import {
  addDatetime,
  buildThing,
  createThing,
  getBoolean,
  getDatetime,
  getDecimal,
  getInteger,
  getStringNoLocale,
  getStringNoLocaleAll,
  getUrl,
  getUrlAll,
  type Thing,
  type ThingBuilder,
  type ThingPersisted,
} from "@inrupt/solid-client";
import {
  LATEST_VERSION,
  type ShapeName,
  type VersionedRecord,
} from "../../domain/shapes/generated";
import type {
  FieldDescriptor,
  ShapeDescriptor,
} from "../shacl/shapeDescriptor";
import { SHAPES } from "../shacl/shapes.generated";
import { RDF, SM } from "./vocab";

/**
 * The generic half of every mapper: a subject read into the record its
 * shape describes, and a record written onto a subject. Which predicates,
 * of which kind and how many, comes from the shape's descriptor, so a
 * mapper can only read and write what the shape says (see docs/shapes.md).
 */

type FieldValue = string | number | boolean | readonly string[];

/** One field's value; undefined when absent, null when a required one is. */
function readField(thing: Thing, field: FieldDescriptor): FieldValue | null | undefined {
  if (field.cardinality === "many") {
    return field.kind === "iri"
      ? getUrlAll(thing, field.predicate)
      : getStringNoLocaleAll(thing, field.predicate);
  }
  const value = readScalar(thing, field);
  if (value === null) return field.cardinality === "one" ? null : undefined;
  return value;
}

function readScalar(thing: Thing, field: FieldDescriptor): string | number | boolean | null {
  switch (field.kind) {
    case "string":
      return getStringNoLocale(thing, field.predicate);
    case "enum": {
      const value = getStringNoLocale(thing, field.predicate);
      return value !== null && field.values!.includes(value) ? value : null;
    }
    case "integer":
      return getInteger(thing, field.predicate);
    case "decimal":
      return getDecimal(thing, field.predicate);
    case "boolean":
      return getBoolean(thing, field.predicate);
    case "dateTime":
      return getDatetime(thing, field.predicate)?.toISOString() ?? null;
    case "iri":
      return getUrl(thing, field.predicate);
  }
}

/**
 * The subject as a record of the shape; null when a required field is
 * missing (or an enum holds a value the shape does not list).
 */
export function readRecord<T>(thing: Thing, descriptor: ShapeDescriptor<T>): T | null {
  const record: Record<string, FieldValue> = {};
  for (const field of descriptor.fields) {
    const value = readField(thing, field);
    if (value === null) return null;
    if (value !== undefined) record[field.name] = value;
  }
  return record as T;
}

/** What a subject says about its format: absent means 1. */
export function storedVersionOf(thing: Thing): number {
  return getInteger(thing, SM.formatVersion) ?? 1;
}

/**
 * A subject of the given kind, read with the shape of its stored version
 * — or, for a version newer than this app knows, with the latest shape
 * it has, the stored version passing through. Null when the subject is
 * not of the kind's class, or does not fit its shape.
 */
export function readVersioned<S extends ShapeName>(
  thing: Thing,
  shape: S,
): { storedVersion: number; record: VersionedRecord[S] } | null {
  const storedVersion = storedVersionOf(thing);
  const version = Math.min(Math.max(storedVersion, 1), LATEST_VERSION[shape]);
  const descriptor = (SHAPES[shape] as Record<number, ShapeDescriptor>)[version];
  if (!getUrlAll(thing, RDF.type).includes(descriptor.targetClass)) return null;
  const data = readRecord(thing, descriptor);
  if (data === null) return null;
  return { storedVersion, record: { version, data } as VersionedRecord[S] };
}

/**
 * Write the record's fields onto the subject, replacing only the
 * predicates the shape owns: an absent optional field removes its
 * triple, anything the shape does not mention survives.
 */
export function applyRecord<T>(
  builder: ThingBuilder<ThingPersisted>,
  descriptor: ShapeDescriptor<T>,
  record: T,
): ThingBuilder<ThingPersisted> {
  for (const field of descriptor.fields) {
    builder.removeAll(field.predicate);
    const value = (record as Record<string, FieldValue | undefined>)[field.name];
    if (value === undefined) continue;
    for (const one of Array.isArray(value) ? value : [value]) {
      addValue(builder, field, one as string | number | boolean);
    }
  }
  return builder;
}

function addValue(
  builder: ThingBuilder<ThingPersisted>,
  field: FieldDescriptor,
  value: string | number | boolean,
): void {
  switch (field.kind) {
    case "string":
    case "enum":
      builder.addStringNoLocale(field.predicate, value as string);
      break;
    case "integer":
      builder.addInteger(field.predicate, value as number);
      break;
    case "decimal":
      builder.addDecimal(field.predicate, value as number);
      break;
    case "boolean":
      builder.addBoolean(field.predicate, value as boolean);
      break;
    case "dateTime":
      builder.addDatetime(field.predicate, new Date(value as string));
      break;
    case "iri":
      builder.addIri(field.predicate, value as string);
      break;
  }
}

/**
 * The subject as this app writes it: the existing subject (so unknown
 * triples survive) or a new one, typed once, with the record applied and
 * the shape's version stamped.
 */
export function recordThing<T>(
  url: string,
  descriptor: ShapeDescriptor<T>,
  record: T,
  existing: ThingPersisted | null,
): ThingPersisted {
  const thing = existing ?? createThing({ url });
  const builder = buildThing(thing);
  if (!getUrlAll(thing, RDF.type).includes(descriptor.targetClass)) {
    builder.addIri(RDF.type, descriptor.targetClass);
  }
  return applyRecord(builder, descriptor, record)
    .setInteger(SM.formatVersion, descriptor.version)
    .build();
}

// addDatetime is re-exported for mappers that stamp times outside a record.
export { addDatetime };
