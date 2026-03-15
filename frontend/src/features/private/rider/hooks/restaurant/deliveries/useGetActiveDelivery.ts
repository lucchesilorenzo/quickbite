import { GetActiveDeliveryResponse } from "@rider/types/deliveries/delivery.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetActiveDelivery() {
  return useQuery<GetActiveDeliveryResponse>({
    queryKey: ["rider-deliveries"],
    queryFn: () => fetchData(`/rider/restaurant/deliveries/active`),
  });
}
