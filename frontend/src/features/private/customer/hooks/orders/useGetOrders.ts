import { useQuery } from "@tanstack/react-query";

import { GetOrdersResponse } from "../../types/order/order.api.types";

import { fetchData } from "@/lib/api-client";

export function useGetOrders(page: number = 1) {
  return useQuery<GetOrdersResponse>({
    queryKey: ["customer-orders", page],
    queryFn: () => fetchData(`/customer/orders?page=${page}`),
  });
}
