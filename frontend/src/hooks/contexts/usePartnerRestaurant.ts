import { useContext } from "react";

import { PartnerRestaurantContext } from "@/contexts/PartnerRestaurantProvider";

export function usePartnerRestaurant() {
  const context = useContext(PartnerRestaurantContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurant must be used within a PartnerRestaurantProvider.",
    );
  }

  return context;
}
