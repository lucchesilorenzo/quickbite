import { useContext } from "react";

import { OffersContext } from "@/contexts/public/OffersProvider";

export function useOffers() {
  const context = useContext(OffersContext);

  if (!context) {
    throw new Error("useOffers must be used within a OffersProvider.");
  }

  return context;
}
