import { useContext } from "react";

import { RestaurantReviewsContext } from "@/contexts/public/RestaurantReviewsProvider";

export function useRestaurantReview() {
  const context = useContext(RestaurantReviewsContext);

  if (!context) {
    throw new Error(
      "useRestaurantReview must be used within a RestaurantReviewProvider.",
    );
  }

  return context;
}
