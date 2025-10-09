import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { TAddMenuCategoryFormSchema } from "@/validations/private/partner/menu-validations";

export function useCreatePartnerRestaurantMenuCategory(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TAddMenuCategoryFormSchema) =>
      postData(`/partner/restaurants/${restaurantId}/menu/categories`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "create-restaurant-menu-category-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "create-restaurant-menu-category-error",
        severity: "error",
      });
    },
  });
}
