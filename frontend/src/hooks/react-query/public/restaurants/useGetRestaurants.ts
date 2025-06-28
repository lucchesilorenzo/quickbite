import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantListItem } from "@/types/restaurant-types";

export function useGetRestaurants(addressSlug: string | null) {
  return useQuery({
    queryKey: ["restaurants", addressSlug],
    queryFn: (): Promise<RestaurantListItem[]> =>
      fetchData(`/restaurants?address=${addressSlug}`),
    enabled: !!addressSlug,
  });
}
