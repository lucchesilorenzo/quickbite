import { useQuery } from "@tanstack/react-query";

import { getPartnerOffers } from "@/api/endpoints/partner-offers/partner-offers";
import { GetPartnerOffers200, GetPartnerOffers500 } from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetOffersOptions = {
  restaurantId: string;
  page: number;
};

export function useGetOffers({ restaurantId, page = 1 }: UseGetOffersOptions) {
  return useQuery<GetPartnerOffers200, ApiError<GetPartnerOffers500>>({
    queryKey: ["partner-offers", restaurantId, page],
    queryFn: async () => {
      const response = await getPartnerOffers(api).getPartnerOffers(
        restaurantId,
        { page },
      );

      return response.data;
    },
  });
}
