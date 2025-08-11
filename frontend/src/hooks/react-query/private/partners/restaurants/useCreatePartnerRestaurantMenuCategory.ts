import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { TPartnerRestaurantMenuCategoriesForm } from "@/validations/partner-restaurant-menu-validations";

export function useCreatePartnerRestaurantMenuCategory(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TPartnerRestaurantMenuCategoriesForm) =>
      postData(`/partner/restaurants/${restaurantId}/menu/categories`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "crete-restaurant-menu-category-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "crete-restaurant-menu-category-error",
        severity: "error",
      });
    },
  });
}
