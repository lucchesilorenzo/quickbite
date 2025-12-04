import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetReviewsResponse } from "@/types/review/review.api.types";

export function useGetReviews(restaurantId: string, page: number = 1) {
  return useQuery<GetReviewsResponse>({
    queryKey: ["reviews", restaurantId, page],
    queryFn: () =>
      fetchData(`/restaurants/${restaurantId}/reviews?page=${page}`),
  });
}
