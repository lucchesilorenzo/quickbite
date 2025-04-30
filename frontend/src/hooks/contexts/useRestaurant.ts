import { useContext } from "react";

import { RestaurantContext } from "@/contexts/RestaurantProvider";

export function useRestaurant() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider.");
  }

  return context;
}
