import { differenceInYears, format, isValid, parse, parseISO } from "date-fns";

import {
  Cart,
  Offer,
  RestaurantCart,
  RestaurantDetail,
  Role,
  User,
} from "@/types";

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

export function isRestaurantOpen(restaurant: RestaurantDetail): boolean {
  const dayName = format(new Date(), "EEEE").toUpperCase();
  const currentTime = format(new Date(), "HH:mm");

  return restaurant.delivery_days.some((d) => {
    if (!d.start_time || !d.end_time) return false;

    return (
      d.day === dayName &&
      currentTime >= d.start_time &&
      currentTime <= d.end_time
    );
  });
}

export function getRestaurantOpeningTime(restaurant: RestaurantDetail) {
  const dayName = format(new Date(), "EEEE").toUpperCase();

  const day = restaurant.delivery_days.find((d) => d.day === dayName);
  if (!day?.start_time) return null;

  const start = parse(day.start_time, "HH:mm:ss", new Date());
  const formattedStart = format(start, "HH:mm");

  return formattedStart;
}

export function getBestRestaurantOfferGivenSubtotal(
  restaurant: RestaurantDetail,
  subtotal: number,
): Offer | null {
  const validOffers = restaurant.offers.filter(
    (offer) => subtotal >= offer.min_discount_amount,
  );

  if (!validOffers.length) return null;

  return validOffers.reduce((best, curr) =>
    curr.discount_rate > best.discount_rate ? curr : best,
  );
}
export function addRestaurantIdAsKey(carts: RestaurantCart[]) {
  return carts.reduce((acc, curr) => {
    acc[curr.restaurant.id] = { ...curr };
    return acc;
  }, {} as Cart);
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// --- Auth ---

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
