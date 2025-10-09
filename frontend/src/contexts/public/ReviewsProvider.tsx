import { createContext, useState } from "react";

import { useRestaurant } from "@/hooks/contexts/public/useRestaurant";
import { useGetRestaurantReviews } from "@/hooks/react-query/public/restaurants/useGetRestaurantReviews";
import { reviewsDefaults } from "@/lib/query-defaults";
import { ReviewStats } from "@/types/review-types";

type ReviewsProviderProps = {
  children: React.ReactNode;
};

type ReviewsContext = {
  reviewsData: ReviewStats;
  page: number;
  isLoadingReviews: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const ReviewsContext = createContext<ReviewsContext | null>(null);

export default function ReviewsProvider({ children }: ReviewsProviderProps) {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);

  const { data: reviewsData = reviewsDefaults, isLoading: isLoadingReviews } =
    useGetRestaurantReviews(restaurant.id, page);

  return (
    <ReviewsContext.Provider
      value={{ reviewsData, page, isLoadingReviews, setPage }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}
