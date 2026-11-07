import { useQuery } from "@tanstack/react-query";

import { getPartnerReviews } from "@/api/endpoints/partner-reviews/partner-reviews";
import { GetPartnerReviews200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetReviewsOptions = {
  restaurantId: string;
  page: number;
};

export function useGetReviews({
  restaurantId,
  page = 1,
}: UseGetReviewsOptions) {
  return useQuery<GetPartnerReviews200>({
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
