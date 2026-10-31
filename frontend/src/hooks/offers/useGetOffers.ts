import { useQuery } from "@tanstack/react-query";

import { getPublicOffers } from "@/api/endpoints/public-offers/public-offers";
import { GetOffers200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetOffersOptions = {
  restaurantId?: string;
  page?: number;
};

export function useGetOffers({ restaurantId, page = 1 }: UseGetOffersOptions) {
  return useQuery<GetOffers200>({
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
