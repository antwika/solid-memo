import type { IRepository } from "@repositories/index";
import { createContext, type ReactNode } from "react";

export const RepositoryContext = createContext<{
  getRepository: () => IRepository;
}>({
  getRepository: () => {
    throw new Error("Repository not initialized");
  },
});

export type Props = {
  repository: IRepository;
  children: ReactNode;
};

export default function RepositoryProvider({ children, repository }: Props) {
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
