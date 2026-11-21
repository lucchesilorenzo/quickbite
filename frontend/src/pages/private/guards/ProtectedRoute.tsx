import { Navigate, Outlet } from "react-router-dom";

import { UserRole } from "@/api/models";
import { useAuth } from "@/contexts/AuthProvider";
import { hasRole } from "@/lib/utils/auth.utils";

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  const isAuthorized = user && allowedRoles.some((role) => hasRole(user, role));

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
