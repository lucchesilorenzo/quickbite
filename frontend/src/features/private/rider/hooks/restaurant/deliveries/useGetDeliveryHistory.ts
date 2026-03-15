import { GetDeliveriesResponse } from "@rider/types/deliveries/delivery.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetDeliveryHistoryOptions = {
  page: number;
};

export function useGetDeliveryHistory({ page }: UseGetDeliveryHistoryOptions) {
  return useQuery<GetDeliveriesResponse>({
    queryKey: ["rider-deliveries", page],
    queryFn: () =>
      fetchData(`/rider/restaurant/deliveries/history?page=${page}`),
  });
}
