import { useContext } from "react";

import { PartnerMenuContext } from "@/contexts/private/partner/PartnerMenuProvider";

export function usePartnerMenu() {
  const context = useContext(PartnerMenuContext);

  if (!context) {
    throw new Error(
      "usePartnerMenu must be used within a PartnerMenuProvider.",
    );
  }

  return context;
}
