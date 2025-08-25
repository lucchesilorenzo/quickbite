import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Order } from "@/types/order-types";

export function useGetCustomerOrders() {
  return useQuery({
    queryKey: ["customer-orders"],
    queryFn: (): Promise<Order[]> => fetchData("/customer/orders"),
  });
}
