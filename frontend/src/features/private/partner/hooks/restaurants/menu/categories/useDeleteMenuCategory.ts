import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export function useDeleteMenuCategory(
  restaurantId: string,
  menuCategoryId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse>({
    mutationFn: () =>
      deleteData(`/partner/restaurants/menu/categories/${menuCategoryId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-delete-menu-category-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-menu-category-error",
        severity: "error",
      });
    },
  });
}
