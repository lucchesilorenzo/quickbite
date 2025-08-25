import { createContext, useEffect, useState } from "react";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuthMe } from "@/hooks/react-query/private/auth/useAuthMe";
import { User } from "@/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user?: User | null;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>();

  const { data, isLoading, isError } = useAuthMe();

  useEffect(() => {
    if (!isLoading) {
      setUser(!isError ? data : null);
    }
  }, [isLoading, isError, data]);

  if (user === undefined) return <FullPageSpinner />;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
