import {
  UpdateDeliveryTimesPayload,
  UpdateDeliveryTimesResponse,
} from "@partner/types/settings/settings.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateDeliveryTimes = {
  restaurantId: string;
};

export function useUpdateDeliveryTimes({
  restaurantId,
}: UseUpdateDeliveryTimes) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateDeliveryTimesResponse,
    Error,
    UpdateDeliveryTimesPayload
  >({
    mutationFn: (data) =>
      updateData(
        `/partner/restaurants/${restaurantId}/settings/delivery-times`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-delivery-times-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-delivery-times-error",
        severity: "error",
      });
    },
  });
}
