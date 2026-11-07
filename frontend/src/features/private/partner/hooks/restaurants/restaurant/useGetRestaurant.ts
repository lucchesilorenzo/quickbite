import { useQuery } from "@tanstack/react-query";

import { getPartnerRestaurants } from "@/api/endpoints/partner-restaurants/partner-restaurants";
import { GetPartnerRestaurant200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetRestaurantOptions = {
  restaurantId?: string;
};

export function useGetRestaurant({ restaurantId }: UseGetRestaurantOptions) {
  return useQuery<GetPartnerRestaurant200>({
    queryKey: ["partner-restaurants", restaurantId],
    queryFn: async () => {
      const response = await getPartnerRestaurants(api).getPartnerRestaurant(
        restaurantId ?? "",
      );

      return response.data;
    },
  });
}
