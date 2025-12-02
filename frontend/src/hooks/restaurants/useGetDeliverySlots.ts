import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { DeliverySlots } from "@/types/delivery.types";

export function useGetDeliverySlots(restaurantId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["delivery-slots", restaurantId],
    queryFn: (): Promise<DeliverySlots> =>
      fetchData(`/restaurants/${restaurantId}/delivery-slots`),
    enabled: !!restaurantId && enabled,
  });
}
