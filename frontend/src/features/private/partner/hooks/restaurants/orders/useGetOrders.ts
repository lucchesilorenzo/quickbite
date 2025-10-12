import { OrderStatusWithAll } from "@private/types/order-types";
import { OrderWithPagination } from "@private/types/order-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type GetOrders = {
  restaurantId: string;
  status: OrderStatusWithAll;
  page: number;
};

export function useGetOrders({ restaurantId, status, page = 1 }: GetOrders) {
  return useQuery({
    queryKey: ["partner-orders", restaurantId, status, page],
    queryFn: (): Promise<OrderWithPagination> => {
      const params = new URLSearchParams();

      if (status !== "all") params.append("status", status);
      if (page) params.append("page", page.toString());

      return fetchData(
        `/partner/restaurants/${restaurantId}/orders?${params.toString()}`,
      );
    },
  });
}
