import { Order } from "@private/types/order-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetOrder(orderId?: string) {
  return useQuery({
    queryKey: ["customer-orders", orderId],
    queryFn: (): Promise<Order> => fetchData(`/customer/orders/${orderId}`),
  });
}
