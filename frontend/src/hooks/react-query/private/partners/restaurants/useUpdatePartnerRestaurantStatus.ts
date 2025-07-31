import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { RestaurantDetail } from "@/types";

type UpdatePartnerRestaurantStatus = {
  force_close: RestaurantDetail["force_close"];
};

export function useUpdatePartnerRestaurantStatus(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: UpdatePartnerRestaurantStatus) =>
      updateData(`/partner/restaurants/${restaurantId}/status`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-status-error",
        severity: "error",
      });
    },
  });
}
