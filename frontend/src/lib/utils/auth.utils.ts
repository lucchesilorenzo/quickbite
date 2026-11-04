import { UserResource, UserRole } from "@/api/models";

export function hasRole(user: UserResource | null | undefined, role: UserRole) {
  return !!user?.roles?.some((r) => r.name === role);
}

export function isCustomer(user?: UserResource | null): user is UserResource {
  return hasRole(user, "customer");
}

export function isPartner(user?: UserResource | null): user is UserResource {
  return hasRole(user, "partner");
}

export function isRider(user?: UserResource | null): user is UserResource {
  return hasRole(user, "rider");
}
