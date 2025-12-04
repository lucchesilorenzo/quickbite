import { createContext, useContext, useState } from "react";

import { useRestaurant } from "./RestaurantProvider";

import { useGetReviews } from "@/hooks/reviews/useGetReviews";
import { reviewsDefaults } from "@/lib/query-defaults";
import { ReviewStats } from "@/types/review/review.types";

type ReviewsProviderProps = {
  children: React.ReactNode;
};

type ReviewsContext = {
  reviewsData: ReviewStats;
  page: number;
  isLoadingReviews: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const ReviewsContext = createContext<ReviewsContext | null>(null);

export default function ReviewsProvider({ children }: ReviewsProviderProps) {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);

  const { data: reviewsData = reviewsDefaults, isLoading: isLoadingReviews } =
    useGetReviews(restaurant.id, page);

  return (
    <ReviewsContext.Provider
      value={{ reviewsData, page, isLoadingReviews, setPage }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);

  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider.");
  }

  return context;
}
