import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantListItem } from "@/types/restaurant-types";

type GetRestaurants = {
  lat?: string;
  lon?: string;
};

export function useGetRestaurants({ lat, lon }: GetRestaurants) {
  return useQuery({
    queryKey: ["restaurants", lat, lon],
    queryFn: (): Promise<RestaurantListItem[]> =>
      fetchData(`/restaurants?lat=${lat}&lon=${lon}`),
    enabled: !!lat && !!lon,
  });
}
