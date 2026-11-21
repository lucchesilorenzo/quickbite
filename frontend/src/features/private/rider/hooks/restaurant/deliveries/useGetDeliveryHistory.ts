import { useQuery } from "@tanstack/react-query";

import { getRiderDeliveries } from "@/api/endpoints/rider-deliveries/rider-deliveries";
import {
  GetRiderDeliveryHistory200,
  GetRiderDeliveryHistory500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetDeliveryHistoryOptions = {
  page: number;
};

export function useGetDeliveryHistory({ page }: UseGetDeliveryHistoryOptions) {
  return useQuery<
    GetRiderDeliveryHistory200,
    ApiError<GetRiderDeliveryHistory500>
  >({
    queryKey: ["rider-deliveries", page],
    queryFn: async () => {
      const response = await getRiderDeliveries(api).getRiderDeliveryHistory({
        page,
      });

      return response.data;
    },
  });
}
