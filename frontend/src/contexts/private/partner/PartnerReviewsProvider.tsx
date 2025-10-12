import { createContext, useContext, useState } from "react";

import { usePartnerRestaurant } from "./PartnerRestaurantProvider";

import Spinner from "@/components/common/Spinner";
import { useGetReviews } from "@/hooks/react-query/private/partner/restaurants/reviews/useGetReviews";
import { reviewsDefaults } from "@/lib/query-defaults";
import { OrderStatusWithAll } from "@/types/order-types";
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
