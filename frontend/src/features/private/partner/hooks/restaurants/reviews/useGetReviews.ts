import { GetReviewsResponse } from "@partner/types/review/review.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetReviews = {
  restaurantId: string;
  page: number;
};

export function useGetReviews({ restaurantId, page = 1 }: UseGetReviews) {
  return useQuery<GetReviewsResponse>({
    queryKey: ["partner-reviews", restaurantId, page],
    queryFn: () =>
      fetchData(`/partner/restaurants/${restaurantId}/reviews?page=${page}`),
  });
}
