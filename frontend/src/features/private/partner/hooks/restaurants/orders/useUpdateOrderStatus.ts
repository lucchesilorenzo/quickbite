import { PartnerOrderStatus } from "@partner/types/order-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

export function useUpdateOrderStatus(orderId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: { status: PartnerOrderStatus }) =>
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
