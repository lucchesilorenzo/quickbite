import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { OrderWithPagination } from "@/types/order-types";

export function useGetCustomerOrders(page: number = 1) {
  return useQuery({
    queryKey: ["customer-orders", page],
    queryFn: (): Promise<OrderWithPagination> =>
      fetchData(`/customer/orders?page=${page}`),
  });
}
