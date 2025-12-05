import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetOffersResponse } from "@/types/offer/offer.api.types";

type UseGetOffersOptions = {
  restaurantId: string;
  page?: number;
};

export function useGetOffers({ restaurantId, page = 1 }: UseGetOffersOptions) {
  return useQuery<GetOffersResponse>({
    queryKey: ["offers", restaurantId, page],
    queryFn: () =>
      fetchData(`/restaurants/${restaurantId}/offers?page=${page}`),
    enabled: !!restaurantId && !!page,
  });
}
