import { createContext, useContext } from "react";

import { useAuthMe } from "@private/shared/hooks/auth/useAuthMe";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { User } from "@/types/user.types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user?: User | null;
};

const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const {
    data = { success: false, message: "", user: undefined },
    isLoading: isLoadingUser,
    isError,
  } = useAuthMe();

  if (isLoadingUser) {
    return <FullPageSpinner />;
  }

  const user = !isError ? data.user : null;

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
