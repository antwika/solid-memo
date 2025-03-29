import type { Session } from "@inrupt/solid-client-authn-browser";
import useSession from "@src/hooks/useSession";
import Login from "@src/pages/login";
import { createContext, type ReactNode } from "react";

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
  const { session, tryLogIn, tryLogOut } = useSession();

  if (!session) {
    return <Login tryLogIn={tryLogIn} />;
  }

  return (
    <SessionContext.Provider value={{ session, tryLogOut }}>
      {children}
    </SessionContext.Provider>
  );
}
