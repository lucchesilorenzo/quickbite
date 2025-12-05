import {
  UpdateRestaurantStatusPayload,
  UpdateRestaurantStatusResponse,
} from "@partner/types/restaurant/restaurant.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateRestaurantStatus = {
  restaurantId: string;
};

export function useUpdateRestaurantStatus({
  restaurantId,
}: UseUpdateRestaurantStatus) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateRestaurantStatusResponse,
    Error,
    UpdateRestaurantStatusPayload
  >({
    mutationFn: (data) =>
      updateData(`/partner/restaurants/${restaurantId}/status`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-restaurant-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-restaurant-status-error",
        severity: "error",
      });
    },
  });
}
