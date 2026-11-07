import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerOrders } from "@/api/endpoints/customer-orders/customer-orders";
import { CreateCustomerOrder201, CreateOrderRequest } from "@/api/models";
import api from "@/lib/api-client";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateCustomerOrder201, Error, CreateOrderRequest>({
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
