import { createContext, useContext, useState } from "react";

import { useGetReviews } from "@partner/hooks/restaurants/reviews/useGetReviews";

import { useRestaurant } from "./RestaurantProvider";

import { GetPartnerReviews200 } from "@/api/models";
import { OrderStatusWithAll } from "@/types/order.types";

type ReviewsProviderProps = {
  children: React.ReactNode;
};

type ReviewsContext = {
  page: number;
  status: OrderStatusWithAll;
  reviewsData?: GetPartnerReviews200;
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
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useGetReviews({ restaurantId: restaurantData.data.id, page });

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
