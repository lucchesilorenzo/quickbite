import { useQuery } from "@tanstack/react-query";

import { PartnerRestaurantDetail } from "@/features/private/partner/types/restaurant.types";
import { fetchData } from "@/lib/api-client";

export function useGetRestaurant(restaurantId?: string) {
  return useQuery({
    queryKey: ["partner-restaurant", restaurantId],
    queryFn: (): Promise<PartnerRestaurantDetail> =>
      fetchData(`/partner/restaurants/${restaurantId}`),
  });
}
