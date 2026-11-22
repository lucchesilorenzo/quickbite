import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerOrders } from "@/api/backend/endpoints/customer-orders/customer-orders";
import {
  CreateCustomerOrder201,
  CreateCustomerOrder400,
  CreateCustomerOrder404,
  CreateCustomerOrder500,
  CreateOrderRequest,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    CreateCustomerOrder201,
    ApiError<
      CreateCustomerOrder400 | CreateCustomerOrder404 | CreateCustomerOrder500
    >,
    CreateOrderRequest
  >({
    mutationFn: async (data) => {
      const response = await getCustomerOrders(api).createCustomerOrder(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-orders"] });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-create-order-error",
        severity: "error",
      });
    },
  });
}
