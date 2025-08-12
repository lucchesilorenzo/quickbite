import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TPartnerRestaurantMenuCategoriesFormSchema } from "@/validations/partner-restaurant-menu-validations";

export function useUpdatePartnerRestaurantMenuCategory(
  restaurantId: string,
  menuCategoryId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TPartnerRestaurantMenuCategoriesFormSchema) =>
      updateData(
        `/partner/restaurants/menu/categories/${menuCategoryId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
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
