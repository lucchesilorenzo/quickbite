import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { PartnerReviewWithPagination } from "@/types/reviews-types";

export function useGetPartnerRestaurantReviews(
  restaurantId: string,
  page: number,
) {
  return useQuery({
    queryKey: ["partner-reviews", restaurantId, page],
    queryFn: (): Promise<PartnerReviewWithPagination> =>
      fetchData(`/partner/restaurants/${restaurantId}/reviews?page=${page}`),
  });
}
