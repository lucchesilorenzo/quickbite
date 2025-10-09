import { useContext } from "react";

import { ReviewsContext } from "@/contexts/public/ReviewsProvider";

export function useReviews() {
  const context = useContext(ReviewsContext);

  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider.");
  }

  return context;
}
