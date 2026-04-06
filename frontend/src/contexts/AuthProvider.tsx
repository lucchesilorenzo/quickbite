import { createContext, useContext, useEffect } from "react";

import { useAuthMe } from "@private/shared/hooks/auth/useAuthMe";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const token = !localStorage.getItem("token") && searchParams.get("token");
    const refreshToken =
      !localStorage.getItem("refresh_token") &&
      searchParams.get("refresh_token");

    if (token && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);

      navigate("/");
    }
  }, [searchParams, navigate]);

  const {
    data = { success: false, message: "", user: undefined },
    isLoading: isLoadingUser,
    isError,
  } = useAuthMe();

  if (isLoadingUser) {
    return <FullPageSpinner />;
  }

  const user = localStorage.getItem("token") && !isError ? data.user : null;

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
