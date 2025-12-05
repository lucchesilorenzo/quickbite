import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetBase64RestaurantLogoResponse } from "@/types/restaurant/restaurant.api.types";

type UseGetBase64RestaurantLogoOptions = {
  restaurantId: string;
};

export function useGetBase64RestaurantLogo({
  restaurantId,
}: UseGetBase64RestaurantLogoOptions) {
  return useQuery<GetBase64RestaurantLogoResponse>({
    queryKey: ["restaurant-base64-logo", restaurantId],
    queryFn: () => fetchData(`/restaurants/${restaurantId}/base64-logo`),
  });
}
