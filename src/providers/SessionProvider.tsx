import {
  getDefaultSession,
  handleIncomingRedirect,
  login,
  logout,
  type Session,
} from "@inrupt/solid-client-authn-browser";
import { env } from "@src/env";
import Login from "@src/pages/login";
import { createContext, useEffect, useState, type ReactNode } from "react";

export const SessionContext = createContext<{
  session: Session;
  tryLogOut: () => Promise<void>;
}>({
  session: {} as Session,
  tryLogOut: async () => {
    /* NOP */
  },
});

type Props = {
  children: ReactNode;
};

export function SessionProvider({ children }: Props) {
  const [session, setSession] = useState<Session>();

  const tryLogIn = async (oidcIssuer: string) => {
    await login({
      oidcIssuer,
      redirectUrl: new URL(
        env.NEXT_PUBLIC_BASE_PATH,
        window.location.href,
      ).toString(),
      clientName: "Solid Memo",
    });
  };

  const tryLogOut = async () => {
    await logout({ logoutType: "app" });
    setSession(undefined);
  };

  const tryHandleIncomingRedirect = async () => {
    await handleIncomingRedirect();
    const defaultSession = getDefaultSession();

    if (defaultSession.info.isLoggedIn) {
      if (defaultSession.info.webId) {
        console.log(`Logged in as ${defaultSession.info.webId}`);
        setSession(defaultSession);
      }
      if (!defaultSession.info.webId) {
        console.error("Missing webId!");
      }
    }
  };

  useEffect(() => {
    tryHandleIncomingRedirect()
      .then(() => {
        console.log("Successfully handled incoming redirect (if present)");
      })
      .catch(() => {
        console.log("Failed handled incoming redirect");
      });
  }, []);

  if (!session) {
    return <Login tryLogIn={tryLogIn} />;
  }

  return (
    <SessionContext.Provider value={{ session, tryLogOut }}>
      {children}
    </SessionContext.Provider>
  );
}
