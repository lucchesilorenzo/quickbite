import { Navigate, Outlet } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/hooks/contexts/useAuth";
import { hasRole } from "@/lib/utils";
import { Role } from "@/types";

type ProtectedRouteProps = {
  allowedRoles: Role[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (user === null && !isLoading) return <FullPageSpinner />;

  const isAuthorized = user && allowedRoles.some((role) => hasRole(user, role));

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
