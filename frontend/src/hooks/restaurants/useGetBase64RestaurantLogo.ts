import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetBase64RestaurantLogoResponse } from "@/types/restaurant/restaurant.api.types";

export function useGetBase64RestaurantLogo(restaurantId: string) {
  return useQuery<GetBase64RestaurantLogoResponse>({
    queryKey: ["restaurant-base64-logo", restaurantId],
    queryFn: () => fetchData(`/restaurants/${restaurantId}/base64-logo`),
  });
}
