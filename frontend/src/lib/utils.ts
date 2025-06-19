import { differenceInYears, isValid, parseISO } from "date-fns";

import { Role, User } from "@/types";

export function formatCurrency(price: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function truncateWords(text: string, wordCount: number) {
  const words = text.split(" ");

  return words.length > wordCount
    ? words.slice(0, wordCount).join(" ") + "..."
    : text;
}

export function isAdult(dateOfBirth: string) {
  const dob = parseISO(dateOfBirth);
  if (!isValid(dob)) return false;

  const age = differenceInYears(new Date(), dob);
  return age >= 18;
}

export function calculatePasswordStrength(password: string) {
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return (strength / 5) * 100;
}

export function hasRole(user: User | null, role: Role) {
  return !!user?.roles.some((r) => r.name === role);
}

export function isCustomer(user: User | null): user is User {
  return hasRole(user, Role.CUSTOMER);
}

export function isRestaurateur(user: User | null): user is User {
  return hasRole(user, Role.RESTAURATEUR);
}

export function isRider(user: User | null): user is User {
  return hasRole(user, Role.RIDER);
}
