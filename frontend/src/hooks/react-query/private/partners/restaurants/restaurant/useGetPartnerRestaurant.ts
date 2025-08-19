import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { PartnerRestaurantDetail } from "@/types";

export function useGetPartnerRestaurant(restaurantId?: string) {
  return useQuery({
    queryKey: ["partner-restaurant", restaurantId],
    queryFn: (): Promise<PartnerRestaurantDetail> =>
      fetchData(`/partner/restaurants/${restaurantId}`),
  });
}
