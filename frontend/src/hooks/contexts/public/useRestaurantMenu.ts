import { useContext } from "react";

import { RestaurantMenuContext } from "@/contexts/public/RestaurantMenuProvider";

export function useRestaurantMenu() {
  const context = useContext(RestaurantMenuContext);

  if (!context) {
    throw new Error(
      "useRestaurantMenu must be used within a RestaurantMenuProvider.",
    );
  }

  return context;
}
