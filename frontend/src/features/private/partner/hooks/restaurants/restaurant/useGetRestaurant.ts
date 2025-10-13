import { PartnerRestaurantDetail } from "@partner/types/restaurant-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetRestaurant(restaurantId?: string) {
  return useQuery({
    queryKey: ["partner-restaurant", restaurantId],
    queryFn: (): Promise<PartnerRestaurantDetail> =>
      fetchData(`/partner/restaurants/${restaurantId}`),
  });
}
