import { createContext, useState } from "react";

import { useSingleRestaurant } from "@/hooks/contexts/public/useSingleRestaurant";
import { useGetRestaurantReviews } from "@/hooks/react-query/public/restaurants/useGetRestaurantReviews";
import { ReviewStats } from "@/types/review-types";

type RestaurantReviewsProviderProps = {
  children: React.ReactNode;
};

type RestaurantReviewsContext = {
  reviewsData?: ReviewStats;
  page: number;
  isLoadingReviews: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const RestaurantReviewsContext =
  createContext<RestaurantReviewsContext | null>(null);

export default function RestaurantReviewsProvider({
  children,
}: RestaurantReviewsProviderProps) {
  const { restaurant } = useSingleRestaurant();

  const [page, setPage] = useState(1);

  const { data: reviewsData, isLoading: isLoadingReviews } =
    useGetRestaurantReviews(restaurant.id, page);

  return (
    <RestaurantReviewsContext.Provider
      value={{ reviewsData, page, isLoadingReviews, setPage }}
    >
      {children}
    </RestaurantReviewsContext.Provider>
  );
}
