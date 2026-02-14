import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";
import { hasRole, isCustomer, isPartner, isRider } from "@/lib/utils/auth";
import { Role } from "@/types/user.types";

type ProtectedRouteProps = {
  allowedRoles: Role[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  const isAuthorized = user && allowedRoles.some((role) => hasRole(user, role));

  if (!isAuthorized) {
    if (isCustomer(user)) return <Navigate to="/" replace />;
    if (isPartner(user)) return <Navigate to="/partner/restaurants" replace />;
    if (isRider(user)) return <Navigate to="/rider/job-posts" replace />;
  }

  return <Outlet />;
}
