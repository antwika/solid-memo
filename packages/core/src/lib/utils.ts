export function preferFragment(url: string) {
  const fragment = new URL(url).hash.substring(1);
  return fragment !== "" ? fragment : url;
}

export function mapArrayToRecord<T, K extends keyof T & string>(
  arr: T[],
  byKey: K
): Record<T[K] & string, T> {
  return arr.reduce((acc, item) => {
    acc[item[byKey] as T[K] & string] = item;
    return acc;
  }, {} as Record<T[K] & string, T>);
}

export function ensureTrailingSlash(url: string) {
  return url.endsWith("/") ? url : url + "/";
}
