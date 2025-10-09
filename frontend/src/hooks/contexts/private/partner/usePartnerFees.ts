import { useContext } from "react";

import { PartnerFeesContext } from "@/contexts/private/partner/PartnerFeesProvider";

export function usePartnerFees() {
  const context = useContext(PartnerFeesContext);

  if (!context) {
    throw new Error(
      "usePartnerFees must be used within a PartnerFeesProvider.",
    );
  }

  return context;
}
