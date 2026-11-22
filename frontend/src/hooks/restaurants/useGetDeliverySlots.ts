import { useQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/backend/endpoints/public-restaurants/public-restaurants";
import {
  GetDeliverySlots200,
  GetDeliverySlots404,
  GetDeliverySlots500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetDeliverySlotsOptions = {
  restaurantId?: string;
};

export function useGetDeliverySlots({
  restaurantId,
}: UseGetDeliverySlotsOptions) {
  return useQuery<
    GetDeliverySlots200,
    ApiError<GetDeliverySlots404 | GetDeliverySlots500>
  >({
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
