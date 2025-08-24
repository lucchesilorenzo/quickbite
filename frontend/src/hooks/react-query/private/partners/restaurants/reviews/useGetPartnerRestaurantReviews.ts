import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { PartnerReview } from "@/types/reviews-types";

export function useGetPartnerRestaurantReviews(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-reviews", restaurantId],
    queryFn: (): Promise<PartnerReview> =>
      fetchData(`/partner/restaurants/${restaurantId}/reviews`),
  });
}
