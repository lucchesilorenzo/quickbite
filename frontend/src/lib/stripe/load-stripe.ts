import { Stripe, loadStripe } from "@stripe/stripe-js";

import env from "../env";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> | null {
  const key = env.VITE_STRIPE_PUBLISHABLE_KEY;

  if (!key) return null;

  if (!stripePromise) {
    stripePromise = loadStripe(key);
  }

  return stripePromise;
}
