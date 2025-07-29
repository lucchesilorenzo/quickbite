import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/contexts/useAuth";
import { hasRole, isCustomer, isPartner, isRider } from "@/lib/utils";
import { Role } from "@/types";

type BlockRoleRouteProps = {
  blockedRoles: Role[];
};

export default function BlockRoleRoute({ blockedRoles }: BlockRoleRouteProps) {
  const { user } = useAuth();

  const isBlocked = user && blockedRoles.some((role) => hasRole(user, role));

  if (isBlocked) {
    if (isCustomer(user)) return <Navigate to="/" replace />;
    if (isPartner(user)) return <Navigate to="/partner/restaurants" replace />;
    if (isRider(user)) return <Navigate to="/rider/dashboard" replace />;
  }

  return <Outlet />;
}
