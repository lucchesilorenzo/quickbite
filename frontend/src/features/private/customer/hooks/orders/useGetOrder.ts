import { useQuery } from "@tanstack/react-query";

import { GetOrderResponse } from "../../types/order/order.api.types";

import { fetchData } from "@/lib/api-client";

type UseGetOrderOptions = {
  orderId?: string;
};

export function useGetOrder({ orderId }: UseGetOrderOptions) {
  return useQuery<GetOrderResponse>({
    queryKey: ["customer-orders", orderId],
    queryFn: () => fetchData(`/customer/orders/${orderId}`),
  });
}
