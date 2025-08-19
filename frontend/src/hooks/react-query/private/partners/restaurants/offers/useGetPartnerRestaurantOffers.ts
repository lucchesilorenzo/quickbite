import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Offer } from "@/types";

export function useGetPartnerRestaurantOffers(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-offers", restaurantId],
    queryFn: (): Promise<Offer[]> =>
      fetchData(`/partner/restaurants/${restaurantId}/offers`),
  });
}
