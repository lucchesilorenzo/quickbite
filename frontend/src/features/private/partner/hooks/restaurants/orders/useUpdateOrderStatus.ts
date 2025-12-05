import {
  UpdateOrderStatusPayload,
  UpdateOrderStatusResponse,
} from "@partner/types/order/order.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateOrderStatusOptions = {
  orderId: string;
};

export function useUpdateOrderStatus({ orderId }: UseUpdateOrderStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateOrderStatusResponse,
    Error,
    UpdateOrderStatusPayload
  >({
    mutationFn: (data) =>
      updateData(`/partner/restaurants/orders/${orderId}/status`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-orders"],
      });

      notifications.show(response.message, {
        key: "partner-update-order-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-order-status-error",
        severity: "error",
      });
    },
  });
}
