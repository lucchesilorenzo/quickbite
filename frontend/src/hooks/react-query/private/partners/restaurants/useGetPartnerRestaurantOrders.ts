import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Order } from "@/types/order-types";

export function useGetPartnerRestaurantOrders(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-orders"],
    queryFn: (): Promise<Order[]> =>
      fetchData(`/partner/restaurants/${restaurantId}/orders`),
  });
}
