import { useContext } from "react";

import { PartnerOrdersContext } from "@/contexts/private/partner/PartnerOrdersProvider";

export function usePartnerOrders() {
  const context = useContext(PartnerOrdersContext);

  if (!context) {
    throw new Error(
      "usePartnerOrders must be used within a PartnerOrdersProvider.",
    );
  }

  return context;
}
