import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/contexts/useAuth";

export default function RedirectIfAuthenticated() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
