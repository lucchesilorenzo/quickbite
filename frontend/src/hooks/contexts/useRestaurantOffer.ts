import { useContext } from "react";

import { RestaurantOffersContext } from "@/contexts/RestaurantOffersProvider";

export function useRestaurantOffer() {
  const context = useContext(RestaurantOffersContext);

  if (!context) {
    throw new Error(
      "useRestaurantOffer must be used within a RestaurantOfferProvider.",
    );
  }

  return context;
}
