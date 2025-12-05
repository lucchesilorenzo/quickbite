import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetRestaurantResponse } from "@/types/restaurant/restaurant.api.types";

type UseGetRestaurantOptions = {
  restaurantSlug?: string;
};

export function useGetRestaurant({ restaurantSlug }: UseGetRestaurantOptions) {
  return useQuery<GetRestaurantResponse>({
    queryKey: ["restaurant", restaurantSlug],
    queryFn: () => fetchData(`/restaurants/${restaurantSlug}`),
  });
}
