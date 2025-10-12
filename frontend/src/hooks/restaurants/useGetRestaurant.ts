import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { SingleRestaurantDetail } from "@/types/restaurant-types";

export function useGetRestaurant(restaurantSlug?: string) {
  return useQuery({
    queryKey: ["restaurant", restaurantSlug],
    queryFn: (): Promise<SingleRestaurantDetail> =>
      fetchData(`/restaurants/${restaurantSlug}`),
  });
}
