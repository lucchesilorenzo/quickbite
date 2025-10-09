import { useContext } from "react";

import { PartnerInfoContext } from "@/contexts/private/partner/PartnerInfoProvider";

export function usePartnerInfo() {
  const context = useContext(PartnerInfoContext);

  if (!context) {
    throw new Error(
      "usePartnerInfo must be used within a PartnerInfoProvider.",
    );
  }

  return context;
}
