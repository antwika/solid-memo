import type { IRepository } from "@solid-memo/core";
import { createContext, type ReactNode } from "react";

export const RepositoryContext = createContext<{
  getRepository: () => IRepository;
}>({
  getRepository: () => {
    throw new Error("Repository not initialized");
  },
});

export type RepositoryProviderProps = {
  repository: IRepository;
  children: ReactNode;
};

export default function RepositoryProvider({
  children,
  repository,
}: RepositoryProviderProps) {
  return (
    <>
      <RepositoryContext.Provider
        value={{
          getRepository: () => repository,
        }}
      >
        {children}
      </RepositoryContext.Provider>
    </>
  );
}
