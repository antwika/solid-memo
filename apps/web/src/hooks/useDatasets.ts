import { multiFetcher } from "@lib/utils";
import useSWR from "swr";

export default function useDatasets(iris?: string | string[]) {
  const { data, mutate, isLoading } = useSWR(
    typeof iris === "string" ? [iris] : iris,
    multiFetcher
  );
  return { data, mutate, isLoading };
}
