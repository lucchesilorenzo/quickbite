import { useContext } from "react";

import { PartnerRestaurantSettingsInfoContext } from "@/contexts/PartnerRestaurantSettingsInfoProvider";

export function usePartnerRestaurantSettingsInfo() {
  const context = useContext(PartnerRestaurantSettingsInfoContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurantSettingsInfo must be used within a PartnerRestaurantSettingsInfoProvider.",
    );
  }

  return context;
}
