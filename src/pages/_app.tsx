import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@src/styles/globals.css";
import { SessionProvider } from "@src/providers/SessionProvider";
import { QueryEngineProvider } from "@src/providers/QueryEngineProvider";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={geist.className}>
      <SessionProvider>
        <QueryEngineProvider>
          <Component {...pageProps} />
        </QueryEngineProvider>
      </SessionProvider>
    </div>
  );
};

export default MyApp;
