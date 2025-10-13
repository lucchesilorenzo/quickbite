import { createContext, useContext, useState } from "react";

import { useGetReviews } from "@partner/hooks/restaurants/reviews/useGetReviews";
import { OrderStatusWithAll } from "@private/types/order-types";

import { useRestaurant } from "./RestaurantProvider";

import Spinner from "@/components/Spinner";
import { reviewsDefaults } from "@/lib/query-defaults";
import { ReviewStats } from "@/types/review-types";

type ReviewsProviderProps = {
  children: React.ReactNode;
};

type ReviewsContext = {
  status: OrderStatusWithAll;
  reviewsData: ReviewStats;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

const ReviewsContext = createContext<ReviewsContext | null>(null);

export default function ReviewsProvider({ children }: ReviewsProviderProps) {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  const { data: reviewsData = reviewsDefaults, isLoading: isLoadingReviews } =
    useGetReviews(restaurant.id, page);

  if (isLoadingReviews) return <Spinner />;

  return (
    <ReviewsContext.Provider
      value={{ status, reviewsData, page, setPage, setStatus }}
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
