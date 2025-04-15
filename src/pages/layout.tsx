import { Header } from "@components/index";
import { ServiceContext } from "@providers/service.provider";
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
        <div className="container items-center justify-center gap-6 space-y-2 bg-white/80 p-6">
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
