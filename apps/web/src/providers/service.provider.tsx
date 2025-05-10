import type {
  IAuthService,
  ISpacedRepetitionAlgorithm,
} from "@solid-memo/core";
import type { IService } from "@solid-memo/core";
import { createContext, type ReactNode } from "react";

export const ServiceContext = createContext<{
  isInitializing: boolean;
  getAuthService: () => IAuthService;
  getService: () => IService;
  getSpacedRepetitionAlgorithm: () => ISpacedRepetitionAlgorithm;
}>({
  isInitializing: true,
  getAuthService: () => {
    //throw new Error("Service not initialized");
    return {} as IAuthService;
  },
  getService: () => {
    throw new Error("Service not initialized");
  },
  getSpacedRepetitionAlgorithm: () => {
    throw new Error("Spaced repetition algorithm not initialized");
  },
});

export type ServiceProviderProps = {
  authService: IAuthService;
  service: IService;
  spacedRepetitionAlgorithm: ISpacedRepetitionAlgorithm;
  children: ReactNode;
};

export default function ServiceProvider({
  children,
  authService,
  service,
  spacedRepetitionAlgorithm,
}: ServiceProviderProps) {
  return (
    <>
      <ServiceContext.Provider
        value={{
          isInitializing: false,
          getAuthService: () => authService,
          getService: () => service,
          getSpacedRepetitionAlgorithm: () => spacedRepetitionAlgorithm,
        }}
      >
        {children}
      </ServiceContext.Provider>
    </>
  );
}
