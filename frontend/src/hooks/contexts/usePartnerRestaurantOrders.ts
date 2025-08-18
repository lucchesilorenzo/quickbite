import { useContext } from "react";

import { PartnerRestaurantOrdersContext } from "@/contexts/PartnerRestaurantOrdersProvider";

export function usePartnerRestaurantOrders() {
  const context = useContext(PartnerRestaurantOrdersContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurantOrders must be used within a PartnerRestaurantOrdersProvider.",
    );
  }

  return context;
}
