import { useContext } from "react";

import { PartnerRestaurantMenuContext } from "@/contexts/private/partner/PartnerRestaurantMenuProvider";

export function usePartnerRestaurantMenu() {
  const context = useContext(PartnerRestaurantMenuContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurantMenu must be used within a PartnerRestaurantMenuProvider.",
    );
  }

  return context;
}
