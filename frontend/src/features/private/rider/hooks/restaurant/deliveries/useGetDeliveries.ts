import { GetDeliveriesResponse } from "@rider/types/deliveries/delivery.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetDeliveries() {
  return useQuery<GetDeliveriesResponse>({
    queryKey: ["rider-deliveries"],
    queryFn: () => fetchData("/rider/restaurant/deliveries"),
  });
}
