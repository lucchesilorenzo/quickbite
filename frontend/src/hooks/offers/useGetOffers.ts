import { useQuery } from "@tanstack/react-query";

import { getPublicOffers } from "@/api/backend/endpoints/public-offers/public-offers";
import { GetOffers200, GetOffers500 } from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetOffersOptions = {
  restaurantId?: string;
  page?: number;
};

export function useGetOffers({ restaurantId, page = 1 }: UseGetOffersOptions) {
  return useQuery<GetOffers200, ApiError<GetOffers500>>({
    queryKey: ["offers", restaurantId, page],
    queryFn: async () => {
      const response = await getPublicOffers(api).getOffers(
        restaurantId ?? "",
        {
          page,
        },
      );

      return response.data;
    },
    enabled: !!restaurantId && !!page,
  });
}
