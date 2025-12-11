import { createContext, useContext, useState } from "react";

import { useGetReviews } from "@partner/hooks/restaurants/reviews/useGetReviews";
import { OrderStatusWithAll } from "@private/shared/types/order.types";

import { GetReviewsResponse } from "../types/reviews/review.api.types";
import { useRestaurant } from "./RestaurantProvider";

import { reviewsDefaults } from "@/lib/query-defaults";

type ReviewsProviderProps = {
  children: React.ReactNode;
};

type ReviewsContext = {
  page: number;
  status: OrderStatusWithAll;
  reviewsData: GetReviewsResponse;
  isLoadingReviews: boolean;
  reviewsError: Error | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

const ReviewsContext = createContext<ReviewsContext | null>(null);

export default function ReviewsProvider({ children }: ReviewsProviderProps) {
  const { restaurantData } = useRestaurant();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  const {
    data: reviewsData = {
      success: false,
      message: "",
      reviews: reviewsDefaults,
      avg_rating: null,
      count: 0,
    },
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useGetReviews({ restaurantId: restaurantData.restaurant.id, page });

  return (
    <ReviewsContext.Provider
      value={{
        page,
        status,
        reviewsData,
        isLoadingReviews,
        reviewsError,
        setPage,
        setStatus,
      }}
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
