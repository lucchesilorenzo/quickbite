import { format } from "date-fns";

import { Cart, RestaurantCart } from "@/types/cart-types";
import { Offer } from "@/types/offer-types";
import { SingleRestaurantDetail } from "@/types/restaurant-types";

export function getRestaurantOpeningTime(restaurant: SingleRestaurantDetail) {
  const dayName = format(new Date(), "EEEE").toLowerCase();

  const day = restaurant.delivery_days.find((d) => d.day === dayName);
  if (!day?.start_time) return null;

  return day.start_time.slice(0, 5);
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
