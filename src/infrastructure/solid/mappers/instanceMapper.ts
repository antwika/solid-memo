import type { Instance } from "../../../domain/instance";
import type { InstanceRegistration } from "../typeIndex";
import { ensureTrailingSlash, lastPathSegment } from "../urls";

/**
 * A registration's display name is its dcterms:title, falling back to the
 * container's last path segment.
 */
export function toInstance(registration: InstanceRegistration): Instance {
  const url = ensureTrailingSlash(registration.containerUrl);
  return {
    url,
    name: registration.title ?? lastPathSegment(url),
  };
}
