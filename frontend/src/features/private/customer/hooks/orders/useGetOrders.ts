import { OrderWithPagination } from "@private/types/order-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetOrders(page: number = 1) {
  return useQuery({
    queryKey: ["customer-orders", page],
    queryFn: (): Promise<OrderWithPagination> =>
      fetchData(`/customer/orders?page=${page}`),
  });
}
