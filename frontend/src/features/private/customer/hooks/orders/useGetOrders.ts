import { useQuery } from "@tanstack/react-query";

import { GetOrdersResponse } from "../../types/orders/order.api.types";

import { fetchData } from "@/lib/api-client";

type UseGetOrdersOptions = {
  page?: number;
};

export function useGetOrders({ page = 1 }: UseGetOrdersOptions) {
  return useQuery<GetOrdersResponse>({
    queryKey: ["customer-orders", page],
    queryFn: () => fetchData(`/customer/orders?page=${page}`),
  });
}
