import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantBase } from "@/types/restaurant-types";

export function useGetRestaurants() {
  return useQuery({
    queryKey: ["partner-restaurants"],
    queryFn: (): Promise<RestaurantBase[]> => fetchData("/partner/restaurants"),
  });
}
