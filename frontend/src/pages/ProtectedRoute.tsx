import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";
import { hasRole } from "@/lib/utils/auth";
import { Role } from "@/types/user-types";

type ProtectedRouteProps = {
  allowedRoles: Role[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  const isAuthorized = user && allowedRoles.some((role) => hasRole(user, role));

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
