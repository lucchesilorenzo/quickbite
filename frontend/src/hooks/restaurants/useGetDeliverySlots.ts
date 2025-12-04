import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetDeliverySlotsResponse } from "@/types/delivery/delivery.api.types";

export function useGetDeliverySlots(restaurantId: string, enabled: boolean) {
  return useQuery<GetDeliverySlotsResponse>({
    queryKey: ["delivery-slots", restaurantId],
    queryFn: () => fetchData(`/restaurants/${restaurantId}/delivery-slots`),
    enabled: !!restaurantId && enabled,
  });
}
