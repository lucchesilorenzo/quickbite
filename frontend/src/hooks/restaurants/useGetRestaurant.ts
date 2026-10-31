import { useQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/endpoints/public-restaurants/public-restaurants";
import { GetRestaurant200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetRestaurantOptions = {
  restaurantSlug?: string;
};

export function useGetRestaurant({ restaurantSlug }: UseGetRestaurantOptions) {
  return useQuery<GetRestaurant200>({
    queryKey: ["restaurant", restaurantSlug],
    queryFn: async () => {
      const response = await getPublicRestaurants(api).getRestaurant(
        restaurantSlug ?? "",
      );

      return response.data;
    },
  });
}
