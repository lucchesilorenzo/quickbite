import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetOffersResponse } from "@/types/offer/offer.api.types";

export function useGetOffers(restaurantId: string, page: number = 1) {
  return useQuery<GetOffersResponse>({
    queryKey: ["offers", restaurantId, page],
    queryFn: () =>
      fetchData(`/restaurants/${restaurantId}/offers?page=${page}`),
    enabled: !!restaurantId && !!page,
  });
}
