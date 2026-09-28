import type { SolidDataset } from "@inrupt/solid-client";

/**
 * What a repository checks a document with before it saves it (see
 * docs/validation.md): throws, naming every problem, unless every
 * subject the write touches conforms to its shape and, in a document
 * with DCAT subjects, to DCAT-AP. The app wires the SHACL validator in;
 * without one, nothing is checked.
 */
export type WriteCheck = (dataset: SolidDataset, subjects: readonly string[]) => Promise<void>;

export const noWriteCheck: WriteCheck = async () => undefined;
