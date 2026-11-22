import { useQuery } from "@tanstack/react-query";

import { getCustomerOrders } from "@/api/backend/endpoints/customer-orders/customer-orders";
import {
  GetCustomerOrder200,
  GetCustomerOrder404,
  GetCustomerOrder409,
  GetCustomerOrder500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetOrderOptions = {
  orderId?: string;
};

export function useGetOrder({ orderId }: UseGetOrderOptions) {
  return useQuery<
    GetCustomerOrder200,
    ApiError<GetCustomerOrder404 | GetCustomerOrder409 | GetCustomerOrder500>
  >({
    queryKey: ["customer-orders", orderId],
    queryFn: async () => {
      const response = await getCustomerOrders(api).getCustomerOrder(
        orderId ?? "",
      );

      return response.data;
    },
  });
}
