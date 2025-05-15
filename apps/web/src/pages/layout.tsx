import { Header } from "@components/index";
import { env } from "@lib/env";
import { ensureTrailingSlash } from "@solid-memo/core";
import { ServiceContext } from "@providers/service.provider";
import { Button } from "@ui/index";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { getAuthService } = useContext(ServiceContext);
  const authService = getAuthService();
  const { NEXT_PUBLIC_BASE_PATH, NEXT_PUBLIC_VERSION } = env();

  return (
    <>
      <Head>
        <title>Solid Memo</title>
        <meta
          name="description"
          content="A memorization app built using Solid"
        />
        <link
          rel="icon"
          href={`${ensureTrailingSlash(NEXT_PUBLIC_BASE_PATH)}favicon.ico`}
        />
      </Head>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center">
        {NEXT_PUBLIC_VERSION !== "main" && (
          <div className="absolute italic opacity-30">
            <div className="p-1">Version: {NEXT_PUBLIC_VERSION}</div>
          </div>
        )}
        <div className="container items-center justify-center gap-6 space-y-2 bg-white/60 p-6">
          <Header
            onLogOut={() => {
              authService
                .logOut()
                .then(() => {
                  router.push("/login");
                })
                .catch((err) => {
                  console.error("Failed with error:", err);
                });
            }}
          />
          {children}
        </div>
      </main>
    </>
  );
}
