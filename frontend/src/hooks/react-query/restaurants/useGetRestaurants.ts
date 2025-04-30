import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantListItem } from "@/types/restaurant-types";

export function useGetRestaurants(postcode?: string) {
  return useQuery({
    queryKey: ["restaurants", postcode],
    queryFn: (): Promise<RestaurantListItem[]> => fetchData("/restaurants"),
    enabled: !!postcode,
  });
}
