import { useQuery } from "@tanstack/react-query";

import { getCustomerOrders } from "@/api/endpoints/customer-orders/customer-orders";
import { GetCustomerOrder200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetOrderOptions = {
  orderId?: string;
};

export function useGetOrder({ orderId }: UseGetOrderOptions) {
  return useQuery<GetCustomerOrder200>({
    queryKey: ["customer-orders", orderId],
    queryFn: async () => {
      const response = await getCustomerOrders(api).getCustomerOrder(
        orderId ?? "",
      );

      return response.data;
    },
  });
}
