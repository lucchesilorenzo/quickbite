import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { PartnerMenu } from "@/types";

export function useUpdatePartnerRestaurantMenuCategoriesOrder(
  restaurantId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: PartnerMenu[]) =>
      updateData(`/partner/restaurants/menu/categories/order`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-menu-categories-order-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-menu-categories-order-error",
        severity: "error",
      });
    },
  });
}
