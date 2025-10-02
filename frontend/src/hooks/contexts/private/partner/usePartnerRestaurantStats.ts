import { useContext } from "react";

import { PartnerRestaurantStatsContext } from "@/contexts/private/partner/PartnerRestaurantStatsProvider";

export function usePartnerRestaurantStats() {
  const context = useContext(PartnerRestaurantStatsContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurantStats must be used within a PartnerRestaurantStatsProvider.",
    );
  }

  return context;
}
