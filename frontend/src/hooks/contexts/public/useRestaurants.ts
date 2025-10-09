import { useContext } from "react";

import { RestaurantsContext } from "@/contexts/public/RestaurantsProvider";

export function useRestaurants() {
  const context = useContext(RestaurantsContext);

  if (!context) {
    throw new Error(
      "useRestaurants must be used within a RestaurantsProvider.",
    );
  }

  return context;
}
