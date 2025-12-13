import {
  UpdateOrderStatusPayload,
  UpdateOrderStatusResponse,
} from "@partner/types/orders/order.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateOrderStatusOptions = {
  orderId: string;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export function useUpdateOrderStatus({
  orderId,
  setAnchorEl,
}: UseUpdateOrderStatusOptions) {
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

      setAnchorEl(null);

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
