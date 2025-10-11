import { User } from "@/types";

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
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
