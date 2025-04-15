import type { IAuthService, IService } from "@services/index";
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

export type Props = {
  authService: IAuthService;
  service: IService;
  children: ReactNode;
};

export default function ServiceProvider({
  children,
  authService,
  service,
}: Props) {
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
