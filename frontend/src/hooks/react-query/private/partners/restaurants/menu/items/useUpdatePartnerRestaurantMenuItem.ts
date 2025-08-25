import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

export function useUpdatePartnerRestaurantMenuItem(
  restaurantId: string,
  menuItemId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: FormData) =>
      postData(`/partner/restaurants/menu/items/${menuItemId}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-menu-item-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-menu-item-error",
        severity: "error",
      });
    },
  });
}
