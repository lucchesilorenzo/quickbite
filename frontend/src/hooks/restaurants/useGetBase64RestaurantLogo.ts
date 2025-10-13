import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetBase64RestaurantLogo(restaurantId: string) {
  return useQuery({
    queryKey: ["restaurant-base64-logo", restaurantId],
    queryFn: (): Promise<{ logo: string }> =>
      fetchData(`/restaurants/${restaurantId}/base64-logo`),
  });
}
