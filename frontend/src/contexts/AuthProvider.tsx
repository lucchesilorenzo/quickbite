import { createContext, useContext, useEffect, useState } from "react";

import FullPageSpinner from "@/components/FullPageSpinner";
import { useAuthMe } from "@/features/private/hooks/auth/useAuthMe";
import { User } from "@/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user?: User | null;
  resetUser: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>();

  const { data, isLoading: isLoadingUser, isError } = useAuthMe();

  function resetUser() {
    setUser(null);
  }

  useEffect(() => {
    if (!isLoadingUser) {
      setUser(!isError ? data : null);
    }
  }, [data, isLoadingUser, isError]);

  if (user === undefined) {
    return <FullPageSpinner />;
  }

  return (
    <AuthContext.Provider value={{ user, resetUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }

  return context;
}
