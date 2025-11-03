import { createContext, useContext } from "react";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuthMe } from "@/features/private/hooks/auth/useAuthMe";
import { User } from "@/types/user-types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user?: User | null;
};

const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const { data, isLoading: isLoadingUser, isError } = useAuthMe();

  if (isLoadingUser) {
    return <FullPageSpinner />;
  }

  const user = !isError ? data : null;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }

  return context;
}
