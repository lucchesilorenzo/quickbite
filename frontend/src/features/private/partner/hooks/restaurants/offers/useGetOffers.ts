import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { OfferWithPagination } from "@/types/offer/offer.types";

export function useGetOffers(restaurantId: string, page: number = 1) {
  return useQuery({
    queryKey: ["partner-offers", restaurantId, page],
    queryFn: (): Promise<OfferWithPagination> =>
      fetchData(`/partner/restaurants/${restaurantId}/offers?page=${page}`),
  });
}
