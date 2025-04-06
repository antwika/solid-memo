import { QueryEngine } from "@comunica/query-sparql-solid";
import { createContext, useEffect, useState, type ReactNode } from "react";

export const QueryEngineContext = createContext<{ queryEngine: QueryEngine }>({
  queryEngine: {} as QueryEngine,
});

type Props = {
  children: ReactNode;
};

export function QueryEngineProvider({ children }: Props) {
  const [queryEngine, setQueryEngine] = useState<QueryEngine>();

  useEffect(() => {
    setQueryEngine(new QueryEngine());
  }, []);

  if (!queryEngine) {
    return <div>Loading query engine...</div>;
  }

  return (
    <QueryEngineContext.Provider value={{ queryEngine }}>
      {children}
    </QueryEngineContext.Provider>
  );
}
