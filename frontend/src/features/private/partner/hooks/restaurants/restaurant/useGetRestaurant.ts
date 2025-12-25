import { GetRestaurantResponse } from "@partner/types/restaurants/restaurant.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetRestaurantOptions = {
  restaurantId?: string;
};

export function useGetRestaurant({ restaurantId }: UseGetRestaurantOptions) {
  return useQuery<GetRestaurantResponse>({
    queryKey: ["partner-restaurants", restaurantId],
    queryFn: () => fetchData(`/partner/restaurants/${restaurantId}`),
  });
}
