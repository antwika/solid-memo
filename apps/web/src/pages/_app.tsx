import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@styles/globals.css";
import RepositoryProvider from "@providers/repository.provider";
import { InruptSolidClientRepository } from "@solid-memo/inrupt-solid-client-repository";
import ServiceProvider from "@providers/service.provider";
import AuthGuard from "@components/auth-guard.component";
import { AuthProvider } from "@providers/auth.provider";
import { AuthService, SolidService } from "@solid-memo/core";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const solidRepository = new InruptSolidClientRepository();
  const authService = new AuthService(solidRepository);
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
