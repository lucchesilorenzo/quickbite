import { useContext } from "react";

import { PartnerRestaurantStatsContext } from "@/contexts/PartnerRestaurantStatsProvider";

export function usePartnerRestaurantStats() {
  const context = useContext(PartnerRestaurantStatsContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurantStats must be used within a PartnerRestaurantStatsProvider.",
    );
  }

  return context;
}
