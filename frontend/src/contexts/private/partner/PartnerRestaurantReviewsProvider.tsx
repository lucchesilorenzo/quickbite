import { createContext, useState } from "react";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useGetPartnerRestaurantReviews } from "@/hooks/react-query/private/partner/restaurants/reviews/useGetPartnerRestaurantReviews";
import { reviewsDefaults } from "@/lib/query-defaults";
import { OrderStatusWithAll } from "@/types/order-types";
import { ReviewStats } from "@/types/review-types";

type PartnerRestaurantReviewsProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantReviewsContext = {
  status: OrderStatusWithAll;
  reviewsData: ReviewStats;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

export const PartnerRestaurantReviewsContext =
  createContext<PartnerRestaurantReviewsContext | null>(null);

export default function PartnerRestaurantReviewsProvider({
  children,
}: PartnerRestaurantReviewsProviderProps) {
  const { restaurant } = usePartnerRestaurant();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  const { data: reviewsData = reviewsDefaults, isLoading: isLoadingReviews } =
    useGetPartnerRestaurantReviews(restaurant.id, page);

  if (isLoadingReviews) return <Spinner />;

  return (
    <PartnerRestaurantReviewsContext.Provider
      value={{ status, reviewsData, page, setPage, setStatus }}
    >
      {children}
    </PartnerRestaurantReviewsContext.Provider>
  );
}
