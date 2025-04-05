import { Header } from "@src/components/Header";
import { SessionContext } from "@src/providers/SessionProvider";
import Head from "next/head";
import { useContext, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { session, tryLogOut } = useContext(SessionContext);
  return (
    <>
      <Head>
        <title>Solid Memo</title>
        <meta
          name="description"
          content="A memorization app built using Solid"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center">
        <div className="container items-center justify-center gap-6 space-y-2 bg-white/80 px-4 py-16">
          {session.info?.isLoggedIn && <Header onLogOut={tryLogOut} />}
          {children}
        </div>
      </main>
    </>
  );
}
