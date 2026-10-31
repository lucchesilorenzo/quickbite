import { useQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/endpoints/public-restaurants/public-restaurants";
import { GetBase64Logo200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetBase64RestaurantLogoOptions = {
  restaurantId: string;
};

export function useGetBase64RestaurantLogo({
  restaurantId,
}: UseGetBase64RestaurantLogoOptions) {
  return useQuery<GetBase64Logo200>({
    queryKey: ["restaurant-base64-logo", restaurantId],
    queryFn: async () => {
      const response =
        await getPublicRestaurants(api).getBase64Logo(restaurantId);

      return response.data;
    },
  });
}
