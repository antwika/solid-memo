import { useRouter } from "next/router";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@providers/auth.provider";
import Layout from "@pages/layout";
import { Button } from "@ui/index";

type Props = {
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const atLoginPage = router.pathname === "/login";

  useEffect(() => {
    if (atLoginPage) return;
    if (!loading && !user) {
      // router.push("/login");
    }
  }, [atLoginPage, loading, user]);

  if (!atLoginPage && (loading || !user)) {
    return (
      <Layout>
        <div className="flex items-center gap-2">
          <div>Not logged in</div>
        </div>
        <div>
          <Button
            onClick={() => {
              router.push("/login").catch((err) => {
                console.error("Failed with error:", err);
              });
            }}
          >
            Go to Login page
          </Button>
        </div>
      </Layout>
    );
  }

  return children;
};

export default AuthGuard;
