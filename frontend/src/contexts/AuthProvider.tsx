import { createContext, useEffect, useState } from "react";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuthMe } from "@/hooks/react-query/private/auth/useAuthMe";
import { User } from "@/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const { data = null, isLoading, isError } = useAuthMe();

  useEffect(() => {
    setUser(!isError ? data : null);
  }, [isError, data]);

  if (isLoading) return <FullPageSpinner />;

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
