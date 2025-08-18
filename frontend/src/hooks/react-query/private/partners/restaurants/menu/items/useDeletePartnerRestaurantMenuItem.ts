import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeletePartnerRestaurantMenuItem(
  restaurantId: string,
  menuItemId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () =>
      deleteData(`/partner/restaurants/menu/items/${menuItemId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "delete-restaurant-menu-item-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "delete-restaurant-menu-item-error",
        severity: "error",
      });
    },
  });
}
