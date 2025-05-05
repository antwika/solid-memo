import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@styles/globals.css";
import RepositoryProvider from "@providers/repository.provider";
import { SolidRepository } from "@repositories/index";
import ServiceProvider from "@providers/service.provider";
import { AuthService } from "@services/index";
import AuthGuard from "@components/auth-guard.component";
import { AuthProvider } from "@providers/auth.provider";
import { SolidService } from "@solid-memo/core";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const authService = new AuthService();
  const solidRepository = new SolidRepository(authService);
  const solidService = new SolidService(solidRepository);

  return (
    <div className={geist.className}>
      <RepositoryProvider repository={solidRepository}>
        <ServiceProvider authService={authService} service={solidService}>
          <AuthProvider authService={authService}>
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          </AuthProvider>
        </ServiceProvider>
      </RepositoryProvider>
    </div>
  );
};

export default MyApp;
