import {
  UpdateDeliveryStatusRequest,
  UpdateDeliveryStatusResponse,
} from "@rider/types/deliveries/delivery.api.types";
import { OrderStatus } from "@rider/types/orders/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateDeliveryStatusOptions = {
  deliveryId: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<OrderStatus>>;
};

export function useUpdateDeliveryStatus({
  deliveryId,
  setSelectedStatus,
}: UseUpdateDeliveryStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateDeliveryStatusResponse,
    Error,
    UpdateDeliveryStatusRequest
  >({
    mutationFn: (data) =>
      updateData(`/rider/restaurant/deliveries/${deliveryId}/status`, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["rider-deliveries"],
      });

      setSelectedStatus(data.delivery.order.status);

      notifications.show(data.message, {
        key: "rider-update-delivery-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-update-delivery-status-error",
        severity: "error",
      });
    },
  });
}
