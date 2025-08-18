import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UpdatePartnerRestaurantSettingsDeliveryTimes = {
  delivery_days: {
    day: string;
    start_time: string | null;
    end_time: string | null;
  }[];
};

export function useUpdatePartnerRestaurantSettingsDeliveryTimes(
  restaurantId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: UpdatePartnerRestaurantSettingsDeliveryTimes) =>
      updateData(
        `/partner/restaurants/${restaurantId}/settings/delivery-times`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-delivery-times-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-delivery-times-error",
        severity: "error",
      });
    },
  });
}
