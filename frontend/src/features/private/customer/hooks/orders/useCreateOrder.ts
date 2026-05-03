import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  CreateOrderRequest,
  CreateOrderResponse,
} from "../../types/orders/order.api.types";

import { postData } from "@/lib/api-client";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateOrderResponse, Error, CreateOrderRequest>({
    mutationFn: (data) => postData("/customer/orders", data),
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
