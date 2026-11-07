import { useQuery } from "@tanstack/react-query";

import { getRiderDeliveries } from "@/api/endpoints/rider-deliveries/rider-deliveries";
import { GetRiderActiveDelivery200 } from "@/api/models";
import api from "@/lib/api-client";

export function useGetActiveDelivery() {
  return useQuery<GetRiderActiveDelivery200>({
    queryKey: ["rider-deliveries"],
    queryFn: async () => {
      const response = await getRiderDeliveries(api).getRiderActiveDelivery();

      return response.data;
    },
  });
}
