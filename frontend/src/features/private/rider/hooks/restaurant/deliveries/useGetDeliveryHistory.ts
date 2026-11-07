import { useQuery } from "@tanstack/react-query";

import { getRiderDeliveries } from "@/api/endpoints/rider-deliveries/rider-deliveries";
import { GetRiderDeliveryHistory200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetDeliveryHistoryOptions = {
  page: number;
};

export function useGetDeliveryHistory({ page }: UseGetDeliveryHistoryOptions) {
  return useQuery<GetRiderDeliveryHistory200>({
    queryKey: ["rider-deliveries", page],
    queryFn: async () => {
      const response = await getRiderDeliveries(api).getRiderDeliveryHistory({
        page,
      });

      return response.data;
    },
  });
}
