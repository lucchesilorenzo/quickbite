import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getRiderDeliveries } from "@/api/endpoints/rider-deliveries/rider-deliveries";
import {
  OrderStatus,
  UpdateRiderDeliveryStatus400,
  UpdateRiderDeliveryStatus500,
} from "@/api/models";
import {
  UpdateDeliveryStatusRequest,
  UpdateRiderDeliveryStatus200,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

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
    UpdateRiderDeliveryStatus200,
    ApiError<UpdateRiderDeliveryStatus400 | UpdateRiderDeliveryStatus500>,
    UpdateDeliveryStatusRequest
  >({
    mutationFn: async (data) => {
      const response = await getRiderDeliveries(api).updateRiderDeliveryStatus(
        deliveryId,
        data,
      );

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["rider-deliveries"],
      });

      if (data.data.order) {
        setSelectedStatus(data.data.order.status);
      }

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
