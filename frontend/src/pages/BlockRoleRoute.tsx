import { Navigate, Outlet } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/hooks/contexts/useAuth";
import { hasRole, isCustomer, isPartner, isRider } from "@/lib/utils";
import { Role } from "@/types";

type BlockRoleRouteProps = {
  blockedRoles: Role[];
};

export default function BlockRoleRoute({ blockedRoles }: BlockRoleRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <FullPageSpinner />;

  const isBlocked = user && blockedRoles.some((role) => hasRole(user, role));

  if (isBlocked) {
    if (isCustomer(user)) return <Navigate to="/" replace />;
    if (isPartner(user)) return <Navigate to="/partner/dashboard" replace />;
    if (isRider(user)) return <Navigate to="/rider/dashboard" replace />;
  }

  return <Outlet />;
}
