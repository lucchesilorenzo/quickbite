import { useContext } from "react";

import { PartnerRestaurantSettingsFeesContext } from "@/contexts/PartnerRestaurantSettingsFeesProvider";

export function usePartnerRestaurantSettingsFees() {
  const context = useContext(PartnerRestaurantSettingsFeesContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurantSettingsFees must be used within a PartnerRestaurantSettingsFeesProvider.",
    );
  }

  return context;
}
