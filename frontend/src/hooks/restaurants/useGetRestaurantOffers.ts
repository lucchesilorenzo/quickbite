import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { OfferWithPagination } from "@/types/offer-types";

export function useGetRestaurantOffers(restaurantId: string, page: number = 1) {
  return useQuery({
    queryKey: ["offers", restaurantId, page],
    queryFn: (): Promise<OfferWithPagination> =>
      fetchData(`/restaurants/${restaurantId}/offers?page=${page}`),
    enabled: !!restaurantId && !!page,
  });
}
