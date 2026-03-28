import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";

export default function BlockVerifyEmailPage() {
  const { user } = useAuth();

  if (!user || user.email_verified_at) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
