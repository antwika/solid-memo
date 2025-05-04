import type { IAuthService } from "@solid-memo/core";
import type { IService } from "@solid-memo/core";
import { createContext, type ReactNode } from "react";

export const ServiceContext = createContext<{
  isInitializing: boolean;
  getAuthService: () => IAuthService;
  getService: () => IService;
}>({
  isInitializing: true,
  getAuthService: () => {
    //throw new Error("Service not initialized");
    return {} as IAuthService;
  },
  getService: () => {
    throw new Error("Service not initialized");
  },
});

export type ServiceProviderProps = {
  authService: IAuthService;
  service: IService;
  children: ReactNode;
};

export default function ServiceProvider({
  children,
  authService,
  service,
}: ServiceProviderProps) {
  return (
    <>
      <ServiceContext.Provider
        value={{
          isInitializing: false,
          getAuthService: () => authService,
          getService: () => service,
        }}
      >
        {children}
      </ServiceContext.Provider>
    </>
  );
}
