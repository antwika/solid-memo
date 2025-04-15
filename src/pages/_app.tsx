import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@styles/globals.css";
import { QueryEngineProvider, StoreProvider } from "@providers/index";
import RepositoryProvider from "@providers/repository.provider";
import { SolidRepository } from "@repositories/index";
import ServiceProvider from "@providers/service.provider";
import { AuthService, SolidService } from "@services/index";
import AuthGuard from "@components/auth-guard.component";
import { AuthProvider } from "@providers/auth.provider";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const authService = new AuthService();
  const solidRepository = new SolidRepository(authService);
  const solidService = new SolidService();

  return (
    <div className={geist.className}>
      <StoreProvider>
        <QueryEngineProvider>
          <RepositoryProvider repository={solidRepository}>
            <ServiceProvider authService={authService} service={solidService}>
              <AuthProvider authService={authService}>
                <AuthGuard>
                  <Component {...pageProps} />
                </AuthGuard>
              </AuthProvider>
            </ServiceProvider>
          </RepositoryProvider>
        </QueryEngineProvider>
      </StoreProvider>
    </div>
  );
};

export default MyApp;
