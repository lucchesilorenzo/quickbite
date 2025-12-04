import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetRestaurantResponse } from "@/types/restaurant/restaurant.api.types";

export function useGetRestaurant(restaurantSlug?: string) {
  return useQuery<GetRestaurantResponse>({
    queryKey: ["restaurant", restaurantSlug],
    queryFn: () => fetchData(`/restaurants/${restaurantSlug}`),
  });
}
