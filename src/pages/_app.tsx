import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@styles/globals.css";
import {
  SessionProvider,
  QueryEngineProvider,
  StoreProvider,
} from "@providers/index";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={geist.className}>
      <StoreProvider>
        <SessionProvider>
          <QueryEngineProvider>
            <Component {...pageProps} />
          </QueryEngineProvider>
        </SessionProvider>
      </StoreProvider>
    </div>
  );
};

export default MyApp;
