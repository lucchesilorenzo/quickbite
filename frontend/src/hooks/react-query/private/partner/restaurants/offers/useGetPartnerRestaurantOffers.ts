import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { OfferWithPagination } from "@/types";

export function useGetPartnerRestaurantOffers(
  restaurantId: string,
  page: number,
) {
  return useQuery({
    queryKey: ["partner-offers", restaurantId, page],
    queryFn: (): Promise<OfferWithPagination> =>
      fetchData(`/partner/restaurants/${restaurantId}/offers?page=${page}`),
  });
}
