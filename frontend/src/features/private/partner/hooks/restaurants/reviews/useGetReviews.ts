import { useQuery } from "@tanstack/react-query";

import { getPartnerReviews } from "@/api/endpoints/partner-reviews/partner-reviews";
import { GetPartnerReviews200, GetPartnerReviews500 } from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetReviewsOptions = {
  restaurantId: string;
  page: number;
};

export function useGetReviews({
  restaurantId,
  page = 1,
}: UseGetReviewsOptions) {
  return useQuery<GetPartnerReviews200, ApiError<GetPartnerReviews500>>({
    queryKey: ["partner-reviews", restaurantId, page],
    queryFn: async () => {
      const response = await getPartnerReviews(api).getPartnerReviews(
        restaurantId,
        { page },
      );

      return response.data;
    },
  });
}
