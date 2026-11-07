import { useQuery } from "@tanstack/react-query";

import { getPartnerOrders } from "@/api/endpoints/partner-orders/partner-orders";
import { GetPartnerOrders200, GetPartnerOrdersParams } from "@/api/models";
import api from "@/lib/api-client";
import { OrderStatusWithAll } from "@/types/order.types";

type UseGetOrderspOptions = {
  restaurantId: string;
  status: OrderStatusWithAll;
  page: number;
};

export function useGetOrders({
  restaurantId,
  status,
  page = 1,
}: UseGetOrderspOptions) {
  return useQuery<GetPartnerOrders200>({
    queryKey: ["partner-orders", restaurantId, status, page],
    queryFn: async () => {
      const params: GetPartnerOrdersParams = { page };
      if (status !== "all") params.status = status;

      const response = await getPartnerOrders(api).getPartnerOrders(
        restaurantId,
        params,
      );

      return response.data;
    },
  });
}
