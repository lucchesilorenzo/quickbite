import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Order } from "@/types/order-types";

export function useGetCustomerOrder(orderId?: string) {
  return useQuery({
    queryKey: ["customer-order", orderId],
    queryFn: (): Promise<Order> => fetchData(`/customer/orders/${orderId}`),
  });
}
