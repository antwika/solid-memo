import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@styles/globals.css";
import {
  SessionProvider,
  QueryEngineProvider,
  StoreProvider,
} from "@providers/index";
import RepositoryProvider from "@providers/repository.provider";
import { SolidRepository } from "@repositories/index";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const solidRepository = new SolidRepository();

  return (
    <div className={geist.className}>
      <StoreProvider>
        <SessionProvider>
          <QueryEngineProvider>
            <RepositoryProvider repository={solidRepository}>
              <Component {...pageProps} />
            </RepositoryProvider>
          </QueryEngineProvider>
        </SessionProvider>
      </StoreProvider>
    </div>
  );
};

export default MyApp;
