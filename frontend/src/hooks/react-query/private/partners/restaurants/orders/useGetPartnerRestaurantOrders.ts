import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { OrderWithPagination } from "@/types/order-types";

export function useGetPartnerRestaurantOrders(
  restaurantId: string,
  page: number,
) {
  return useQuery({
    queryKey: ["partner-orders", restaurantId, page],
    queryFn: (): Promise<OrderWithPagination> =>
      fetchData(`/partner/restaurants/${restaurantId}/orders?page=${page}`),
  });
}
