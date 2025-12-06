import { GetRestaurantsResponse } from "@partner/types/restaurants/restaurant.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetRestaurants() {
  return useQuery<GetRestaurantsResponse>({
    queryKey: ["partner-restaurants"],
    queryFn: () => fetchData("/partner/restaurants"),
  });
}
