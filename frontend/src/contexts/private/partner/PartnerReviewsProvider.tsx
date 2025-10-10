import { createContext, useState } from "react";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
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

export const PartnerReviewsContext =
  createContext<PartnerReviewsContext | null>(null);

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
