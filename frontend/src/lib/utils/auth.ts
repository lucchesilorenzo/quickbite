import { Role, User } from "@/types/user-types";

export function hasRole(user: User | null | undefined, role: Role) {
  return !!user?.roles.some((r) => r.name === role);
}

export function isCustomer(user?: User | null): user is User {
  return hasRole(user, Role.CUSTOMER);
}

export function isPartner(user?: User | null): user is User {
  return hasRole(user, Role.PARTNER);
}

export function isRider(user?: User | null): user is User {
  return hasRole(user, Role.RIDER);
}
