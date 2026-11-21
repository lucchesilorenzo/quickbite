import { useQuery } from "@tanstack/react-query";

import { getRiderDeliveries } from "@/api/endpoints/rider-deliveries/rider-deliveries";
import {
  GetRiderActiveDelivery200,
  GetRiderActiveDelivery500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useGetActiveDelivery() {
  return useQuery<
    GetRiderActiveDelivery200,
    ApiError<GetRiderActiveDelivery500>
  >({
    queryKey: ["rider-deliveries"],
    queryFn: async () => {
      const response = await getRiderDeliveries(api).getRiderActiveDelivery();

      return response.data;
    },
  });
}
