import { useQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/backend/endpoints/public-restaurants/public-restaurants";
import {
  GetBase64Logo200,
  GetBase64Logo404,
  GetBase64Logo500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetBase64RestaurantLogoOptions = {
  restaurantId: string;
};

export function useGetBase64RestaurantLogo({
  restaurantId,
}: UseGetBase64RestaurantLogoOptions) {
  return useQuery<
    GetBase64Logo200,
    ApiError<GetBase64Logo404 | GetBase64Logo500>
  >({
    queryKey: ["restaurant-base64-logo", restaurantId],
    queryFn: async () => {
      const response =
        await getPublicRestaurants(api).getBase64Logo(restaurantId);

      return response.data;
    },
  });
}
