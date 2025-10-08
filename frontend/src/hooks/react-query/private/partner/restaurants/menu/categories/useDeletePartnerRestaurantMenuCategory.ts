import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeletePartnerRestaurantMenuCategory(
  restaurantId: string,
  menuCategoryId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () =>
      deleteData(`/partner/restaurants/menu/categories/${menuCategoryId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "delete-restaurant-menu-categories-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "delete-restaurant-menu-categories-error",
        severity: "error",
      });
    },
  });
}
