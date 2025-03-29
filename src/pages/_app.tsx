import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import "@src/styles/globals.css";
import { SessionProvider } from "@src/providers/SessionProvider";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={geist.className}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
};

export default MyApp;
