import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetReviewsResponse } from "@/types/review/review.api.types";

type UseGetReviewsOptions = {
  restaurantId: string;
  page?: number;
};

export function useGetReviews({
  restaurantId,
  page = 1,
}: UseGetReviewsOptions) {
  return useQuery<GetReviewsResponse>({
    queryKey: ["reviews", restaurantId, page],
    queryFn: () =>
      fetchData(`/restaurants/${restaurantId}/reviews?page=${page}`),
  });
}
