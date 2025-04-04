import {
  getDefaultSession,
  handleIncomingRedirect,
  login,
  logout,
  type Session,
} from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import { env } from "@src/env";

export default function useSession() {
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

  return {
    tryLogIn,
    tryLogOut,
    session,
  };
}
