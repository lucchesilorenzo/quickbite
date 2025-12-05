import { UpdateRestaurantApprovedStatusResponse } from "@partner/types/restaurant/restaurant.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateRestaurantApprovedStatusOptions = {
  restaurantId: string;
};

export function useUpdateRestaurantApprovedStatus({
  restaurantId,
}: UseUpdateRestaurantApprovedStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdateRestaurantApprovedStatusResponse, Error, void>({
    mutationFn: () =>
      updateData(`/partner/restaurants/${restaurantId}/approved`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-restaurant-approved-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-restaurant-approved-status-error",
        severity: "error",
      });
    },
  });
}
