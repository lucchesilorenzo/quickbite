import { GetOrdersResponse } from "@partner/types/order/order.api.types";
import { useQuery } from "@tanstack/react-query";

import { OrderStatusWithAll } from "@/features/private/shared/types/order.types";
import { fetchData } from "@/lib/api-client";

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
  return useQuery<GetOrdersResponse>({
    queryKey: ["partner-orders", restaurantId, status, page],
    queryFn: () => {
      const params = new URLSearchParams();

      if (status !== "all") params.append("status", status);
      if (page) params.append("page", page.toString());

      return fetchData(
        `/partner/restaurants/${restaurantId}/orders?${params.toString()}`,
      );
    },
  });
}
