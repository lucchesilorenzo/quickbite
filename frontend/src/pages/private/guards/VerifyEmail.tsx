import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";

export default function VerifyEmail() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  if (!user) {
    return <Outlet />;
  }

  if (!user.email_verified_at && pathname !== "/auth/verify-email") {
    return <Navigate to="/auth/verify-email" replace />;
  }

  return <Outlet />;
}
