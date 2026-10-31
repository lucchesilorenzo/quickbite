import { useQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/endpoints/public-restaurants/public-restaurants";
import { GetDeliverySlots200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetDeliverySlotsOptions = {
  restaurantId?: string;
};

export function useGetDeliverySlots({
  restaurantId,
}: UseGetDeliverySlotsOptions) {
  return useQuery<GetDeliverySlots200>({
    queryKey: ["delivery-slots", restaurantId],
    queryFn: async () => {
      const response = await getPublicRestaurants(api).getDeliverySlots(
        restaurantId ?? "",
      );

      return response.data;
    },
    enabled: !!restaurantId,
  });
}
