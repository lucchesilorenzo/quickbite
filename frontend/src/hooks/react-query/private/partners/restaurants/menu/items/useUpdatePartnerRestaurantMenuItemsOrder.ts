import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { MenuItem } from "@/types";

export function useUpdatePartnerRestaurantMenuItemsOrder(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: MenuItem[]) =>
      updateData(`/partner/restaurants/menu/items/order`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-menu-items-order-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-menu-items-order-error",
        severity: "error",
      });
    },
  });
}
