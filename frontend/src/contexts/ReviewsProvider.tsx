import { createContext, useContext, useState } from "react";

import { useRestaurant } from "./RestaurantProvider";

import { GetReviews200 } from "@/api/models";
import { useGetReviews } from "@/hooks/reviews/useGetReviews";

type ReviewsProviderProps = {
  children: React.ReactNode;
};

type ReviewsContext = {
  reviewsData?: GetReviews200;
  page: number;
  isLoadingReviews: boolean;
  reviewsError: Error | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const ReviewsContext = createContext<ReviewsContext | null>(null);

export default function ReviewsProvider({ children }: ReviewsProviderProps) {
  const { restaurantData } = useRestaurant();

  const [page, setPage] = useState(1);

  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useGetReviews({ restaurantId: restaurantData.data.id, page });

  return (
    <ReviewsContext.Provider
      value={{ reviewsData, page, isLoadingReviews, reviewsError, setPage }}
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
