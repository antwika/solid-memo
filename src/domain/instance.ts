import { LATEST_VERSION } from "./shapes/generated";

/** One Solid Memo data location (a container in a pod). */
export interface Instance {
  /** Container URL with trailing slash. The instance's identity. */
  url: string;
  name: string;
}

/** Format version written on every instance meta document this app creates. */
export const INSTANCE_FORMAT_VERSION: number = LATEST_VERSION.instance;

/** What an instance's meta document says about it. */
export interface InstanceMeta {
  name: string;
  /** ISO dateTime. */
  createdAt: string;
  formatVersion: number;
}

/** Which type index an instance is (or will be) registered in. */
export type RegistrationTarget = "private" | "public";

export interface RegistrationOptions {
  privateIndexExists: boolean;
  publicIndexExists: boolean;
}
