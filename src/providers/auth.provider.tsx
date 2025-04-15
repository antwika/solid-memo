import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { IAuthService } from "@services/index";

type User = { name: string };

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: true,
});

type Props = { authService: IAuthService; children: ReactNode };

export const AuthProvider = ({ authService, children }: Props) => {
  const [user, setUser] = useState<User | null>(null); // null means not logged in
  const [loading, setLoading] = useState(true);

  // Simulate checking auth status
  useEffect(() => {
    const checkAuth = async () => {
      // Replace this with real auth check, e.g. fetch('/api/me')
      await authService.handleIncomingRedirect();
      const token = authService.getWebId();
      console.log("token:", token, "loading:", loading);
      if (token) {
        setUser({ name: token }); // fake user
      }
      setLoading(false);
    };
    checkAuth()
      .then(() => {
        /* NOP */
      })
      .catch((err) => {
        console.log("Error occurred when checking auth, error:", err);
      });
  }, [authService, loading]);

  console.log("AuthContext value:", { user, loading });
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
