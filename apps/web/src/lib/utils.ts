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
  return responseToSolidDataset(res);
}

export async function multiFetcher(urls: string[]) {
  return Promise.all(urls.map((url) => fetcher(url))).then((datasets) =>
    datasets.filter((prom) => prom !== undefined)
  );
}
