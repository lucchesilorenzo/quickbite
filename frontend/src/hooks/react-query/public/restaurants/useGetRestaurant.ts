import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { SingleRestaurantDetail } from "@/types/restaurant-types";

export function useGetRestaurant(restaurantSlug?: string, page: number = 1) {
  return useQuery({
    queryKey: ["restaurant", restaurantSlug, page],
    queryFn: (): Promise<SingleRestaurantDetail> =>
      fetchData(`/restaurants/${restaurantSlug}?page=${page}`),
  });
}
