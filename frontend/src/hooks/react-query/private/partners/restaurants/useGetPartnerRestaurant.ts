import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantDetail } from "@/types";

export function useGetPartnerRestaurant(restaurantId?: string) {
  return useQuery({
    queryKey: ["partner-restaurant"],
    queryFn: (): Promise<RestaurantDetail> =>
      fetchData(`/partner/restaurants/${restaurantId}`),
  });
}
