import { useQuery } from "@tanstack/react-query";

import { Order } from "@/features/private/types/order.types";
import { fetchData } from "@/lib/api-client";

export function useGetOrder(orderId?: string) {
  return useQuery({
    queryKey: ["customer-orders", orderId],
    queryFn: (): Promise<Order> => fetchData(`/customer/orders/${orderId}`),
  });
}
