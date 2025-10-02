import { useContext } from "react";

import { PartnerRestaurantReviewsContext } from "@/contexts/private/partner/PartnerRestaurantReviewsProvider";

export function usePartnerRestaurantReviews() {
  const context = useContext(PartnerRestaurantReviewsContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurantReviews must be used within a PartnerRestaurantReviewsProvider.",
    );
  }

  return context;
}
