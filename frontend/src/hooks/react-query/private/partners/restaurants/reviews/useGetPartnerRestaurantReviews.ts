import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { ReviewStats } from "@/types/review-types";

export function useGetPartnerRestaurantReviews(
  restaurantId: string,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["partner-reviews", restaurantId, page],
    queryFn: (): Promise<ReviewStats> =>
      fetchData(`/partner/restaurants/${restaurantId}/reviews?page=${page}`),
  });
}
