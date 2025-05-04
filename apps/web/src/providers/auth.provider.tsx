import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { IAuthService } from "@solid-memo/core";

type User = { name: string };

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: true,
});

export type AuthProviderProps = {
  authService: IAuthService;
  children: ReactNode;
};

export const AuthProvider = ({ authService, children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // null means not logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await authService.handleIncomingRedirect((url: string) =>
        router.push(url)
      );

      const token = authService.getWebId();

      if (token) {
        setUser({ name: token });
      }
      setLoading(false);
    };
    checkAuth()
      .then(() => {
        /* NOP */
      })
      .catch((err) => {
        console.error("Failed with error:", err);
      });
  }, [authService, loading, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
