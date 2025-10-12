import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UpdateDeliveryTimes = {
  delivery_days: {
    day: string;
    start_time: string | null;
    end_time: string | null;
  }[];
};

export function useUpdateDeliveryTimes(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: UpdateDeliveryTimes) =>
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
