import { useQuery } from "@tanstack/react-query";

import { getPublicReviews } from "@/api/backend/endpoints/public-reviews/public-reviews";
import {
  GetReviews200,
  GetReviews404,
  GetReviews500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetReviewsOptions = {
  restaurantId: string;
  page?: number;
};

export function useGetReviews({
  restaurantId,
  page = 1,
}: UseGetReviewsOptions) {
  return useQuery<GetReviews200, ApiError<GetReviews404 | GetReviews500>>({
    queryKey: ["reviews", restaurantId, page],
    queryFn: async () => {
      const response = await getPublicReviews(api).getReviews(restaurantId, {
        page,
      });

      return response.data;
    },
  });
}
