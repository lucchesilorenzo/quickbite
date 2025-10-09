import { useContext } from "react";

import { PartnerReviewsContext } from "@/contexts/private/partner/PartnerReviewsProvider";

export function usePartnerReviews() {
  const context = useContext(PartnerReviewsContext);

  if (!context) {
    throw new Error(
      "usePartnerReviews must be used within a PartnerReviewsProvider.",
    );
  }

  return context;
}
