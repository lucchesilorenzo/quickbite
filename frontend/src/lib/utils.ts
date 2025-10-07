import {
  differenceInYears,
  format,
  isValid,
  parse,
  parseISO,
  subDays,
} from "date-fns";

import { colors, orderStatuses, partnerStatusTransitions } from "./data";

import {
  Cart,
  Offer,
  RestaurantCart,
  Role,
  SingleRestaurantDetail,
  StatRange,
  User,
} from "@/types";
import { OrderStatus } from "@/types/order-types";

export function formatCurrency(price: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function formatAddress(address?: Partial<User | null>) {
  if (
    !address?.street_address ||
    !address?.building_number ||
    !address?.postcode ||
    !address?.city ||
    !address?.state
  ) {
    return null;
  }

  return `${address.street_address} ${address.building_number}, ${address.postcode} ${address.city}, ${address.state}`;
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

export function getRestaurantOpeningTime(restaurant: SingleRestaurantDetail) {
  const dayName = format(new Date(), "EEEE").toUpperCase();

  const day = restaurant.delivery_days.find((d) => d.day === dayName);
  if (!day?.start_time) return null;

  const start = parse(day.start_time, "HH:mm:ss", new Date());
  const formattedStart = format(start, "HH:mm");

  return formattedStart;
}

export function getBestRestaurantOfferGivenSubtotal(
  offers: Offer[],
  subtotal: number,
) {
  const validOffers = offers.filter(
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

export function getColorByName(name?: string) {
  if (!name) return colors[0];

  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function getDisabledOrderStatuses(currentStatus: OrderStatus) {
  return Object.keys(orderStatuses).filter(
    (s) => !partnerStatusTransitions[currentStatus].includes(s as OrderStatus),
  );
}

export function getComputedRangeLabel(range: StatRange) {
  const today = new Date();

  if (range === "all") {
    return "for all time";
  }

  const ranges: Record<string, number> = {
    "7d": 7,
    "14d": 14,
    "30d": 30,
  };

  const days = ranges[range];
  if (!days) return "";

  const from = subDays(today, days);

  return `from ${format(from, "d MMM")} - ${format(today, "d MMM")}`;
}

// === Auth ===

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
