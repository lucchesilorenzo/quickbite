import { createContext, useState } from "react";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useGetPartnerRestaurantReviews } from "@/hooks/react-query/private/partners/restaurants/reviews/useGetPartnerRestaurantReviews";
import { OrderStatusWithAll } from "@/types/order-types";
import { PartnerReview } from "@/types/reviews-types";

type PartnerRestaurantReviewsProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantReviewsContext = {
  status: OrderStatusWithAll;
  reviewsData: PartnerReview;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

export const PartnerRestaurantReviewsContext =
  createContext<PartnerRestaurantReviewsContext | null>(null);

export default function PartnerRestaurantReviewsProvider({
  children,
}: PartnerRestaurantReviewsProviderProps) {
  const { restaurant } = usePartnerRestaurant();

  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  const {
    data: reviewsData = { reviews: [], avg_rating: 0, count: 0 },
    isLoading: isLoadingReviews,
  } = useGetPartnerRestaurantReviews(restaurant.id);

  if (isLoadingReviews) return <Spinner />;

  return (
    <PartnerRestaurantReviewsContext.Provider
      value={{ status, reviewsData, setStatus }}
    >
      {children}
    </PartnerRestaurantReviewsContext.Provider>
  );
}
