import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

export function useUpdatePartnerRestaurantInfo(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: FormData) =>
      postData(`/partner/restaurants/${restaurantId}/info`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-info-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-info-error",
        severity: "error",
      });
    },
  });
}
