import { differenceInYears, isValid, parseISO } from "date-fns";

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
