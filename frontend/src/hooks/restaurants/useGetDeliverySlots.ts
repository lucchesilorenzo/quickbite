import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetDeliverySlotsResponse } from "@/types/deliveries/delivery.api.types";

type UseGetDeliverySlotsOptions = {
  restaurantId: string;
  enabled: boolean;
};

export function useGetDeliverySlots({
  restaurantId,
  enabled,
}: UseGetDeliverySlotsOptions) {
  return useQuery<GetDeliverySlotsResponse>({
    queryKey: ["delivery-slots", restaurantId],
    queryFn: () => fetchData(`/restaurants/${restaurantId}/delivery-slots`),
    enabled: !!restaurantId && enabled,
  });
}
