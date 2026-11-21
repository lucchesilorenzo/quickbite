import { useQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/endpoints/public-restaurants/public-restaurants";
import {
  GetRestaurant200,
  GetRestaurant404,
  GetRestaurant500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetRestaurantOptions = {
  restaurantSlug?: string;
};

export function useGetRestaurant({ restaurantSlug }: UseGetRestaurantOptions) {
  return useQuery<
    GetRestaurant200,
    ApiError<GetRestaurant404 | GetRestaurant500>
  >({
    queryKey: ["restaurant", restaurantSlug],
    queryFn: async () => {
      const response = await getPublicRestaurants(api).getRestaurant(
        restaurantSlug ?? "",
      );

      return response.data;
    },
  });
}
