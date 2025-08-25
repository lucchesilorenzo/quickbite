import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Order } from "@/types/order-types";

export function useGetOrder(orderId?: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: (): Promise<Order> => fetchData(`/customer/orders/${orderId}`),
  });
}
