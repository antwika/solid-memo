import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@src/styles/globals.css";
import { SessionProvider } from "@src/providers/SessionProvider";
import { QueryEngineProvider } from "@src/providers/QueryEngineProvider";
import { StoreProvider } from "@src/providers/StoreProvider";

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
