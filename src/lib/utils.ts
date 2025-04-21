import { responseToSolidDataset } from "@inrupt/solid-client";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher(url: string) {
  const session = getDefaultSession();
  const res = await session.fetch(url);
  return responseToSolidDataset(res).catch(() => {
    /* NOP */
  });
}

export async function multiFetcher(urls: string[]) {
  return Promise.all(urls.map((url) => fetcher(url))).then((datasets) =>
    datasets.filter((prom) => prom !== undefined)
  );
}

export function preferFragment(url: string) {
  const fragment = new URL(url).hash.substring(1);
  return fragment !== "" ? fragment : url;
}

export function mapArrayToRecord<T, K extends keyof T & string>(
  arr: T[],
  byKey: K
): Record<T[K] & string, T> {
  return arr.reduce(
    (acc, item) => {
      acc[item[byKey] as T[K] & string] = item;
      return acc;
    },
    {} as Record<T[K] & string, T>
  );
}
