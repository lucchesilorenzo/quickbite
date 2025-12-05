import { GetRestaurantResponse } from "@partner/types/restaurant/restaurant.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetRestaurant(restaurantId?: string) {
  return useQuery<GetRestaurantResponse>({
    queryKey: ["partner-restaurant", restaurantId],
    queryFn: () => fetchData(`/partner/restaurants/${restaurantId}`),
  });
}
