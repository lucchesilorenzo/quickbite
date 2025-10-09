import { useContext } from "react";

import { PartnerStatsContext } from "@/contexts/private/partner/PartnerStatsProvider";

export function usePartnerStats() {
  const context = useContext(PartnerStatsContext);

  if (!context) {
    throw new Error(
      "usePartnerStats must be used within a PartnerStatsProvider.",
    );
  }

  return context;
}
