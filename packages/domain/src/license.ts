/** Short names of the licences decks commonly carry, by their URL. */
const KNOWN_LICENSES: [pattern: RegExp, label: string][] = [
  [/creativecommons\.org\/publicdomain\/zero\/1\.0/, "CC0 1.0"],
  [/creativecommons\.org\/publicdomain\/mark\/1\.0/, "Public Domain Mark 1.0"],
  [/creativecommons\.org\/licenses\/([a-z-]+)\/(\d\.\d)/, "CC $1 $2"],
];

/**
 * A readable name for a licence URL — "CC0 1.0", "CC BY-SA 4.0" — or
 * the URL itself when it is not one of the well-known ones.
 */
export function licenseLabel(url: string): string {
  for (const [pattern, label] of KNOWN_LICENSES) {
    const match = url.match(pattern);
    if (match !== null) {
      return label
        .replace("$1", (match[1] ?? "").toUpperCase())
        .replace("$2", match[2] ?? "");
    }
  }
  return url;
}
