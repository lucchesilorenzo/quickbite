import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { TEditMenuCategoryFormSchema } from "@/features/private/partner/validations/menu-validations";
import { updateData } from "@/lib/api-client";

export function useUpdateMenuCategory(
  restaurantId: string,
  menuCategoryId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TEditMenuCategoryFormSchema) =>
      updateData(
        `/partner/restaurants/menu/categories/${menuCategoryId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-menu-category-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-menu-category-error",
        severity: "error",
      });
    },
  });
}
