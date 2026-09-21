import type { ComponentChildren } from "preact";
import { isLinkableUrl } from "../domain/webId";

/**
 * A URL shown to the user is always clickable — provided it is safe to
 * follow. URLs mostly come from pod data, so anything but http(s)/mailto
 * renders as plain text instead of a link. Opens in a new tab: these point
 * outside the app.
 */
export function ExternalLink({
  url,
  class: className,
  children,
}: {
  url: string;
  class?: string;
  /** Link text; defaults to the URL itself. */
  children?: ComponentChildren;
}) {
  const text = children ?? url;
  if (!isLinkableUrl(url)) {
    return <span class={className}>{text}</span>;
  }
  return (
    <a class={className} href={url} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}
