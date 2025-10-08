import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TRestaurantMenuCategoriesFormSchema } from "@/validations/private/partner/restaurant-menu-validations";

export function useUpdatePartnerRestaurantMenuCategory(
  restaurantId: string,
  menuCategoryId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TRestaurantMenuCategoriesFormSchema) =>
      updateData(
        `/partner/restaurants/menu/categories/${menuCategoryId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-menu-category-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-menu-category-error",
        severity: "error",
      });
    },
  });
}
