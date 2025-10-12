import { createContext, useContext, useState } from "react";

import { useGetReviews } from "@partner/hooks/restaurants/reviews/useGetReviews";
import { OrderStatusWithAll } from "@private/types/order-types";

import { usePartnerRestaurant } from "./PartnerRestaurantProvider";

import Spinner from "@/components/Spinner";
import { reviewsDefaults } from "@/lib/query-defaults";
import { ReviewStats } from "@/types/review-types";

type PartnerReviewsProviderProps = {
  children: React.ReactNode;
};

type PartnerReviewsContext = {
  status: OrderStatusWithAll;
  reviewsData: ReviewStats;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

const PartnerReviewsContext = createContext<PartnerReviewsContext | null>(null);

export default function PartnerReviewsProvider({
  children,
}: PartnerReviewsProviderProps) {
  const { restaurant } = usePartnerRestaurant();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  const { data: reviewsData = reviewsDefaults, isLoading: isLoadingReviews } =
    useGetReviews(restaurant.id, page);

  if (isLoadingReviews) return <Spinner />;

  return (
    <PartnerReviewsContext.Provider
      value={{ status, reviewsData, page, setPage, setStatus }}
    >
      {children}
    </PartnerReviewsContext.Provider>
  );
}

export function usePartnerReviews() {
  const context = useContext(PartnerReviewsContext);

  if (!context) {
    throw new Error(
      "usePartnerReviews must be used within a PartnerReviewsProvider.",
    );
  }

  return context;
}
