import { useContext } from "react";

import { SingleRestaurantContext } from "@/contexts/SingleRestaurantProvider";

export function useSingleRestaurant() {
  const context = useContext(SingleRestaurantContext);

  if (!context) {
    throw new Error(
      "useSingleRestaurant must be used within a SingleRestaurantProvider.",
    );
  }

  return context;
}
