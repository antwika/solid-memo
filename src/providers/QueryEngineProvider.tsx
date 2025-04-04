import type { QueryEngine } from "@comunica/query-sparql-solid";
import { useQueryEngine } from "@src/hooks/useQueryEngine";
import { createContext, type ReactNode } from "react";

export const QueryEngineContext = createContext<{ queryEngine: QueryEngine }>({
  queryEngine: {} as QueryEngine,
});

type Props = {
  children: ReactNode;
};

export function QueryEngineProvider({ children }: Props) {
  const { queryEngine } = useQueryEngine();

  if (!queryEngine) {
    return <div>Loading query engine...</div>;
  }

  return (
    <QueryEngineContext.Provider value={{ queryEngine }}>
      {children}
    </QueryEngineContext.Provider>
  );
}
